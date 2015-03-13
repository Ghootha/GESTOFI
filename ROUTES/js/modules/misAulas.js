var app = angular.module("myAppAulas", []);

app.controller("aulaController", function($scope, $http) {

$scope.nombre= '';



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


$scope.apartarAula = function(idAula) {
  var IDReserva, objetoReservaEquipo; 
    $http.post("webservice/Reserva/create",objetoReserva).success(function(response){ 
      objetoReservaEquipo= {
        "idReserva" : response.id,
        "idReservable" : idAula
      }

      $http.post("webservice/ReservaEquipo/create",objetoReservaEquipo).success(function(response){
         $scope.horaInicio="";
         $scope.horaEntrega="";
         $scope.fecha="";
         $scope.aulas=[];

      });
   });

};


$scope.consultarAula= function(){
   
  if(typeof $scope.horaInicio !== "undefined" &&typeof $scope.horaEntrega !=="undefined" && typeof $scope.fecha !=="undefined"){
    var horaI=new Date("January 01, 2015 "+document.getElementById("horaInicio").value+":00");
    var horaF=new Date("January 01, 2015 "+document.getElementById("horaEntrega").value+":00");
    var fech=new Date(document.getElementById("fecha").value);

      if(horaI < horaF){
        objetoReserva={
          "usuario" : $scope.user.username,
          "horaInicio" : horaI.toTimeString(),
          "horaEntrega" : horaF.toTimeString(),
          "fecha" : fech.toDateString()
        }

         $http.post("webservice/Reserva/consultaAula",objetoReserva).success(function(response) {$scope.aulas = response;});
         }
         else 
        alert("Horas incorrectas");
  }
  else
    alert("Campos vacios");
  

};



$scope.$watch('nombre',function() {$scope.test();});

$scope.test = function() {
  
};

});