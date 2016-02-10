Ext.override(Ext.grid.GridView, {
	renderHeaders : function(){
		var cm = this.cm, ts = this.templates;
		var ct = ts.hcell;

		var cb = [], sb = [], p = {};

		for(var i = 0, len = cm.getColumnCount(); i < len; i++){
			p.id = cm.getColumnId(i);
			p.value = cm.getColumnHeader(i) || "";
			p.style = this.getColumnStyle(i, true);
			p.tooltip = this.getColumnTooltip(i);
			if(cm.config[i].align == 'right'){
				p.istyle = 'padding-right:16px';
			} else {
				delete p.istyle;
			}
			cb[cb.length] = ct.apply(p);
		}
		return ts.header.apply({cells: cb.join(""), tstyle:'width:'+this.getTotalWidth()+';'});
	},
});

Ext.override(Ext.form.Field, {
	adjustWidth : function(tag, w){
		if(typeof w == 'number' && !this.normalWidth &&
				(Ext.isIE6 || !Ext.isStrict) && /input|textarea/i.test(tag) && !this.inEditor){
			return w - 3;
		}
		return w;
	}
});

Ext.override(Ext.form.Field, {
	setFieldLabel : function(text) {
		Ext.fly(this.el.dom.parentNode.previousSibling).update(text);
	}
});

Ext.override(Ext.form.Field, {
	setInputType : function(text) {
		this.el.dom.attributes.getNamedItem('type').value = text; 
	}
});

Ext.override(Ext.form.NumberField, {
	setValue : function(v){
		v = typeof v == 'number' ? v : parseFloat(String(v).replace(this.decimalSeparator, "."));
		v = isNaN(v) ? '' : String(this.fixPrecision(v)).replace(".", this.decimalSeparator);
		return Ext.form.NumberField.superclass.setValue.call(this, v);
	},
	fixPrecision : function(value){
		if(!this.allowDecimals || this.decimalPrecision < 0 || isNaN(value) || value == '' || value == null || value == undefined){
			return value;
		}
		return parseFloat(value).toFixed(this.decimalPrecision);
	}
});

Ext.override(Ext.Editor, {
	beforeDestroy : function(){
		if (this.field) this.field.destroy();
	    this.field = null;
	}
});

Ext.override(Ext.form.BasicForm, {
	getData: function(obj) {
		var values = obj == null ? {} : Ext.clone(obj);
		this.items.each(function(field){
			var x = field.getXType();
			var id = field.name == null ? field.id : field.name;
			switch (x) {
			case 'paneldateperiod':
				values[id + ".from"] = field.getValueFrom();
				values[id + ".to"] = field.getValueTo();
				break;
			case 'datefield':
				values[id] = field.getValue() == '' ? null : field.getValue();
				break;
			case 'checkbox':
				values[id] = field.checked;
				break;
			case 'comboBoxNumberField':
			case 'comboBoxTextField':
//				id = id.indexOf('.' + field.valueField) == -1 ? id : id.substring(0,id.indexOf('.' + field.valueField));
//				values[id] = field.getData();
//				break;
			case 'combo':
			case 'comboE':
				id = id.indexOf('.' + field.valueField) == -1 ? id : id.substring(0,id.indexOf('.' + field.valueField));
				values[id] = field.getData();
//				values[id] = {};
//				values[id][field.valueField] = field.getValue();
//				values[id][(field.comboDisplayField == null ? field.displayField : field.comboDisplayField)] = field.lastSelectionText == null ? "" : field.lastSelectionText;
				break;
			default:
				values[id] = field.getValue();
				break;
			}
		});
        
        return obj == null ? getJSON(values) : getJSONDWR(values, obj);
    },
    setValues : function(values){
        if(Ext.isArray(values)){ // array of objects
            for(var i = 0, len = values.length; i < len; i++){
                var v = values[i];
                var f = this.findField(v.id);
                if(f){
                    f.setValue(v.value);
                    if(this.trackResetOnLoad){
                        f.originalValue = f.getValue();
                    }
                }
            }
        }else{ // object hash
            var field, id;
            for(id in values){
                if(typeof values[id] != 'function' && (field = this.findField(id))){
              	  var v;
              	  if (field.renderer)
              		  v = field.renderer(values[id], id, values);
                    else
                  	  v = values[id];
                    field.setValue(v);
                    if(this.trackResetOnLoad){
                        field.originalValue = field.getValue();
                    }
                }
            }
        }
        return this;
    }
});

Ext.override(Ext.form.BasicForm, {
    setData : function(data) {
      this.items.each(function(field){
    	  field.setValue(data[field.id]);
      });
  }
});

Ext.override(Ext.form.BasicForm, {
    updateRecord: function() {
      var form = this;
      this.items.each(function(field){
    	  form.record.set(field.id, field.getValue());
    	  
          if (field.getXType().indexOf("combo") != -1) {
        	  var name = field.id.split(".")[0] + "." + field.displayField;
        	  form.record.set(name, field.lastSelectionText);
          }
      });
    }
});

