package cl.colmena.common.dao.mq.parser;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import org.springframework.beans.BeanUtils;


/**
 * @author Nectia S.A. - César Burgos V.
 *
 */
public class StringParser
{
	private String resourcePath = "";
	private String resource = "";
	private ResourceBundle RESOURCE_BUNDLE;
	private static final  String COUNT = "count";
	private static final  String TYPE = "type";
	private static final  String SIZE = "size";
	private static final  String ITEM_SIZE = "item.size";
	private static final  String DYNAMIC_SIZE = "dynamic";
	private static final  String FORMAT = "format";
		
	public StringParser(){
		
	}
	
	public StringParser(String resource)
	{
		this.RESOURCE_BUNDLE = ResourceBundle.getBundle(resource);
	}
	
	public Object parseData(String data, Object object) throws Exception
	{
		if (data==null || data.trim().length()==0) throw new Exception("El servicio de acceso a datos VMS no responde.");
		try {
			String primaryKey = object.getClass().getName();
			int count = Integer.valueOf(this.RESOURCE_BUNDLE.getString(this.keyConstructor(primaryKey, StringParser.COUNT )).trim());
			int initialIndex  = 0;
			int lastIndex = 0;
			for (int i = 0; i < count; i++)
			{
				String atribute = this.RESOURCE_BUNDLE.getString(this.keyConstructor(primaryKey, i+"" ).trim());
				int longAtribute =  Integer.valueOf(this.RESOURCE_BUNDLE.getString(this.keyConstructor(primaryKey,atribute )).trim());
				String type =  this.RESOURCE_BUNDLE.getString(this.keyConstructor(primaryKey,this.keyConstructor(atribute, StringParser.TYPE))).trim();
				String dataResult = data.substring((initialIndex<=data.length())?(initialIndex):(data.length()), (initialIndex + longAtribute<=data.length())?(initialIndex + longAtribute):(data.length()));
				if (dataResult.trim().length()>0){ 
					lastIndex = this.setData(object, dataResult, atribute, type);
					longAtribute = (lastIndex>0)?(lastIndex):(longAtribute);
				}
				initialIndex = initialIndex + longAtribute;
			}
			return object;
		}catch (Exception e){
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
	}

	private List<Object> llenarLista(String data, String type, int itemSize, int size) throws Exception{
		List<Object> lista = new ArrayList<Object>();
		int initialIndex  = 0;
		for(int i = 0; i< size; i++){
			String dataResult = data.substring(initialIndex, (initialIndex + itemSize<=data.length())?(initialIndex + itemSize):(data.length()));
			if(dataResult.replaceAll("0", "").replaceAll(",","").trim().equals("")) break;
			Object objeto = this.llenarObjeto(dataResult, type);
			lista.add(objeto);
			initialIndex = initialIndex + itemSize;
		}
		return lista;
	}
	
	private Object llenarObjeto(String data, String type) throws Exception{
		Object objeto = null;
		objeto = this.parseData(data, BeanUtils.instantiateClass(Class.forName(type)));
		return objeto;
	}
	
	private String keyConstructor(String a, String b)
	{
		return a + "." + b;
	}
	
	private String getNameMethod(String a)
	{
		 String firstLeter = a.substring(0,1);
		 firstLeter = firstLeter.toUpperCase();
		 
		 return  "set" + firstLeter + a.substring(1) ;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private int setData(Object object, String data, String atributeName, String type) throws Exception
	{
		int lastIndex = 0;
		try {
			Class subjectClass = object.getClass();		
			Method[] methods = subjectClass.getMethods();
			Object[] args = {data};
			Method method = this.searchMethodForName(methods, this.getNameMethod(atributeName));
			String primaryKey = object.getClass().getName();
	
			if (type.equalsIgnoreCase("Integer")){
				args[0] = Integer.valueOf(data.trim());
			}
			else if (type.equalsIgnoreCase("String")){
				args[0] = String.valueOf(data.trim());
			}
			else if (type.equalsIgnoreCase("Double")){
				String formato = this.RESOURCE_BUNDLE.getString(this.keyConstructor(primaryKey,this.keyConstructor(atributeName, StringParser.FORMAT))).trim();
				if(formato.equals("parseDouble")){
					data = data.replace(".", "*");
					data = data.replace(",", ".");
					data = data.replace("*", ",");
					args[0]=Double.parseDouble(data.replaceAll(" ", ""));
				}
				else{
					String[] f = formato.split(",");
					int entero = Integer.valueOf(f[0]).intValue();
					int decimal = Integer.valueOf(f[1]).intValue();
					data = data.trim();
					data = data.substring(0, entero)+"."+data.substring(entero,entero+decimal);
					args[0] = Double.valueOf(data);
				}	
			}
			else if (type.equalsIgnoreCase("Date")){
				try{
				String formato = this.RESOURCE_BUNDLE.getString(this.keyConstructor(primaryKey,this.keyConstructor(atributeName, StringParser.FORMAT))).trim();
				if(formato.equals("dd/MM/yyyyHH:mm") && data.trim().length() == 10)
					formato = "dd/MM/yyyy";
				SimpleDateFormat format = new SimpleDateFormat(formato);
				String fecha = data.trim();
				args[0] = (fecha.replaceAll("0", "").equals(""))?(null):(format.parse(fecha));
				}catch(java.text.ParseException e){
					args[0] = null;
				}
			}
			else if (type.substring(0, 4).equalsIgnoreCase("List")){
				int size = Integer.valueOf(this.RESOURCE_BUNDLE.getString(this.keyConstructor(primaryKey,this.keyConstructor(atributeName, StringParser.SIZE))).trim());
				int itemSize = Integer.valueOf(this.RESOURCE_BUNDLE.getString(this.keyConstructor(primaryKey,this.keyConstructor(atributeName, StringParser.ITEM_SIZE))).trim());
				String dynamic = "False";
				try {
					dynamic = this.RESOURCE_BUNDLE.getString(this.keyConstructor(primaryKey,this.keyConstructor(atributeName, StringParser.DYNAMIC_SIZE))).trim();
				} catch (Exception e) {
					dynamic = "False";
				}
				String typeList = type.substring(5,type.length()-1);
				args[0] = this.llenarLista(data, typeList, itemSize, size);
				int elementos = ((List<Object>) args[0]).size();
				if (elementos!=size && dynamic.equalsIgnoreCase("True")){
					lastIndex = ( elementos + 1 ) * itemSize;
				}
			}
			else if (type.substring(0, 6).equalsIgnoreCase("Object")){
				String typeObject = type.substring(7,type.length()-1);
				args[0] = this.llenarObjeto(data, typeObject);
			}
			
			if (  method != null && !type.equalsIgnoreCase("Ignore")) 
			{
				method.invoke(object, args);
			}
		}catch (Exception e){
			System.out.println("Error de Parseo en Atributo: " + atributeName + " - Tipo: " + type + " - Data:[" + data + "]");
			e.printStackTrace();
			throw new Exception("Error de Parseo en Atributo: " + atributeName + " - Resource: " + this.getResource() + " - Tipo: " + type + " - Data:[" + data + "]");
		}
		return lastIndex;
	}
	
	private Method searchMethodForName(Method[] methods , String methodName) throws Exception
	{
		Method method = null;
		boolean findIT = false;
		
		for (int i = 0; ((i < methods.length) && !findIT) ; i++) 
		{
			findIT = methods[i].getName().equals(methodName);			
			method =  findIT ?  methods[i] : method;	
		}

		return method;
	}

	public String getResource() {
		return resource;
	}

	public void setResource(String resource) {
		this.resource = keyConstructor(resourcePath, resource);
		this.RESOURCE_BUNDLE = ResourceBundle.getBundle(this.resource);
	}

	public void setResourcePath(String resourcePath) {
		this.resourcePath = resourcePath;
	}

	public String getResourcePath() {
		return resourcePath;
	}
}
