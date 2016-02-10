package cl.colmena.common.service;

import java.util.ArrayList;
import java.util.Collection;

import cl.colmena.common.dao.ICommonDao;
import cl.colmena.common.dao.mq.CommonDaoMQ;
import cl.colmena.common.model.ListRange;
import cl.colmena.common.model.Mix;
import cl.colmena.common.wrapper.CollectionWrapper;

public class CommonService {
	private ICommonDao commonDao;
	private CommonDaoMQ commonDaoMQ;
	
	public Object execute(String consultaIbatis,Object object) {
		Object obj = commonDao.execute(consultaIbatis, object);
		if(obj == null) {
			return object;
		}
		return obj;
	}
	
	public Collection<Object> executeFilter(String consultaIbatis, Object object) {
		return commonDao.executeFilter(consultaIbatis, object);
	}

	public Collection<Object> executeList(String consultaIbatis) {
		return commonDao.executeList(consultaIbatis);
	}

	public ListRange executePagination(String consultaIbatis, Object object, int inicio, int cantidad) {
		ListRange listRange = new ListRange();
		listRange.setData(commonDao.executePagination(consultaIbatis, object, inicio, cantidad));
		listRange.setTotalSize((Integer)commonDao.execute(consultaIbatis + "Cantidad", object));
		return listRange;
	}

	public Collection<Object> executeIterate(String consultaIbatis, CollectionWrapper collection) {
		Collection<Object> objects = new ArrayList<Object>();
		for (Object object : collection.getObjects()) {
			objects.add(commonDao.execute(consultaIbatis, object));
		}
		return objects;
	}
	
	public Mix executeMix(String consultaIbatis, Object object) {
		Mix mix = new Mix();
		mix.setInObj(object);
		mix.setOutObj(commonDao.execute(consultaIbatis, object));
		return mix;
	}

	public int executeDelete(String consultaIbatis, Object object) {
		return commonDao.executeDelete(consultaIbatis, object);
	}

	public int executeUpdate(String consultaIbatis, Object object) {
		return commonDao.executeUpdate(consultaIbatis, object);
	}
	
	public Object executeMQ(String serviceMQ, String input, Object object) throws Exception {
		return commonDaoMQ.executeMQ(serviceMQ, input, object);
	}

	public void setCommonDao(ICommonDao commonDao) {
		this.commonDao = commonDao;
	}
	
	public void setCommonDaoMQ(CommonDaoMQ commonDaoMQ) {
		this.commonDaoMQ = commonDaoMQ;
	}

}
