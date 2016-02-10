var PersonaListView = function(options) {
	Ext.apply(this, options || {});

	var cm = new Ext.grid.ColumnModel([ {
		header : 'Id',
		dataIndex : 'id',
		width : 10,
		summaryType: 'sum'
	},{
		header : 'Nombre',
		dataIndex : 'nombre',
		width : 30
	},{
		header : 'Edad',
		dataIndex : 'edad',
		width : 30
	},{
		header : 'Ciudad',
		dataIndex : 'ciudad',
		width : 30
	}]);

	var form = new Ext.form.FormPanel({
		labelAlign	: 'left',
		frame		: true,
		shadow		: false,
		buttonAlign	: 'center',
		title		: 'Personas',
		labelWidth	: 90,
		layout		: 'column',
		items		: [{
			columnWidth	: .25,
			layout		: 'form',
			items		: [{
				xtype : 'numberfield',
				fieldLabel : 'Id',
				name : 'id',
				maxLength : 10,
				allowDecimals : false,
				allowNegative : false,
				anchor : '90%'
			}]
		}],
		buttons		: [{
			text : 'Consultar',
			width : 75,
			minWidth : 75,
			iconCls : 'icon-search',
			handler : function() {
				filtro = form.getForm().getData(new PersonaFiltro());
				searchFunction(filtro);
			}
		},{
			text : 'Limpiar',
			width : 75,
			minWidth : 75,
			iconCls : 'icon-clear',
			handler : function() {
				form.getForm().reset();
			}
		}]
	});

	var btnAdd = new Ext.Button({
		text : 'Nuevo',
		width : 75,
		minWidth : 75,
		iconCls : 'icon-add',
		handler : function() {
			getPersonaView().show();
		}
	});

	var btnLimpiar = new Ext.Button({
		text : 'Limpiar',
		iconCls : 'icon-clear',
		handler : function() {
			form.getForm().reset();
			getPersonaModel().getStore().removeAll();
		}
	});

	var pagingBar = new Ext.PagingToolbar({
		pageSize : 10,
		store : getPersonaModel().getStore(),
		displayInfo : true,
		displayMsg : "Registros {0} - {1} de {2}",
		emptyMsg : "Sin registros",
		beforePageText : "Página",
		afterPageText : "de {0}"
	});

	this.getPagingBar = function() {
		return pagingBar;
	};

	var grid = new Ext.grid.EditorGridPanel({
		store : getPersonaModel().getStore(),
		cm : cm,
		align : 'center',
		height : 300,
		labelAlign : 'center',
		bbar : pagingBar,
		plugins : [new Ext.ux.grid.GridSummary()],
		selModel : new Ext.grid.RowSelectionModel({
			singleSelect : true,
			moveEditorOnEnter : true
		}),
		viewConfig : {
			forceFit : true
		},
		tbar : [btnLimpiar, '->', btnAdd ],
		listeners : {
			celldblclick : function(grid, rowIndex, columnIndex, e) {
				var record = grid.store.getAt(rowIndex);
				getPersonaView().show(record);
			}
		}
	});

	var panel = new Ext.Panel({
		items : [form, grid]
	});

	this.getPanel = function() {
		return panel;
	};

	var searchFunction = this.search = function(filtro) {
		getPersonaModel().getStore().load({
			params : {
				start : 0,
				limit : pagingBar.pageSize
			},
			arg : [ "PersonaiBatis.getPersona", filtro ]
		});
	};

	this.destroy = function() {
//		panel.destroy();
	};
	
};

var personaListView;
function getPersonaListView(nuevo) {
	if (personaListView == null || nuevo) {
		personaListView = new PersonaListView();
		getWsController().register(personaListView);
	}
	return personaListView;
}