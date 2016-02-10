<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="cl.colmena.common.constant.Constants"%>
<html lang="es">
	<head>
		<title>testGit - Colmena</title>
		<%@ include file="/pages/common/common.jsp"%>
		<%@ include file="/pages/common/app.jsp" %>
		<script>
			Ext.onReady(function() {
				Ext.QuickTips.init();
				getWsView().getContenedor().render('divWorkspace');	
			});
		</script>
	</head>
	<body>
		<div class="wrapper">
			<div class="header_colmena">
				<div class="header_titulo">Proyecto testGit</div>
				<span id="nombre_user_colmena" class="header_subtitulo_left"></span>
				<span id="live_clock_colmena" class="header_subtitulo_right"></span>
			</div>
			<div class="content_overflow">
				<div id="divWorkspace"></div>
			</div>
			<div class="footer"></div>
		</div>
	</body>
</html>