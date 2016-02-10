Ext.form.RutField = Ext.extend(Ext.form.TextField,  {
    
    fieldClass			: "x-form-field x-form-num-field",
    
    baseChars 			: "0123456789\\-Kk",
    
    maxLength			: 11,
    
    minLength			: 7,
    
    regEmpRut			: /^([\d]+)-([\d|K|k]){1}$/,

    invalidFormat		: 'El formato del rut {0} no es válido. Ingrese un rut con formato 12345678-K',
    
    invalidRut			: 'El número de rut {0} no es válido',
    
    invalidRutLenght	: 'Largo de rut inválido {0}',
    
    selectOnFocus		: true,
    
    
    
    initComponent: function(){
        Ext.form.RutField.superclass.initComponent.call(this);
    },
    
    initEvents : function(){
        Ext.form.RutField.superclass.initEvents.call(this);
        var allowed = this.baseChars+'';
        this.stripCharsRe = new RegExp('[^'+allowed+']', 'g');
        var keyPress = function(e){
            var k = e.getKey();
            if(!Ext.isIE && (e.isSpecialKey() || k == e.BACKSPACE || k == e.DELETE)){
                return;
            }
            var c = e.getCharCode();
            if(allowed.indexOf(String.fromCharCode(c)) === -1){
                e.stopEvent();
            }
        };
        this.el.on("keypress", keyPress, this);
    },
    
    validateValue : function(value){
        if(!Ext.form.RutField.superclass.validateValue.call(this, value)){
            return false;
        }
        if(value.length < 1){              
        	return true;
        }
        if(!this.regEmpRut.test(value)){
        	this.markInvalid(String.format(this.invalidFormat, value));
        	return false;
        }
        
        var array_rut = value.split('-');
        var rut = array_rut[0];
        
        var resp = 0;
        var factor = 2;
        for ( var int = 1 ; int <= rut.length ; int++) {
        	resp += factor * parseInt(rut.charAt(rut.length - int));
        	factor = factor == 7 ? 2 : factor + 1 ; 
		}
        resp = 11 - (resp % 11);
        switch (resp) {
			case 10:
				resp = 'K';
				break;
			case 11:
				resp = '0';
				break;
			default:
				resp = resp+'';
				break;
		}
        if(!(resp == array_rut[1].toUpperCase())){
        	this.markInvalid(String.format(this.invalidRut, value));
        	return false;
        }
        if (this.minLength && value.length < this.minLength) {
        	this.markInvalid(String.format(this.invalidRutLenght, value));
        	return false;
        }
        return true;
    },
        
    beforeBlur : function(){
        this.setValue(this.getValue().toUpperCase());
    }
});

Ext.reg('rutfield', Ext.form.RutField);