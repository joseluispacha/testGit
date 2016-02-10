<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="cl.colmena.common.constant.Constants"%>
<html lang="es">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">	
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/js/ext2/resources/css/ext-all.css?<%= Constants.VERSION_APP %>"/>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/main.css?<%= Constants.VERSION_APP %>"/>
				
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/ext2/adapter/ext/ext-base.js?<%= Constants.VERSION_APP %>"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/ext2/ext-all-debug.js?<%= Constants.VERSION_APP %>"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/ext2/build/locale/ext-lang-es.js?<%= Constants.VERSION_APP %>"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/UtilExt.js?<%= Constants.VERSION_APP %>"></script>
	
		<script type='text/javascript' src="<%=request.getContextPath()%>/dwr/engine.js?<%= Constants.VERSION_APP %>"></script>
		<script type='text/javascript' src="<%=request.getContextPath()%>/dwr/util.js?<%= Constants.VERSION_APP %>"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/UtilDWR.js?<%= Constants.VERSION_APP %>"></script>
		<script type='text/javascript' src="<%=request.getContextPath()%>/dwr/interface/CommonAjax.js?<%= Constants.VERSION_APP %>"></script>
		<script type='text/javascript' src="<%=request.getContextPath()%>/dwr/interface/SeguridadAjax.js?<%= Constants.VERSION_APP %>"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/DWRProxy.js?<%= Constants.VERSION_APP %>"></script>	
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/RutField.js?<%= Constants.VERSION_APP %>"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/NumericField.js?<%= Constants.VERSION_APP %>"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/GridSummary.js?<%= Constants.VERSION_APP %>"></script>
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/pages/common/CommonController.js?<%= Constants.VERSION_APP %>"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/pages/workspace/WorkspaceController.js?<%= Constants.VERSION_APP %>"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/pages/workspace/WorkspaceView.js?<%= Constants.VERSION_APP %>"></script>
	</head>
	<body>
	</body>
</html>