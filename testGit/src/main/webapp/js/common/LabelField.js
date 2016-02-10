Ext.form.LabelField = Ext.extend(Ext.form.TextField,  {
    
    fieldClass			: "x-form-field",
    
    maxLength			: 255,
    
    selectOnFocus		: true,
    
    disabled 			: true,
    
//    Funcion que retorna el valor formateado
    pattern				: null,
    
    style				: "font: tahoma,arial,helvetica,sans-serif;" +
    					"background: #DFE8f6;" +
    					"color: #484848;" +
    					"font-weight: bold;" +
    					"border: none;" +
    					"margin-top: -1px;",    
    
    initComponent: function(){
        Ext.form.LabelField.superclass.initComponent.call(this);
    },
    
    initEvents 	: function(){
        Ext.form.LabelField.superclass.initEvents.call(this);
    },
      
    beforeBlur 	: function(){
        this.setValue(this.getValue().toUpperCase());
    },
    
    setValue : function(v){
    	if(this.emptyText && this.el && v !== undefined && v !== null && v !== ''){
            this.el.removeClass(this.emptyClass);
        }
    	if(this.pattern != null) {
    		Ext.form.LabelField.superclass.setValue.call(this, v);
            this.setRawValue(this.pattern(this.getValue()));
        } else {
            Ext.form.TextField.superclass.setValue.apply(this, arguments);
        }
    	this.applyEmptyText();
        this.autoSize();
    }
});

Ext.reg('labelfield', Ext.form.LabelField);