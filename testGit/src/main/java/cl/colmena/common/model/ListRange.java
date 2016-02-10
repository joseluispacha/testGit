package cl.colmena.common.model;

import java.io.Serializable;
import java.util.Collection;

public class ListRange implements Serializable {
	private static final long serialVersionUID = 1L;

	private Collection<?> data;
	private int totalSize;

	public Collection<?> getData() {
		return data;
	}

	public void setData(Collection<?> data) {
		this.data = data;
	}

	public int getTotalSize() {
		return totalSize;
	}

	public void setTotalSize(int totalSize) {
		this.totalSize = totalSize;
	}
}