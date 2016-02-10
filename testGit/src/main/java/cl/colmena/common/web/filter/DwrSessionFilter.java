package cl.colmena.common.web.filter;

import java.lang.reflect.Method;

import org.apache.log4j.Logger;
import org.directwebremoting.AjaxFilter;
import org.directwebremoting.AjaxFilterChain;

import cl.colmena.common.constant.Constants;
import cl.colmena.common.helper.SessionHelper;

public class DwrSessionFilter implements AjaxFilter {

	static Logger logger = Logger.getLogger(DwrSessionFilter.class);
	
	public Object doFilter(Object obj, Method method, Object[] params, AjaxFilterChain chain) throws Exception {
		logger.debug(this.getClass().toString() + ".doFilter");
		if(method.getName().equals("login") || method.getName().equals("getContext")) {
			return chain.doFilter(obj, method, params);
		} 
		
		if(method.getName().equals("isValidSession")) {
			return isValidSession();
		}
		
		if(method.getName().equals("logout")) {
			logger.debug("Invalidando session anterior en caso que exista");
			SessionHelper.terminarSession();
			return true;
		} 
		
		if(!isValidSession()) {
			throw new Exception(Constants.SESSION_EXPIRADA);
		}
		return chain.doFilter(obj, method, params);
	}
	
	private boolean isValidSession() throws Exception {
		return SessionHelper.isSessionActiva();
	}
}

