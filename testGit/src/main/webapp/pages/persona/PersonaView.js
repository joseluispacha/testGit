var PersonaView = function(options) {
		
	var form = new Ext.Panel({
	    labelAlign : 'left',
		frame : true,
		shadow : true,
		layout : 'form',
		labelWidth : 60,
		items : [{
			xtype : 'textfield',
			xid : 'id', 
            fieldLabel : 'Id',
            anchor : '90%',
            disabled : true
		},{
			xtype : 'textfield',
			xid : 'nombre', 
            fieldLabel : 'Nombre',
            anchor : '90%'
		}]
	});
	
	var reset = function() {
		panel.getForm().reset();
	};
		
	var btnGrabar = new Ext.Button({
		text :'Grabar',
		width : 75,
		minWidth : 75,
		iconCls : 'icon-save',
		handler : function() {
			
		}
	});
		
	var btnCerrar = new Ext.Button({
		text :'Cerrar',
		width : 75,
		minWidth : 75,
		iconCls : 'icon-exit',
		handler : function() {
			win.hide();
		}
	});
		
	var panel = new Ext.form.FormPanel({
		width :500,
		items : [form],
		bbar : new Ext.Toolbar({
            buttons: [btnGrabar, '->', btnCerrar]
        })
	});
		
	var win = new Ext.Window({
		width: 500,
		title: 'Persona',
		autoHeight: true,
		closeAction: 'hide',
		plain: true,
		modal: true,
		items: [panel],
		listeners : {
   			hide: function() {
   				reset();
			}
		}
	});
	
	this.show = function(record) {
		win.show();
		if (record != null) {
			panel.getForm().loadRecord(record);
		}
	};
		
	this.hide = function() {
		win.hide();
	};
		
};

Ext.extend(PersonaView, Ext.util.Observable);

var personaView;
function getPersonaView() {
	if (personaView == null) {
		personaView = new PersonaView();
	}
	return personaView;
}