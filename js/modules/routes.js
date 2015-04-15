var app = angular.module('routes', ['ngRoute']);

// Configuración de las rutas
app.config(function($routeProvider) {

	$routeProvider
		.when('/subirDocumento', {
			templateUrl	: 'pages/subirDocumento.html',
			controller 	: 'docController'
		})
		.when('/consultarDocumento', {
			templateUrl	: 'pages/consultarDocumento.html',
			controller 	: 'docController'
		})
		// .when('/home', {
		// 	templateUrl	: 'pages/consultarDocumento.html',
		// 	controller 	: 'docController'
		// })
		// // .when('/estudiante', {
		// // 	templateUrl	: 'pages/consultarDocumento.html',
		// // 	controller 	: 'docController'
		// // })
		// .when('/papeleria', {
		// 	templateUrl	: 'pages/consultarDocumento.html',
		// 	controller 	: 'docController'
		// })
		// .when('/correos', {
		// 	templateUrl	: 'pages/consultarDocumento.html',
		// 	controller 	: 'docController'
		// })
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
		/*.when('/profile', {
			templateUrl	: 'pages/Perfil.html',
			controller 	: 'perfilController'
		})
		.when('/home2', {
			templateUrl	: 'pages/Perfil.html',
			controller 	: 'perfilController'
		})*/
		.when('/ConfigTipos', {
			templateUrl	: 'pages/ConfigTipos.html',
			controller 	: 'configTiposController'
		}).when('/notificaciones', {
			templateUrl	: 'pages/notificaciones.html',
			controller 	: 'NotificacionesController'
		})
		/*.when('/agregarReservable', {
			templateUrl	: 'pages/ConfigTipos.html',
			controller 	: 'configTiposController'
		})
		.when('/editarReservable', {
			templateUrl	: 'pages/ConfigTipos.html',
			controller 	: 'configTiposController'
		})*/
		.otherwise({
			redirectTo: '/'
		});
});

