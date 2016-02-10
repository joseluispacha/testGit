package cl.colmena.common.test;

import java.io.File;

import junit.framework.TestCase;

public class ApplicationContextFileTest extends TestCase {
	
	private String path;
	
	public void setUp() {
		path = "\\opt\\testGit\\application-context.xml";
	}
	
	public void test() {
		File file = new File(path);
		assertEquals("Copia la carpeta \"opt\" ubicada en \"src/main/resources\" en la raiz de tu disco. El archivo no encontrado es \"" + path + "\"", true, file.exists());
	}
}
