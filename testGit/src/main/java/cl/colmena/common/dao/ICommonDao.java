package cl.colmena.common.dao;

import java.util.Collection;

public interface ICommonDao {
	public Object execute(String consultaIbatis, Object object);
	public Collection<Object> executeFilter(String consultaIbatis, Object object);
	public Collection<Object> executeList(String consultaIbatis);
	public Collection<Object> executePagination(String consultaIbatis, Object object, int inicio, int cantidad);
	public int executeDelete(String consultaIbatis, Object object);
	public int executeUpdate(String consultaIbatis, Object object);
}
