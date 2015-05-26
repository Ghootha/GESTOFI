
var app = angular.module("app", [
    'AppValidador',
    'AppDocumentos',
    'AppAutentificador',
    'AppPerfil',
    'AppAulas',
    'myAppCorrespondencia',
    'AppEquipos',
    'AppRoles',
    'AppReserva',
    'AppSolicitudes',
    'AppUsers',
    'myAppAgenda',
    'AppConfiguracion',
    'myAppNotificaciones',
    'AppSolicitudesUser',
    'Routes'
    ]);

  app.factory("MyService", function() {
    return {
      data: {}
    };
  });

app.controller("appController", function($scope) {

});
