function WorkspaceView() {
	var toolbar = getWsController().getToolbar();

	var pnlHome = new Ext.Panel({
		style		: 'height:100%',
		bodyStyle	: 'height:100%;top: 0;bottom: 0;',
		html 		: "<div class='img_colmena'><img src='" + getCommonController().getContext() + "/images/logoColmenaAzul.png'/></div>",
		listeners	: {
			render	: function(cmp) {
				cmp.bwrap.addClass('full_height_size');
			}
		}
	});
	
	var pnlContenedor = new Ext.Panel({
		style		: 'height:100%',
		bodyStyle	: 'height:100%;top: 0;bottom: 0;',
		items		: [pnlHome],
		tbar		: toolbar,
		listeners	: {
			render	: function(cmp) {
				cmp.bwrap.addClass('full_height_size');
			}
		}
	});
	
	this.getContenedor = function(){
		return pnlContenedor;			
	};
}

var wsView = null;
function getWsView(){
	if(wsView == null){
		wsView = new WorkspaceView;
	}		
	return wsView;
}