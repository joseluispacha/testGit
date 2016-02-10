package cl.colmena.common.dao.mq;

import cl.colmena.common.dao.mq.parser.StringParser;

public class CommonDaoMQ extends DaoBaseMq{ 

	public Object executeMQ(String serviceMQ, String input, Object object) throws Exception{
		try {
			String msjRespuesta = this.getServiciosMQ().execute(serviceMQ, input);
			StringParser parser = this.getStringParser();
			parser.setResource(serviceMQ);
			Object obj = (Object)parser.parseData(msjRespuesta, object);
			if(obj == null){
				return object;
			}
			return obj;
		} catch (Exception e) {				
			throw new Exception(e.getMessage() + ". Revisar que estén todos los servicios arriba y que no existan mensajes encolados en el ambiente que corresponda. " + this.getClass().toString() + serviceMQ, e);
		}
	}
	
}
