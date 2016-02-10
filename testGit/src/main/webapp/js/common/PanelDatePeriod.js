Ext.form.PanelDatePeriod = Ext.extend(Ext.Panel, {
	layout : 'column',
	name : '',
	fieldLabelTo : 'Hasta',
	fieldLabel : 'Desde',
	format : 'd/m/Y',
	idFrom : null,
	idTo : null,
	nameFrom : null,
	nameTo : null,
	widthFrom : 100,
	widthTo : 100,
	labelWidthFrom: 40,
	labelWidthTo: 40,
	maxLength : this.maxLength,
	readOnly : false,
	allowBlank : true,
	isFormField : true,
	maxMonth : -1,
	maxPeriod : -1,
	invalidData : 'Ingrese ambos Periodos',
	invalidOrderPeriod : 'La fecha de inicio no puede superar la fecha de t�rmino',
	invalidmaxMonths : 'El periodo de busqueda seleccionado excede el máximo. Máximo 3 meses',
	invalidmaxPeriod : 'La diferencia de periodos excede el m�ximo. Máximo 16 periodos',
	disabled: false,
    initComponent: function(){ 
    	
    	this.addEvents('change');
    	
		this.dfIni = new Ext.form.DateField({
    		xtype : 'datefield',
			hideLabel : true,
			format : this.format,
			maxLength : this.maxLength,
			readOnly : this.readOnly,
			allowBlank : this.allowBlank,
			disabled: this.disabled,
			width: this.widthFrom
    	});
        
        this.dfIni.on('change', function(){
            this.fireEvent('change', this);
        }, this);

        this.dfFin = new Ext.form.DateField({
        	xtype : 'datefield',
			hideLabel : false,
			fieldLabel : this.fieldLabelTo,
			format : this.format,
			maxLength : this.maxLength,
			readOnly : this.readOnly,
			allowBlank : this.allowBlank,
			disabled: this.disabled,
			width: this.widthTo
        });

        this.dfFin.on('change', function(){
            this.fireEvent('change', this);
        }, this);

        this.items = [{
        	columnWidth : .5,
        	labelWidth: this.labelWidthFrom,
        	layout : 'form',
        	items : [this.dfIni]
        },{
        	columnWidth : .5,
        	layout : 'form',
        	labelWidth: this.labelWidthTo,
        	items : [this.dfFin]
        }];
        
        Ext.form.PanelDatePeriod.superclass.initComponent.call(this);
    },
    onRender : function(ct, position){
    	Ext.form.PanelDatePeriod.superclass.onRender.call(this, ct, position);
    },
    getName : function(){
    	return this.name;
    },
    getValueFrom : function(){
    	return this.dfIni.getValue();
    },
    getValueTo : function(){
    	return this.dfFin.getValue();
    },
    setValueFrom : function(v){
    	this.dfIni.setValue(v);
    },
    setValueTo : function(v){
    	this.dfFin.setValue(v);
    },
    validate : function(){
    	if(!this.dfIni && !this.dfFin) {
    		return true;
    	}
    	var respIni = this.dfIni.isValid();
    	var respFin = this.dfFin.isValid();
    	if (!respIni || !respFin) {
    		return false;
    	}
    	var dIni = this.dfIni.getValue();
    	var dFin = this.dfFin.getValue(); 

    	if(dIni != "" && dFin == "") {
    		this.dfFin.markInvalid(String.format(this.invalidData));
    		return false;
    	}
    	if(dIni == "" && dFin != "") {
			this.dfIni.markInvalid(String.format(this.invalidData));
    		return false;
    	}
    	if(dIni > dFin){
    		this.dfIni.markInvalid(String.format(this.invalidOrderPeriod));
    		this.dfFin.markInvalid(String.format(this.invalidOrderPeriod));
    		return false;
    	}
    	
    	if (this.maxPeriod != -1){
    		var periodDiff = (dFin - dIni) / 3600*1000;
    		if (periodDiff > 16){
    			this.dfIni.markInvalid(String.format(this.invalidmaxPeriod));
        		this.dfFin.markInvalid(String.format(this.invalidmaxPeriod));
        		return false;
    		}
    	}
    	
    	if (this.maxMonth != -1) {
    		var monthDiff = (dFin - dIni) / (3600*1000*24);
    		if (monthDiff > 90) {
    			this.dfIni.markInvalid(String.format(this.invalidmaxMonths));
    			return false;
    		}
    	}
		return true;
    },
    formatDate : function (date) {
    	this.dfIni.formatDate(date);
    },
    formatDateFrom : function () {
    	this.dfIni.formatDate(this.dfIni.getValue());
    },
    formatDateTo : function () {
    	this.dfFin.formatDate(this.dfFin.getValue());
    },
    reset : function (date) {
    	this.dfIni.reset();
    	this.dfFin.reset();
    },
    setFormat : function(v) {
        this.dfIni.format = v;
        this.dfFin.format = v;
    },
    setDisabled : function(v) {
        this.dfIni.setDisabled(v);
        this.dfFin.setDisabled(v);
    },
	setFieldLabel : function(text) {
		Ext.fly(this.el.dom.parentNode.previousSibling).update(text);
	}

});

Ext.reg('paneldateperiod', Ext.form.PanelDatePeriod);
