function LoginView(){
	var form = new Ext.FormPanel({
		labelAlign : 'center',
		title : '<b>Ingrese sus datos</b>',
		bodyStyle : 'padding:5px 5px 5px',
		width : 300,
		align : 'center',
		labelWidth : 80,
		frame : true,
		shadow : true,
		items : [{
			xtype		: 'textfield',
			name		: 'username',
			fieldLabel	: 'username',
			allowBlank	: false,
			listeners	: {
				render	: function(cmp) {
					cmp.focus();
				}
			}
		},{
			xtype		: 'textfield',
			name		: 'password',
			fieldLabel	: 'password',
			allowBlank	: false,
			inputType	: 'password'
		}],
		buttonAlign : 'center',
		buttons : [{
			text : '&nbsp;Login',
			iconCls : 'icon-accept',
			handler : function() {
				if (form.getForm().isValid()) {
					var user = form.getForm().getData();
					getLoginController().login(user);
				}
			}
		},{
			text : '&nbsp;Limpiar',
			iconCls : 'icon-reload',
			handler : function() {
				form.getForm().reset();
			}
		}]
	});
	
	this.getForm = function() {
		return form.getForm();
	};

	var panel = new Ext.Panel({
		width : 300,
		autoHeight : true,
		items : [form]
	});

	this.render = function(htmlTag) {
		return panel.render(htmlTag);
	};
}

var loginView = null;
function getLoginView(){
	if(loginView == null){
		loginView = new LoginView;
	}
	return loginView;			
}