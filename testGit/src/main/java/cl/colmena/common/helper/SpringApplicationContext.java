package cl.colmena.common.helper;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class SpringApplicationContext implements ApplicationContextAware {

	private static ApplicationContext context;
	
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		SpringApplicationContext.context = context;
	}
	
	public static Object getBean(String beanName) {
		return context.getBean(beanName);
	}
}
