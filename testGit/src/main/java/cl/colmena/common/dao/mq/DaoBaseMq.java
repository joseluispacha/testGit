package cl.colmena.common.dao.mq;

import cl.colmena.common.dao.mq.parser.StringParser;
import cl.colmena.mq.ServiciosMQ;
import cl.colmena.mq.ServiciosMQDefaultImpl;

public class DaoBaseMq {
	private StringParser stringParser;

	private ServiciosMQ serviciosMQ;
	
	public String getMsgError(String msjRsp) {
		return "";
	}

	public ServiciosMQ getServiciosMQ() {
		serviciosMQ = new ServiciosMQDefaultImpl();	
		return serviciosMQ;
	}
	
	public void setServiciosMQ(ServiciosMQ serviciosMQ) {
		this.serviciosMQ = serviciosMQ;
	}

	public void setStringParser(StringParser stringParser) {
		this.stringParser = stringParser;
	}

	public StringParser getStringParser() {
		return stringParser;
	}
}
