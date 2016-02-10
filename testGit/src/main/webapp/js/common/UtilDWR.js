dwr.engine.setErrorHandler(function errorHandler(message, ex){
	if(ex){  
		if (message == 'SESSION_EXPIRADA') {
			Ext.Msg.alert(	'Atenci&oacute;n',
							'Su sesi&oacute;n ha expirado, por favor ingrese nuevamente.', 
							function() {
								window.location = getCommonController().getContext();
							});
		} else {
			Ext.Msg.alert('ERROR', 'javaClassName => ' + ex.javaClassName + '<br/>Message => ' + message, function(){});
		}
	}
});

var mask = null;

dwr.engine.setPreHook(function() {
	if (mask == null) {
		mask = new Ext.LoadMask(Ext.getBody(), {msg: 'Cargando...'});
	}
	mask.show();
});

dwr.engine.setPostHook(function() {
	mask.hide();
});
