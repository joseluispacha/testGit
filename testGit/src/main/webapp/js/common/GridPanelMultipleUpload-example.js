
Ext.onReady(function(){
	
	var gridPlanillas = new Ext.grid.GridPanelMultipleUpload("Planillas");
	gridPlanillas.title = "Planillas";
	
	var gridDepositos = new Ext.grid.GridPanelMultipleUpload("Depositos");
	gridDepositos.title = "Depósitos";
	
    var frmArchivos = new Ext.FormPanel({
    	renderTo : "fi-form",
        fileUpload: true,
        frame: true,
        title: "Archivos",
        autoHeight: true,
        bodyStyle: "padding: 10px 10px 0 10px;",
        labelWidth: 50,
        header : false,
        defaults: {
            anchor: "95%",
            allowBlank: false,
            msgTarget: "side"
        },
        layout : "column",        
        items: [{
        	columnWidth	: .5,
        	anchor		: "80%",
        	items		: [gridPlanillas]
        },{
        	columnWidth	: .5,
        	anchor		: "80%",
        	items		: [gridDepositos]
        }]
    });
       

  
    

    
});


