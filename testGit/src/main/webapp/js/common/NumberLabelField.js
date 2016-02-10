Ext.form.NumberLabelField = Ext.extend(Ext.form.NumberField,  {
	fieldClass			: "x-form-label-field",
	selectOnFocus		: true,
	disabled 			: true,
	initComponent: function(){
		Ext.form.NumberLabelField.superclass.initComponent.call(this);
	},
	initEvents : function(){
		Ext.form.NumberLabelField.superclass.initEvents.call(this);
	},
	beforeBlur : function(){
		this.setValue(this.getValue().toUpperCase());
	}
});

Ext.reg('numberlabelfield', Ext.form.NumberLabelField);
