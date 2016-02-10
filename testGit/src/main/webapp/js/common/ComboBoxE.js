
Ext.form.ComboBoxE = Ext.extend(Ext.form.ComboBox, {
    xtype : 'combo',
    displayField : 'nombre',
    valueField : 'id',
    valueDataType : 'int',
    forceSelection: true,
    allowNegative : false,
    allowDecimals : false,
    mode : 'local',
    triggerAction : 'all',
    editable : true,
    emptyText : 'Seleccione...',
    valueNotFoundText : 'Seleccione...',
    validationDelay : 0,
    consultaiBatis : '',
    consultaiBatisFiltro : null,
    consultaiBatisChildren : '',
    comboChildren : null,
    todo : false,
    todoValue : 999,    
    todoDisplay : 'Todos',
    
    onRender : function(ct, position) {
            Ext.form.ComboBoxE.superclass.onRender.call(this, ct, position);           

            var list = new Array();
            
            if (this.consultaiBatis != '') {
            	if (this.consultaiBatisFiltro == null) {
            		list = getCommonController().executeList({consultaIbatis : this.consultaiBatis});
            	} else {
            		//TODO
            		list = getCommonController().executeFilter(this.consultaiBatis, this.consultaiBatisFiltro);
            	}

            	if (this.todo) {
            		eval('list[list.length] = {'+this.valueField+': this.todoValue, '+this.displayField+': this.todoDisplay}');
            	}
                this.store.loadData(list);                  

                if (this.todo) {
                	this.setValue(this.todoValue);
                }
            } else {
            	if (this.todo) {
            		eval('list[0] = {'+this.valueField+': this.todoValue, '+this.displayField+': this.todoDisplay}');
                    this.store.loadData(list);                     
                    this.setValue(this.todoValue);
            	}
            }
    },
    onBlur : function() {
    			if (this.consultaiBatisChildren != '') {
    				var list = null;
    				var id = new IntegerWrapper();
    				id.value = this.getValue();
                  
    				list = getCommonController().executeFilter(this.consultaiBatisChildren, id);
                  
    				if (this.todo) {
    					eval('list[list.length] = {'+this.valueField+': this.todoValue, '+this.displayField+': this.todoDisplay}');
    				}                 

    				this.comboChildren.store.loadData(list);
    				if (this.todo) {
    					this.comboChildren.setValue(this.todoValue);
    				}
    			}
    },
    initComponent: function() {
    					this.store = new Ext.data.Store( {
    						reader : new Ext.data.JsonReader( {
    							record : 'RecordTipoGenerico'
    						}, Ext.data.Record.create( [ {
    							name : this.valueField,
    							type : this.valueDataType
    						}, {
    							name : this.displayField,
    							type : 'string'
    						} ])),
    						data : []
    					}),
    					Ext.form.ComboBox.superclass.initComponent.call(this);
    				}
});

Ext.reg('comboE', Ext.form.ComboBoxE);