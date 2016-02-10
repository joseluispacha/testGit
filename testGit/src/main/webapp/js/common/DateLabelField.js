Ext.form.DateLabelField = Ext.extend(Ext.form.DateField,  {
	format 				: "d/m/Y",
	fieldClass			: "x-form-label-field",
	selectOnFocus		: true,
	disabled 			: true,
	hideTrigger 		: true,
	initComponent: function(){
		Ext.form.DateLabelField.superclass.initComponent.call(this);
	},
	initEvents : function(){
		Ext.form.DateLabelField.superclass.initEvents.call(this);
	}
});

Ext.reg('datelabelfield', Ext.form.DateLabelField);