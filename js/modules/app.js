
var app = angular.module("app", [
    'validador',
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
    'routes'
    ]);

  app.factory("MyService", function() {
    return {
      data: {}
    };
  });

app.controller("appController", function($scope) {

});
