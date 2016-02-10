<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="cl.colmena.common.constant.Constants"%>
<html lang="es">
	<head>
		<title>testGit - Colmena</title>
		<%@ include file="/pages/common/common.jsp" %>	
		<script type="text/javascript" src="<%=request.getContextPath()%>/pages/login/LoginView.js?<%= Constants.VERSION_APP %>"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/pages/login/LoginController.js?<%= Constants.VERSION_APP %>"></script>
		<script>
			Ext.onReady(function() {
				Ext.QuickTips.init();
				getLoginView().render('divLogin');
			});
		</script>
	</head>
	<body class="margen_sup">
		<table width="500" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr>	
				<td colspan="2" align="center">
					<br><img src="<%=request.getContextPath()%>/images/logoColmenaAzul.png" width="180">
				</td>
			</tr>
		 	<tr>
		  	  <td width="99" align="right"><img src="<%=request.getContextPath()%>/images/login.png"></td>
			  <td colspan="2" align="left" class="texto_titulo_azul"><p align="left">Login - testGit</p></td>		  	  	  	    
	  	    </tr>
		  	<tr>
		  		<td colspan="2" align="center">
					<div id="divLogin"></div>
				</td>	  	  	    
		  	</tr>
		</table>
	</body>
</html>
