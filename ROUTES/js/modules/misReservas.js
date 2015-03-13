var app = angular.module("myAppReserva", []);

app.controller("reservaController", function($scope, $http) {



$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.buscarPorFecha = function (){
	
	var fecha=new Date(document.getElementById("fecha").value);

	var objeto={

		"fecha" : fecha.toDateString()

	}

	$http.post("webservice/ReservaEquipo/findReservas", objeto).success(function(response){$scope.reservas=response;});

};



});