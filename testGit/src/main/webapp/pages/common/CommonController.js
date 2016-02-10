function CommonController() {
	var usuario = null;
	var context = null;
	
	CommonAjax.getUsuario({async:false, callback:function(data){
		usuario = data;
	}});
	
	CommonAjax.getContext({async:false, callback:function(data){
		context = data;
	}});
	
	this.getUsuario = function() {
		return usuario;
	};
	
	this.getContext = function() {
		return context;
	};
	
	this.execute = function(object) {
		var output = null;		
		if (!object.callback) {
			object.callback = function(data){output = data;};
		}
		if (object.async == null || object.async == undefined) {
			object.async = false;
		}
		CommonAjax.execute(object.consultaIbatis, object.filtro, {async:object.async, callback:object.callback});
		return output;
	};
	
	this.executeFilter = function(object) {
		var output = null;		
		if (!object.callback) {
			object.callback = function(data){output = data;};
		}
		if (object.async == null || object.async == undefined) {
			object.async = false;
		}
		CommonAjax.executeFilter(object.consultaIbatis, object.filtro, {async:object.async, callback:object.callback});
		return output;
	};

	this.executeList = function(object) {
		var output = null;	
		if (!object.callback) {
			object.callback = function(data){output = data;};
		}
		if (object.async == null || object.async == undefined) {
			object.async = false;
		}
		CommonAjax.executeList(object.consultaIbatis, {async:object.async, callback:object.callback});
		return output;
	};

	this.executeMix = function(object) {
		var output = null;		
		if (!object.callback) {
			object.callback = function(data){output = data;};
		}
		if (object.async == null || object.async == undefined) {
			object.async = false;
		}
		CommonAjax.executeMix(object.consultaIbatis, object.filtro, {async:object.async, callback:object.callback});
		return output;
	};
	
	//MQ
	this.executeMQ = function(servicioMQ, input, objecto) {
		var output = null;
		CommonAjax.executeMQ(servicioMQ, input, objecto, {async:false, callback:function(result){
			output = result;
		}});
		return output;
	};
}

var commonController = null;
function getCommonController() {
	if (commonController == null) {
		commonController = new CommonController();
	}
	return commonController;
}
