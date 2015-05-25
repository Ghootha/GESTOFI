
var app = angular.module("app", [
    'validador',
    'AppDocumentos',
    'AppAutentificador',
    'myAppPerfil',
    'myAppAulas',
    'myAppCorrespondencia',
    'myAppEquipos',
    'AppRoles',
    'myAppReserva',
    'myAppSolicitudes',
    'AppUsers',
    'myAppAgenda',
    'AppConfiguracion',
    'myAppNotificaciones',
    'myAppSolicitudesUser',
    'routes'
    ]);

  app.factory("MyService", function() {
    return {
      data: {}
    };
  });

app.controller("appController", function($scope) {

});
