var app = angular.module("myAppEquipos", []);

app.controller("equiposController", function($scope, $http) {
$scope.nombre= '';
$scope.codigo = '';

$http.get("webservice/findReservablebyEquipo")
        .success(function(response) {$scope.equipos = response;});

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 


$scope.apartarEquipo = function(idEquipo) {
debugger;
        var horaI=new Date("January 01, 2015 "+document.getElementById("horaInicio").value+":00");
        var horaF=new Date("January 01, 2015 "+document.getElementById("horaEntrega").value+":00");
        var fech=new Date(document.getElementById("fecha").value);

        var objetoReserva = {
          "horaInicio" : horaI.toTimeString(),
          "horaEntrega" : horaF.toTimeString(),
          "fecha" : fech.toDateString()
        }
    //alert(fech.toDateString()+" "+horaI.toTimeString()+" "+horaF.toTimeString());
    $http.put("webservice/reserva/create",objetoReserva).success(function(response){alert("entro a la base :D!! ");});

    $scope.horaInicio="";
    $scope.horaEntrega="";
    $scope.fecha="";
  
};



$scope.$watch('nombre',function() {$scope.test();});
$scope.$watch('codigo', function() {$scope.test();});

$scope.test = function() {
  
};

});