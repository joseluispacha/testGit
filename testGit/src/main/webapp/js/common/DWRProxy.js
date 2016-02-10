Ext.data.DWRProxy = function(dwrCall, async, pagingAndSort){
  Ext.data.DWRProxy.superclass.constructor.call(this);
  this.dwrCall = dwrCall;
  this.async = async;
  this.pagingAndSort = (pagingAndSort!=undefined ? pagingAndSort : true);
  this.async = (async!=undefined ? async : false);
  this.addEvents('pageChange');
};

// TODO Encontrar mejor soluci�n dado que prodr�a tener problemas cuando se tiene mas de un data store 
Ext.extend(Ext.data.DWRProxy, Ext.data.DataProxy, {
  gridSummary : null,	
  argumentos : null,
  load : function(params, reader, callback, scope, arg) {
    if(this.fireEvent("beforeload", this, params) !== false) {
      var sort;
      if(params.sort && params.dir) sort = params.sort + ' ' + params.dir;
      else sort = '';
      var delegate = this.loadResponse.createDelegate(this, [reader, callback, scope, arg], 1);
      var callParams = new Array();
      
      if(arg.arg) {
        callParams = arg.arg.slice();
        this.argumentos = arg.arg; 
	  } else {
		  callParams = this.argumentos.slice();  
	  }
			
      if(this.pagingAndSort) {
      	callParams.push(params.start);
      	callParams.push(params.limit);
      	if(sort != "")
      		callParams.push(sort);
	  }
     
      callParams.push({async : this.async, callback : delegate});
      this.dwrCall.apply(this, callParams);
      
    } else {
      callback.call(scope || this, null, arg, false);
    }
    
  },

  loadResponse : function(listRange, reader, callback, scope, arg) {
    var result;
    try {
      if (this.gridSummary != null) {
    	  this.gridSummary.summaryObject = listRange; 
      }
      result = reader.read(listRange);
    } catch(e) {
    	alert("error");
    	this.fireEvent("loadexception", this, null, response, e);
    	callback.call(scope, null, arg, false);
    	return;
    }
    callback.call(scope, result, arg, true);
    this.fireEvent('pageChange', this, arg);
  },

  update : function(dataSet){},

  updateResponse : function(dataSet){}
  
});

Ext.data.ListRangeReader = function(meta, recordType){
    Ext.data.ListRangeReader.superclass.constructor.call(this, meta, recordType);
    this.recordType = recordType;
};

Ext.extend(Ext.data.ListRangeReader, Ext.data.DataReader, {
   getJsonAccessor: function(){
      var re = /[\[\.]/;
      return function(expr) {
          try {
              return(re.test(expr))
                  ? new Function("obj", "return obj." + expr)
                  : function(obj){
                      return obj[expr];
                  };
          } catch(e){}
          return Ext.emptyFn;
      };
    }(),
	
   read : function(o){
		var recordType = this.recordType, fields = recordType.prototype.fields;

		//Generate extraction functions for the totalProperty, the root, the id, and for each field
		if (!this.ef) {
			if(this.meta.totalProperty) {
				this.getTotal = this.getJsonAccessor(this.meta.totalProperty);
			}
		
			if(this.meta.successProperty) {
				this.getSuccess = this.getJsonAccessor(this.meta.successProperty);
			}

			if (this.meta.id) {
				var g = this.getJsonAccessor(this.meta.id);
				this.getId = function(rec) {
					var r = g(rec);
					return (r === undefined || r === "") ? null : r;
				};
			} else {
				this.getId = function(){return null;};
			}
			this.ef = [];
			for(var i = 0; i < fields.length; i++){
				f = fields.items[i];
				var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
				this.ef[i] = this.getJsonAccessor(map);
			}
		}

	   	var records = [];
	   	var root = o.data, c = root.length, totalRecords = c, success = true;
	
	   	if(this.meta.totalProperty){
		    var v = parseInt(this.getTotal(o), 10);
			if(!isNaN(v)){
				totalRecords = v;
			}
		}

		if(this.meta.successProperty){
			var v = this.getSuccess(o);
			if(v === false || v === 'false'){
				success = false;
			}
		}

		for(var i = 0; i < c; i++){
			var n = root[i];
			var values = {};
			var id = this.getId(n);
			for (var j = 0; j < fields.length; j++) {
				f = fields.items[j];
				var v;
				try {
					v = this.ef[j](n);
				} catch (e) {
					v = null;
				}
				values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue);
			}
			var record = new recordType(values, id);
			records[i] = record;
		}
		
    return {
       success : success,
       records : records,
       totalRecords : totalRecords
    };
  }
});