var app = angular.module("myAppEquipos", []);

app.controller("equiposController", function($scope, $http) {
var objetoReserva;

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

    var IDReserva, objetoReservaEquipo; 
    $http.post("webservice/Reserva/create",objetoReserva).success(function(response){ 
      objetoReservaEquipo= {
        "idReserva" : response.id,
        "idReservable" : idEquipo
      }

      $http.post("webservice/ReservaEquipo/create",objetoReservaEquipo).success(function(response){alert("Solicitud creada");});
   });
   
    
    
    $scope.horaInicio="";
    $scope.horaEntrega="";
    $scope.fecha="";
    $scope.equipos=[];
    $scope.tiposEquipos=[];

};

$scope.consultarEquipo= function(){
    var horaI=new Date("January 01, 2015 "+document.getElementById("horaInicio").value+":00");
    var horaF=new Date("January 01, 2015 "+document.getElementById("horaEntrega").value+":00");
    var fech=new Date(document.getElementById("fecha").value);
    

        /*objetoReserva = {
          "usuario" : $scope.user.username,
          "horaInicio" : horaI,//.toTimeString(),
          "horaEntrega" : horaF,//.toTimeString(),
          "fecha" : fech//.toDateString()
        }*/

        objetoReserva={
          "usuario" : $scope.user.username,
          "horaInicio" : horaI.toTimeString(),
          "horaEntrega" : horaF.toTimeString(),
          "fecha" : fech.toDateString()
        }

         $http.post("webservice/Reserva/consultaEquipo",objetoReserva).success(function(response) {$scope.equipos = response;});
         $http.get("webservice/Reserva/findTiposEquipos").success(function(response){$scope.tiposEquipos=response;});

};



$scope.$watch('nombre',function() {$scope.test();});
$scope.$watch('codigo', function() {$scope.test();});

$scope.test = function() {

};

});
