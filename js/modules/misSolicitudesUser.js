var app = angular.module("myAppSolicitudesUser", []);

app.controller("solicitudesUserController", function($scope, $http) {
   $scope.tabs = [  
      { link : '#Pendiente', label : 'Pendientes' },
      { link : '#Historial', label : 'Historial'},
      
    ]; 

});