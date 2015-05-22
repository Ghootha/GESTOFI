
var app = angular.module("app", [
    'validador',
    'myAppDocs',
    'myAppAutentificacion',
    'myAppPerfil',
    'myAppAulas',
    'myAppCorrespondencia',
    'myAppEquipos',
    'myAppRoles',
    'myAppReserva',
    'myAppSolicitudes',
    'myAppUsers',
    'myAppAgenda',
    'myAppConfigTipos',
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
