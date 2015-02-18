var app = angular.module("myAppAulas", []);

app.controller("aulaController", function($scope, $http) {

$scope.nombre= '';

$http.get("webservice/findReservablebyAula")
        .success(function(response) {$scope.aulas = response;});

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 


$scope.apartarAula = function(idAula) {
  
   var horaI=new Date("January 01, 2015 "+document.getElementById("horaInicio").value+":00");
        var horaF=new Date("January 01, 2015 "+document.getElementById("horaEntrega").value+":00");
        var fech=new Date(document.getElementById("fecha").value);

        var objetoReserva = {
          //"usuario" : $scope.userLogged,
          "horaInicio" : horaI.toTimeString(),
          "horaEntrega" : horaF.toTimeString(),
          "fecha" : fech.toDateString()
        }
    
    $http.put("webservice/Reserva/create",objetoReserva).success(function(response){alert("entro a la base :D!! ");});

    $scope.horaInicio="";
    $scope.horaEntrega="";
    $scope.fecha="";
};



$scope.$watch('nombre',function() {$scope.test();});

$scope.test = function() {
  
};

});