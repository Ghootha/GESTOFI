var app = angular.module("myAppReserva", []);

app.controller("reservaController", function($scope, $http) {



$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.opcs=[{id:1,nombre:'Pendiente'},{id:2,nombre:'En uso'},{id:3,nombre:'Recibido'}];


var objetoFecha;

$scope.buscarPorFecha = function (){
	var fech=$scope.fecha.split("-");
    fech=new Date(fech[2],fech[1]-1,fech[0]);
	objetoFecha={
		"fecha" : fech.toISOString()
	};
	$http.post("webservice/ReservaEquipo/findReservas", objetoFecha).success(function(response){$scope.reservas=response;});

};


$scope.mostrarEstado= function(estado){
	if(estado==="Pendiente"){
		$scope.estadoSelect= $scope.opcs[0].id;
	}
	else if(estado==="En uso"){
		$scope.estadoSelect= $scope.opcs[1].id;
	}

	else if(estado==="Recibido"){
		$scope.estadoSelect= $scope.opcs[2].id;
	}

};


$scope.setEstado = function(id, idReserva){
	
	var objeto={
		"estado": id.nombre
	};
	$http.put("webservice/Reserva/update/"+idReserva, objeto).success(function(response){
		//$scope.mostrarEstado(response.estado);
	});
	//$http.post("webservice/ReservaEquipo/findReservas", objetoFecha).success(function(response){$scope.reservas=response;});
	
};

});