function LoginController(){
	this.login = function(user) {
		SeguridadAjax.login(user, {async:true,callback:function(result){
			if (result.codigo == 0) {
				location.href = getCommonController().getContext() + "/pages/workspace/workspace.jsp";
			} else {
				Ext.MessageBox.alert('Aviso',result.error);
			}
		}});			
	};
}

var loginCtrl = null;
function getLoginController() {
	if(loginCtrl == null) {
		loginCtrl = new LoginController();
	}
	return loginCtrl;
}