var app = angular.module('Routes', ['ngRoute']);

// Configuración de las rutas
app.config(function($routeProvider) {

	$routeProvider
		.when('/subirDocumento', { //nombre de la vista a mostrar
			templateUrl	: 'pages/subirDocumento.html', //direccion del html a mostrar
			controller 	: 'docController'			//controller ligado a dicha vista
		})
		.when('/consultarDocumento', {
			templateUrl	: 'pages/consultarDocumento.html',
			controller 	: 'docController'
		})
		.when('/SolicitudEquipo', {
			templateUrl	: 'pages/SolicitudEquipo.html',
			controller 	: 'equiposController'
		})
		.when('/SolicitudAula', {
			templateUrl	: 'pages/SolicitudAula.html',
			controller 	: 'aulaController'
		})
		.when('/SolicitudGiras_Vacaciones', {
			templateUrl	: 'pages/SolicitudGiras_Vacaciones.html',
			controller 	: 'solicitudController'
		})
		.when('/ControlReservas', {
			templateUrl	: 'pages/ControlReservas.html',
			controller 	: 'reservaController'
		})
		.when('/SolicitudesUsuario', {
			templateUrl	: 'pages/SolicitudesUsuario.html',
			controller 	: 'solicitudesUserController'
		})
		.when('/agenda', {
			templateUrl	: 'pages/agenda.html',
			controller 	: 'agendaController'
		})
		.when('/EnviarCorrespondencia', {
			templateUrl	: 'pages/EnviarCorrespondencia.html',
			controller 	: 'CorrespondenciaController'
		})
		.when('/correspondencia', {
			templateUrl	: 'pages/correspondencia.html',
			controller 	: 'CorrespondenciaController'
		})
		.when('/ConfigRol', {
			templateUrl	: 'pages/ConfigRol.html',
			controller 	: 'rolController'
		})
		.when('/ConfigUsuarios', {
			templateUrl	: 'pages/ConfigUsuarios.html',
			controller 	: 'userController'
		})
		.when('/RespuestaSolicitud', {
			templateUrl	: 'pages/RespuestaSolicitud.html',
			controller 	: 'solicitudController'
		})
		.when('/Perfil', {
			templateUrl	: 'pages/Perfil.html',
			controller 	: 'perfilController'
		})
		.when('/ConfigTipos', {
			templateUrl	: 'pages/ConfigTipos.html',
			controller 	: 'configController'
		})
		.when('/notificaciones', {
			templateUrl	: 'pages/notificaciones.html',
			controller 	: 'NotificacionesController'
		}).when('/ayuda', {
            templateUrl	: 'pages/ayuda.html',
            controller 	: 'AyudaController'
        })
		.otherwise({
			redirectTo: '/'
		});
});

