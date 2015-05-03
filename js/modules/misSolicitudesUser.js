var app = angular.module("myAppSolicitudesUser", []);

app.controller("solicitudesUserController", function($scope, $http) {
   $scope.tabs = [  
      { link : '#pendiente', label : 'Pendientes' },
      { link : '#historial', label : 'Historial'},
      
    ]; 
    $http.get("webservice/get_user").success(function(response){$scope.user=response.user});
    
    var objetoPendientes={
    	"usuario": 'jose',
    	"lista":1
    };
    var objetoHistorial={
    	"usuario": 'jose',
    	"lista":2
    };
    
    $http.post("webservice/ReservaEquipo/findReservasUsuario",objetoPendientes).success(function(response){
    	$http.post("webservice/ReservaEquipo/findReservasUsuario",objetoHistorial).success(function(response){$scope.reservasHistorial=response;});
    	$scope.reservasPendientes=response;});
    
});