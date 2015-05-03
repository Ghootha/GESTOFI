var app = angular.module("myAppSolicitudesUser", []);

app.controller("solicitudesUserController", function($scope, $http) {
   $scope.tabs = [  
      { link : '#pendiente', label : 'Pendientes' },
      { link : '#historial', label : 'Historial'},
      
    ]; 
    var objetoPendientes;var objetoHistorial;
    
    $http.get("webservice/get_user").success(function(response){
        objetoPendientes={
        "usuario": response.user.username,
        "lista":1
        };
        objetoHistorial={
            "usuario": response.user.username,
            "lista":2
        };
        $http.post("webservice/ReservaEquipo/findReservasUsuario",objetoPendientes).success(function(response){
        $http.post("webservice/ReservaEquipo/findReservasUsuario",objetoHistorial).success(function(response){$scope.reservasHistorial=response;});
        $scope.reservasPendientes=response;});
    });
    
    
    
    
    
});