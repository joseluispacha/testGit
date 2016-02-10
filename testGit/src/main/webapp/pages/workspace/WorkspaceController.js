function WorkspaceController() {
	
	function exit() {	
		Ext.MessageBox.confirm('Confirmaci&oacute;n', 
			'&iquest;Est&aacute; seguro que desea salir?', 
			function(btn){	
				if (btn == 'yes') {
					SeguridadAjax.logout({async:true, callback:function(){
						window.location = getCommonController().getContext();
					}});
				}
			}
		);
	};
	
	(function(){
		Ext.fly('nombre_user_colmena').update('Bienvenido(a): ' + getCommonController().getUsuario().nombreCompleto);
		var task = {
				run: function(){
					Ext.fly('live_clock_colmena').update(new Date().format('d/m/Y H:i:s'));
				},
				interval: 1000
			};
		var runner = new Ext.util.TaskRunner();
		runner.start(task);
	})();

	this.getToolbar = function() {
		var toolBar = null;
		SeguridadAjax.getToolbar({async:false, callback:function(data) {
			toolBar = eval(data);
		}});
		return toolBar;
	};
	
	var clear = function() {
		getWsView().getContenedor().items.each(
			function (item, index, length) {
				if (item.id != 'toolbar') {
					getWsView().getContenedor().remove(item);							
					if (item.destroy) {
						item.destroy();
					}
					item = null;
				}
			}
		);
		
		for ( var i = 0; i < views.length; i++) {
			views[i].destroy();
			views[i] = null;
		}
		views = null;
		views = new Array();
	};
    
	var views = new Array();	
	this.register = function(view) {
	    views[views.length] = view;
	
	};
	
	this.add = function(view) {
		clear();
		getWsView().getContenedor().add(view);
		getWsView().getContenedor().render();
	};

}

var wsCtrl = null;
function getWsController() {
	if(wsCtrl == null) {
		wsCtrl = new WorkspaceController();
	}
	return wsCtrl;			
}