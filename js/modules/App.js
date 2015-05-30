
var app = angular.module("app", [
    'AppValidador',
    'AppDocumentos',
    'AppAutentificador',
    'AppPerfil',
    'AppAulas',
    'AppCorrespondencia',
    'AppEquipos',
    'AppRoles',
    'AppReserva',
    'AppSolicitudes',
    'AppUsers',
    'AppAgenda',
    'AppConfiguracion',
    'AppNotificaciones',
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
