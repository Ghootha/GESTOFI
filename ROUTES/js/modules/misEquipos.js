var app = angular.module("myAppEquipos", []);

app.controller("equiposController", function($scope, $http) {
var objetoReserva;

//$http.get("webservice/findReservablebyEquipo").success(function(response) {$scope.equipos = response;});

$http.get("webservice/get_user").success(function(response){
      $scope.user= response.user;
      $scope.userLogged=  $scope.user.fullname;            
      }).error(function(response, status, header, config){  
        if(response.status == 300){ //estatus de error para usuario en uso
          $scope.mensajeErrorRegistro=true;
        }   
      });

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;


$scope.apartarEquipo = function(idEquipo) {


    //$http.post("webservice/Reserva/create",objetoReserva).success(function(response){alert("entro a la base :D!! ");});
    //put
    $scope.horaInicio="";
    $scope.horaEntrega="";
    $scope.fecha="";

};

$scope.consultarEquipo= function(){
    var horaI=new Date("January 01, 2015 "+document.getElementById("horaInicio").value+":00");
    var horaF=new Date("January 01, 2015 "+document.getElementById("horaEntrega").value+":00");
    var fech=new Date(document.getElementById("fecha").value);

        objetoReserva = {
          "usuario" : $scope.user.username,
          "horaInicio" : horaI.toTimeString(),
          "horaEntrega" : horaF.toTimeString(),
          "fecha" : fech.toDateString()
        }

         $http.get("webservice/Reservable/consultaEquipo").success(function(response) {$scope.equipos = response;});
         $http.get("webservice/Reservable/findTiposEquipos").success(function(response){$scope.tiposEquipos=response;});

};



$scope.$watch('nombre',function() {$scope.test();});
$scope.$watch('codigo', function() {$scope.test();});

$scope.test = function() {

};

});
