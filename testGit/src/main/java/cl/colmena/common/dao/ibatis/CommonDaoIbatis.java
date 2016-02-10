package cl.colmena.common.dao.ibatis;

import java.util.Collection;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;

import cl.colmena.common.dao.ICommonDao;

public class CommonDaoIbatis implements ICommonDao {
	
	private SqlSessionTemplate sqlSessionTemplate;

	public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		this.sqlSessionTemplate = sqlSessionTemplate;
	}
	
	public Object execute(String consultaIbatis, Object object) {
		return sqlSessionTemplate.selectOne(consultaIbatis, object);
	}

	public Collection<Object> executeFilter(String consultaIbatis, Object object) {
		return sqlSessionTemplate.selectList(consultaIbatis, object);
	}

	public Collection<Object> executePagination(String consultaIbatis, Object object, int inicio, int cantidad) {
		return sqlSessionTemplate.selectList(consultaIbatis, object, new RowBounds(inicio, cantidad));
	}

	public Collection<Object> executeList(String consultaIbatis) {
		return sqlSessionTemplate.selectList(consultaIbatis);
	}

	public int executeDelete(String consultaIbatis, Object object) {
		return sqlSessionTemplate.delete(consultaIbatis, object);
	}

	public int executeUpdate(String consultaIbatis, Object object) {
		return sqlSessionTemplate.update(consultaIbatis, object);
	}
}
