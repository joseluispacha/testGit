//Ext.extend(Ext.grid.GridPanelMultipleUpoload, Ext.grid.GridPanel, {
//
//});
    
Ext.grid.GridPanelMultipleUpload = function(id) {
	this.id = id;
//	
//	var renderStatus = function(dato) {
//		var salida = "";
//		if (dato != undefined) {
//			salida = "Existente";
//		}
//		return salida;
//	};
//	
    var File = Ext.data.Record.create([
                                  		{name: 'name', type: 'string'},
                                  		{name: 'size', type: 'int'},
                                  		{name: 'type', type: 'string'}
                                      ]);
	                            
    var storeFile = new Ext.data.Store({
          reader: new Ext.data.JsonReader({
                  record: 'file'
              }, File),
          data : []     
   	});
	                           
	this.store = storeFile;

	this.fileUpload = new Ext.form.FileUploadField();
	this.fileUpload.id = "upload" + this.id; 
	this.fileUpload.name = "upload" + this.id;
	this.fileUpload.emptyText = "Seleccione Archivos";
	this.fileUpload.fieldLabel = "File";
	this.fileUpload.buttonCfg = {text: 'Agregar'};
	this.fileUpload.buttonOnly = true;
	this.fileUpload.store = this.store;
    
	this.fileUpload.on('fileselected', function(uploadfile, files) {
        this.store.loadData(files);
    });	
	
	Ext.grid.GridPanelMultipleUpload.superclass.constructor.call(this, {
//	    initComponent : function(){
//        					Ext.grid.GridPanelMultipleUpload.superclass.initComponent.call(this);
//        					
//						},			
		title: 'Archivos',                       
        cm : new Ext.grid.ColumnModel([
                   {
           			header		: "<b>Nombre</b>",
           			dataIndex	: "name",
           			id			: "name",
           			tooltip 	: "Nombre",
           			width		: 350,
           			align		: "left",	
           			menuDisabled: true
           		}, {
           			header		: "<b>Tamaño</b>",
           			dataIndex	: "size",
           			id			: "size",
           			width		: 50,
           			align		: "right",	
           			menuDisabled: true	
           		}, {
           			header		: "<b>Tipo</b>",
           			dataIndex	: "type",
           			id			: "type",
           			width		: 50,
           			align		: "left",
           			menuDisabled: true
           		},{
           			header		: "<b> </b>",
           			dataIndex	: "status",
           			id			: "status",
           			width		: 50,
           			align		: "left",
           			menuDisabled: true //,
//           			renderer    : renderStatus
           		}
           	]),
            //renderTo: Ext.getBody(),
            sm: new Ext.grid.RowSelectionModel(),
            height: 300,
            border: true,
            items : [this.fileUpload] 
    });
};

Ext.extend(Ext.grid.GridPanelMultipleUpload, Ext.grid.GridPanel, {
	clear : function() {
		this.store.removeAll();
		this.fileUpload.clear();
	}
});



