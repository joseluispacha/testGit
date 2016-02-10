package cl.colmena.common.wrapper;

import java.util.Collection;

public class CollectionWrapper {
	Collection<Object> objects;
	
	public CollectionWrapper () {
	}

	public CollectionWrapper(Collection<Object> objects) {
		super();
		this.objects = objects;
	}

	public Collection<Object> getObjects() {
		return objects;
	}

	public void setObjects(Collection<Object> objects) {
		this.objects = objects;
	}
}
