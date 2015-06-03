var app = angular.module("AppAyuda", ['ngRoute']);

app.controller("AyudaController", function($scope, $http, $timeout, $location, $window, $route, $interval) {

    $scope.ayuda= [
        {nombre: "Agenda", video:"agenda.mp4"},
        {nombre: "Configuración De Rol", video:"configRol.mp4"},
        {nombre: "Configuración de Sistema", video:"configSis.mp4"},
        {nombre: "Configuración de Usuarios", video:"configUsuarios.mp4"},
        {nombre: "Control de Reservas", video:"controlReservas.mp4"},
        {nombre: "Correspondencia", video:"correspondencia.mp4"},
        {nombre: "Login", video:"login.mp4"},
        {nombre: "Repositorio", video:"repositorio.mp4"},
        {nombre: "Responder Solicitudes", video:"responderSolicitudes.mp4"},
        {nombre: "Solicitudes", video:"Solicitudes.mp4"}
    ];

    $scope.abrirVideo = function(video){
        $window.open('http://gestofi.com/webservice/ManualUsuario/'+video);
    }

});