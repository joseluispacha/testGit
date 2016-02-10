package cl.colmena.common.web.ajax;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;

import cl.colmena.common.constant.Constants;
import cl.colmena.common.model.ListRange;
import cl.colmena.common.model.Mix;
import cl.colmena.common.service.CommonService;
import cl.colmena.common.wrapper.CollectionWrapper;
import cl.colmena.security.model.Usuario;

public class CommonAjax {

	private static CommonService commonService;
	
	public Object execute(String consultaIbatis, Object object) {
		return commonService.execute(consultaIbatis, object);
	}

	public Collection<Object> executeIterate(String consultaIbatis, CollectionWrapper collection) {
		return commonService.executeIterate(consultaIbatis, collection);
	}

	public Collection<Object> executeFilter(String consultaIbatis, Object object) {
		return commonService.executeFilter(consultaIbatis, object);
	}

	public ListRange executePagination(String consultaIbatis, Object object, int inicio, int cantidad) {
		return commonService.executePagination(consultaIbatis, object, inicio, cantidad);
	}

	public Collection<Object> executeList(String consultaIbatis) {
		return commonService.executeList(consultaIbatis);
	}

	public int executeDelete(String consultaIbatis, Object object) {
		return commonService.executeDelete(consultaIbatis, object);
	}

	public int executeUpdate(String consultaIbatis, Object object) {
		return commonService.executeUpdate(consultaIbatis, object);
	}
	
	public Mix executeMix(String consultaIbatis, Object object) {
		return commonService.executeMix(consultaIbatis, object);
	}
	
	public Object executeMQ(String serviceMQ, String input, Object object) throws Exception {
		return commonService.executeMQ(serviceMQ, input, object);
	}

	public Usuario getUsuario() {
		return (Usuario)getSession().getAttribute(Constants.SESSION_USUARIO);
	}
	
	public String getContext() {
		return getRequest().getContextPath();
	}
	
	protected static WebContext getWebContext() {
		return WebContextFactory.get();
	}

	protected static HttpServletRequest getRequest() {
		return getWebContext().getHttpServletRequest();
	}

	protected static HttpSession getSession() {
		return getRequest().getSession();
	}
	
	protected static void setObject(String id, Object object) {
		HttpSession session = getSession();
		session.setAttribute(id, object);
	}

	protected Object getObject(String id) {
		HttpSession session = getSession();
		return session.getAttribute(id);
	}
	
	protected static void removeObject(String id) {
		HttpSession session = getSession();
		session.removeAttribute(id);
	}
	
	protected String getIpEquipoCliente() {
		String ipHost = getRequest().getHeader("X-FORWARDED-FOR"); // Definido en el F5
		if(ipHost == null){
			ipHost = getRequest().getRemoteHost();
		}
		return ipHost;
	}
	
	public void setCommonService(CommonService commonService) {
		CommonAjax.commonService = commonService;
	}
	
}
