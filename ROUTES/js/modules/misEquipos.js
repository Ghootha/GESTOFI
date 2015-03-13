var app = angular.module("myAppEquipos", []);

app.controller("equiposController", function($scope, $http) {
var objetoReserva;
var user;
$http.get("webservice/get_user").success(function(response){
      $scope.user= response.user; 
      user=$scope.user.username;
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

      $http.post("webservice/ReservaEquipo/create",objetoReservaEquipo).success(function(response){
        $scope.horaInicio="";
        $scope.horaEntrega="";
        $scope.fecha="";
        $scope.equipos=[];
        $scope.tiposEquipos=[];});
   });

};


$scope.consultarEquipo= function(){
  
  if(typeof $scope.horaInicio !== "undefined" &&typeof $scope.horaEntrega !=="undefined" && typeof $scope.fecha !=="undefined"){
    var horaI=new Date("January 01, 2015 "+$scope.horaInicio+":00");
    var horaF=new Date("January 01, 2015 "+$scope.horaEntrega+":00");
    var fech=new Date($scope.fecha);
    
      if(horaI < horaF){
        objetoReserva={
          "usuario" : user,//$scope.user.username,
          "horaInicio" : horaI.toTimeString(),
          "horaEntrega" : horaF.toTimeString(),
          "fecha" : fech.toDateString()
        }

         $http.post("webservice/Reserva/consultaEquipo",objetoReserva).success(function(response) {$scope.equipos = response;});
         $http.get("webservice/Reserva/findTiposEquipos").success(function(response){$scope.tiposEquipos=response;});
       }

       else 
        alert("Horas incorrectas");
  }
  else
    alert("Campos vacios");
  

};



$scope.$watch('nombre',function() {$scope.test();});
$scope.$watch('codigo', function() {$scope.test();});

$scope.test = function() {

};

});
