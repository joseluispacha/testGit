Ext.form.ComboBoxNumberField = Ext.extend(Ext.form.NumberField, {
	allowNegative 		: false,
	allowDecimals 		: false,
	store				: [],
	mode				: 'local',
	triggerAction 		: 'all',
	fieldLabel			: ':',
	displayField		: 'nombre',
	valueField			: 'id',
	editable 			: false,
	emptyText			: '',
	emptyTextComboBox	: '',
	width				: .8,
	fieldWidth			: .05,
	validateOnBlur 		: true,
	validationDelay 	: 0,
	allowBlank			: true,
	forceSelection	    : true,
	disabled			: false,
	inputType			: 'text',
	consultaiBatis      : '',
	todo                : false,
	valueNotFoundText	: '',
	
	setAllowBlank : function (v) {
		this.allowBlank = v;
		this.comboBox.allowBlank = v;
	},
	
	setDisabled : function (v) {
		Ext.form.NumberField.superclass.setDisabled.call(this, v);		
		this.comboBox.setDisabled(v);
	},
	
    setNumberFieldValue : function(fld, rcd, idx){
		this.data = rcd.data;
    	this.padre.setValue(rcd.data[this.valueField]);
    	this.padre.onBlur(this);
    },
	
	setValue : function(v){
    	v = typeof v == 'number' ? v : parseFloat(String(v).replace(this.decimalSeparator, "."));
        v = isNaN(v) ? '' : String(v).replace(".", this.decimalSeparator);
        
        this.comboBox.setValue(v);
        Ext.form.NumberField.superclass.setValue.call(this, v);
        if(this.comboBox.getRawValue() == ""){
        	Ext.form.NumberField.superclass.setValue.call(this, '');
        	this.comboBox.reset();
        }
    },
    
	getData : function(){
		var array = this.comboBox.store.reader.jsonData;
		var v = this.getValue();
		for ( var i = 0; i < array.length; i++) {
			if(array[i][this.valueField] == v){
				return array[i]; 
			}
		}
		return null;
    },	
    
    validate : function(){
    	if(this.comboBox.isValid() & this.isValid()){
    		this.clearInvalid();
    		return true;
    	}
    	return false;
    },
    
    beforeBlur : function(){
    	var v = this.parseValue(this.getRawValue());
    	this.setValue(this.fixPrecision(v));
	},
   

    setInputType : function(value) {
    	Ext.form.NumberField.superclass.setInputType.call(this, value);
    	this.comboBox.setInputType(value);
    },
    
    reloadData : function() {
    	var list = new Array();
    	this.setValue(null);
    	this.comboBox.store.loadData([], false);
    	if (this.consultaiBatis != '') {
         	if (this.consultaiBatisFiltro == null) {
         		list = getCommonController().executeList(this.consultaiBatis);
         	} else {
         		list = getCommonController().executeFilter(this.consultaiBatis, this.consultaiBatisFiltro);
         	}

         	if (this.todo) {
         		eval('list[list.length] = {'+this.valueField+': this.todoValue, '+this.displayField+': this.todoDisplay}');
         	}
             this.comboBox.store.loadData(list, false);                  

             if (this.todo) {
             	this.setValue(this.todoValue);
             }
         } else {
         	if (this.todo) {
         		eval('list[0] = {'+this.valueField+': this.todoValue, '+this.displayField+': this.todoDisplay}');
                 this.comboBox.store.loadData(list,false);                     
                 this.setValue(this.todoValue);
         	}
         }
    	
    },
    
    onRender : function(ct, position){
    	Ext.form.ComboBoxNumberField.superclass.onRender.call(this, ct, position);

    	this.wrap = this.el.wrap({cls:'x-form-field-wrap x-form-cmbnf-wrap'});
    	this.el.addClass('x-form-cmbnf-text');
    	this.comboBox.render(this.wrap);
    	this.comboBox.wrap.addClass('x-form-cmbnf-combo');
    	
    	
    	 var list = new Array();
         
         if (this.consultaiBatis != '') {
         	if (this.consultaiBatisFiltro == null) {
         		list = getCommonController().executeList(this.consultaiBatis);
         	} else {
         		list = getCommonController().executeFilter(this.consultaiBatis, this.consultaiBatisFiltro);
         	}

         	if (this.todo) {
         		eval('list[list.length] = {'+this.valueField+': this.todoValue, '+this.displayField+': this.todoDisplay}');
         	}
             this.comboBox.store.loadData(list);                  

             if (this.todo) {
             	this.setValue(this.todoValue);
             }
         } else {
         	if (this.todo) {
         		eval('list[0] = {'+this.valueField+': this.todoValue, '+this.displayField+': this.todoDisplay}');
                 this.comboBox.store.loadData(list);                     
                 this.setValue(this.todoValue);
         	}
         }
    },
    
    onResize : function(w, h){
        Ext.form.ComboBoxNumberField.superclass.onResize.call(this, w, h);
        this.comboBox.setWidth(w * this.width);
        this.wrap.setWidth(w);
    },
    
    preFocus : Ext.emptyFn,
    
    getResizeEl : function(){
        return this.wrap;
    },

    getPositionEl : function(){
        return this.wrap;
    },

    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
    },
    
    clear : function() {
    },
    
    initComponent: function(){
    	var store_1 = new Ext.data.Store( {
			reader : new Ext.data.JsonReader( {
				record : 'RecordTipoGenerico'
			}, Ext.data.Record.create( [ {
				name : this.valueField,
				type : 'int'
			}, {
				name : this.displayField,
				type : 'string'
			} ])),
			data : []
		});
    	
    	
    	this.comboBox = new Ext.form.ComboBox({
    		store				:store_1,			
        	mode				:this.mode,			
        	triggerAction 		:this.triggerAction, 	
        	fieldLabel			:this.fieldLabel,		
        	displayField		:this.displayField,
        	valueNotFoundText	:this.valueNotFoundText,
        	valueField			:this.valueField,		
        	allowBlank			:this.allowBlank,		
        	editable 			:this.editable, 		
        	emptyText			:this.emptyTextComboBox,
        	forceSelection		:this.forceSelection,
        	disabled			:this.disabled,
        	inputType			:this.inputType,
        	consultaiBatis      :this.consultaiBatis,
        	todo 	            :this.todo,
        	listeners			:{
        		select	: this.setNumberFieldValue
	        },
        	padre			: this
    	});    	
    	
        Ext.form.ComboBoxNumberField.superclass.initComponent.call(this);
    }
});
Ext.reg('comboBoxNumberField', Ext.form.ComboBoxNumberField);