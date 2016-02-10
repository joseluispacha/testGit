package cl.colmena.common.helper;

import javax.servlet.http.HttpSession;

import org.directwebremoting.WebContextFactory;

import cl.colmena.common.constant.Constants;
import cl.colmena.security.model.Usuario;

public class SessionHelper {

	public static Usuario getUsuario() {
		return (Usuario) ((get() != null) ? get().getAttribute(Constants.SESSION_USUARIO) : null);
	}
	
	public static void iniciarSession(Usuario usuario) {
		try {
			get().invalidate();
		}catch(Exception ignore) {
			ignore.printStackTrace();
		}
		
		HttpSession session = org.directwebremoting.WebContextFactory.get().getSession(true);

		session.setAttribute(Constants.SESSION_USUARIO, usuario);
	}
	
	public static void terminarSession() {
		try {
			WebContextFactory.get().getSession().invalidate();
		}catch(Exception ignore) {	}
	}
	
	public static HttpSession get() {
		return org.directwebremoting.WebContextFactory.get().getSession(false);
	}
	
	public static boolean isSessionActiva() {
		return (get() != null && get().getAttribute(Constants.SESSION_USUARIO) != null);
	}
}