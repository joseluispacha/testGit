var PersonaModel = function(options) {
	var record = new Ext.data.Record.create([
		{name : 'id', type : 'int'},  
		{name : 'nombre', type : 'string'}
	]);

	var store = new Ext.data.Store({
	    proxy	: new Ext.data.DWRProxy(CommonAjax.executePagination),
	    reader	: new Ext.data.ListRangeReader({
	    	id				: 'id', 
	    	totalProperty	: 'totalSize'
		}, 
		record),
	    remoteSort: true
	});
		
	this.getStore = function(){
		return store;
	};
	
	this.getStoreDetalle = function(){
		return storeDetalle;
	};
};

var personaModel = null;
function getPersonaModel() {
	if (personaModel == null) {
		personaModel = new PersonaModel();
	}
	return personaModel;
};
