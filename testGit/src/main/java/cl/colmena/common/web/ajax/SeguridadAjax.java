package cl.colmena.common.web.ajax;

import java.util.Collection;
import java.util.Iterator;

import org.directwebremoting.WebContextFactory;

import cl.colmena.common.constant.Constants;
import cl.colmena.common.helper.SessionHelper;
import cl.colmena.common.wrapper.BooleanWrapper;
import cl.colmena.security.model.Opcion;
import cl.colmena.security.model.Result;
import cl.colmena.security.model.Usuario;
import cl.colmena.security.service.ColmenaSecurityService;

public class SeguridadAjax {

	private static ColmenaSecurityService colmenaSecurityService;

	public Usuario getUsuario(String username)  {
		return colmenaSecurityService.getUsuario(username.toUpperCase());
	}

	public Result login(Usuario usuario) {
		Result result = null;
		String ip = WebContextFactory.get().getHttpServletRequest().getRemoteAddr();
		result = colmenaSecurityService.chequeaUsuario(usuario.getUsername().toUpperCase(), usuario.getPassword(), ip);
		if (result.getCodigo() == 0) {
			Collection<Opcion> arbolOpciones = colmenaSecurityService.obtieneArbolPrivilegios(usuario.getUsername(), Constants.ID_APP);
			if (tieneAlgunAcceso(arbolOpciones)) {
				Usuario usuarioConectado = colmenaSecurityService.getUsuario(usuario.getUsername().toUpperCase().toUpperCase());
				usuarioConectado.setPassword("**********");
				SessionHelper.iniciarSession(usuarioConectado);
			} else {
				result.setCodigo(1);
				result.setError("No tiene permiso para acceder a esta Aplicación");
			}
		}
		return result;
	}
	
	public void logout() {
		SessionHelper.terminarSession();
	}
	
	public boolean isValidSession() {
		return SessionHelper.isSessionActiva();
	}
		
	@SuppressWarnings("unchecked")
	private boolean tieneAlgunAcceso(Collection<Opcion> arbolOpciones) {
		for (Opcion opcion : arbolOpciones) {
			if (opcion.isAccesible()) {
				return true;
			}
			if (opcion.getSubOpciones() != null && !opcion.getSubOpciones().isEmpty()) {
				if (tieneAlgunAcceso(opcion.getSubOpciones())) {
					return true;
				}
			}
		}		
		return false;
	}
	
	public String getToolbar() {
		String toolbar = "";
		String usuario = ((Usuario)SessionHelper.get().getAttribute(Constants.SESSION_USUARIO)).getUsername();
		int aplicacion = Constants.ID_APP;
		
		Collection <Opcion> listaOpciones = colmenaSecurityService.obtieneArbolPrivilegios(usuario, aplicacion);
		Opcion padre = new Opcion();
		padre.setAccesible(true);
		padre.setCodigo("0");
		padre.setId(0);
		padre.setSistema(0);
		padre.setSubOpciones(listaOpciones);
		padre.setUrl("");
		
		BooleanWrapper visible = new BooleanWrapper(false);
		String menu = getItemsToolbar(padre, 0, visible);
		
		String textSalir = ", '->' ,{" + 
				" text 	: '&nbsp;Salir&nbsp;&nbsp;'," + 
				" iconCls : 'icon-exit'," + 
				" handler : exit" + 		      		
				"}";

		toolbar = " new Ext.Toolbar({ " + 
				" id : 'toolbar'," +
				" items  : [" + menu + textSalir + "]" +
				" });";
		return toolbar;
	}

	@SuppressWarnings("unchecked")
	private String getItemsToolbar(Opcion opcion, int nivel, BooleanWrapper visible) {
		String menu = "";
		for (Iterator<Opcion> iterator = opcion.getSubOpciones().iterator(); iterator.hasNext();) {
			Opcion subOpcion = (Opcion) iterator.next();

			String url = subOpcion.getUrl();
			
			String disabled = "disabled : true";
			if (subOpcion.isAccesible()) {
				disabled = "disabled : false";
				visible.setValue(true);
			}
	
			String subMenu = "";
			String iconCls = "iconCls: 'icon-list',";
			String handler = "handler: function(){" + url + ";},";
			if (subOpcion.getSubOpciones() != null && subOpcion.getSubOpciones().size() > 0) {
				handler = "";
				iconCls = "iconCls: 'icon-menu',";
				BooleanWrapper visibleOpcion = new BooleanWrapper(false);
				subMenu = "menu: [" + getItemsToolbar(subOpcion, nivel, visibleOpcion) + "],";
				if (visibleOpcion.isValue()) {
					disabled = "disabled : false";
				}
			}
						
			menu += " new Ext.Action({ " +
					" text: '" + subOpcion.getNombre() + "'," +
					iconCls +
					handler +
					subMenu +
					disabled +
					"})";

			if (iterator.hasNext()) menu += ","; 
		}			
		return menu;
	}
	
	public void setColmenaSecurityService(ColmenaSecurityService colmenaSecurityService) {
		SeguridadAjax.colmenaSecurityService = colmenaSecurityService;
	}

}