Ext.override(Ext.grid.GridPanel, {
    getSeleccionCheckData: function(constructor) {
		var list = new Array();
		var i = 0;
		this.getSelectionModel().each(
			function (record) {
				var obj = null;
				if (constructor == null) {
					obj = getJSON(record.data);
				} else {
					obj = getJSONDWR(record.data, constructor);
				}				
//				var obj = getJSON(record.data);
				list[i++] = obj;  
			}
		);
      return list;
  }
});

Ext.override(Ext.grid.GridPanel, {
    getData: function(constructor) {
		var list = new Array();
		var i = 0;
		this.getStore().each(
			function (record) {
				var obj = null;
				if (constructor == null) {
					obj = getJSON(record.data);
				} else {
					obj = getJSONDWR(record.data, constructor);
				}
				list[i++] = obj;  
			}
		);
      return list;
  }
});

Ext.override(Ext.form.ComboBox, {
	getData : function(){
		var array = this.store.reader.jsonData;
		var v = this.getValue();
		for ( var i = 0; i < array.length; i++) {
			if(array[i][this.valueField] == v){
				return array[i]; 
			}
		}
		return null;
    }
});

Ext.clone = function(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    var temp = new Object(); //obj.constructor();
    for (var key in obj) {
        temp[key] = Ext.clone(obj[key]);
    }
    return temp;
};

Ext.override(Ext.grid.GridPanel, {
    deleteSeleccionCheckData: function() {
    	var grid = this;
		grid.getSelectionModel().each(
			function (record) {
				grid.store.remove(record);  
			}
		);
    }
});

Ext.appendArray = function(a1, a2) {
	for (var i = 0; i < a2.length; i++) {
		a1[a1.length] = a2[i];  
	}
    return a1;
};

Ext.addObject = function(obj1, obj2) {
	if (obj2 != null) {
		for (var attribute in obj2) {
			obj1[attribute] = obj2[attribute]; 
		}		
	}
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function getJSON(json) {
	var newJson = new Object();
	for (var attribute in json) {
		if (attribute.indexOf('.') < 0) {
			newJson[attribute] = json[attribute];
		} else {
			var attributes = attribute.split('.');
			// No se considera el �ltimo atributo
			var actual = newJson;
			for (var i = 0; i < attributes.length - 1; i++) {
				var att = attributes[i];
				if (actual[att] == undefined) {
					actual[att] = new Object();
				}
				// Siguiente
				actual = actual[att];
			}
			// El �ltimo atributo se deja el dato
			actual[attributes[attributes.length - 1]] = json[attribute];
		}
		
	}
	return(newJson);
}

function getJSONDWR(json, obj) {
	var newJson = obj;
	for (var attribute in json) {
		if (attribute.indexOf('.') < 0) {
			newJson[attribute] = json[attribute];
		} else {
			var attributes = attribute.split('.');
			// No se considera el �ltimo atributo
			var actual = newJson;
			for (var i = 0; i < attributes.length - 1; i++) {
				var att = attributes[i];
				if (actual[att] == undefined) {
					actual[att] = new Object();
				}
				// Siguiente
				actual = actual[att];
			}
			// El �ltimo atributo se deja el dato
			actual[attributes[attributes.length - 1]] = json[attribute];
		}
		
	}
	return(newJson);
}

Ext.override(Ext.data.JsonReader, {
	 readRecords : function(o) {
		this.jsonData = o;
		if (o.metaData) {
			delete this.ef;
			this.meta = o.metaData;
			this.recordType = Ext.data.Record.create(o.metaData.fields);
			this.onMetaChange(this.meta, this.recordType, o);
		}
		var s = this.meta, Record = this.recordType, f = Record.prototype.fields, fi = f.items, fl = f.length;

		if (!this.ef) {
			if (s.totalProperty) {
				this.getTotal = this.getJsonAccessor(s.totalProperty);
			}
			if (s.successProperty) {
				this.getSuccess = this.getJsonAccessor(s.successProperty);
			}
			this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p) {
				return p;
			};
			if (s.id) {
				var g = this.getJsonAccessor(s.id);
				this.getId = function(rec) {
					var r = g(rec);
					return (r === undefined || r === "") ? null : r;
				};
			} else {
				this.getId = function() {
					return null;
				};
			}
			this.ef = [];
			for (var i = 0; i < fl; i++) {
				f = fi[i];
				var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
				this.ef[i] = this.getJsonAccessor(map);
			}
		}

		var root = this.getRoot(o), c = root.length, totalRecords = c, success = true;
		if (s.totalProperty) {
			var v = parseInt(this.getTotal(o), 10);
			if (!isNaN(v)) {
				totalRecords = v;
			}
		}
		if (s.successProperty) {
			var v = this.getSuccess(o);
			if (v === false || v === 'false') {
				success = false;
			}
		}
		var records = [];
		for (var i = 0; i < c; i++) {
			var n = root[i];
			var values = {};
			var id = this.getId(n);
			for (var j = 0; j < fl; j++) {
				f = fi[j];
				var v;
				try {
					v = this.ef[j](n);
				} catch (e) {
					v = null;
				}	
				values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue, n);
			}
			var record = new Record(values, id);
			record.json = n;
			records[i] = record;
		}
		return {
			success : success,
			records : records,
			totalRecords : totalRecords
		};
	}
});
