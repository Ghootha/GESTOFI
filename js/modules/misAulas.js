var app = angular.module("myAppAulas", []);

app.controller("aulaController", function($scope, $http) {
var objetoReserva;
$scope.nombre= '';


$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 


$scope.apartarAula = function(idAula) {
  var IDReserva, objetoReservaEquipo; 
  
    $http.post("webservice/Reserva/create",objetoReserva).success(function(response){ 
      objetoReservaEquipo= {
        "idReserva" : response.id,
        "idReservable" : idAula,
        "estado": "Pendiente"
      };

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
    var h1=new Date("January 01, 2015 "+$scope.horaInicio+":00");
    var h2=new Date("January 01, 2015 "+$scope.horaEntrega+":00");
    var horaI=new Date($scope.fecha);
    var horaF=new Date($scope.fecha);
    horaI.setHours(h1.getHours());
    horaI.setMinutes(h1.getMinutes());
    horaF.setHours(h2.getHours());
    horaF.setMinutes(h2.getMinutes());
    var fech=new Date($scope.fecha);
    
    if(horaI < horaF){
     
      $http.get("webservice/get_user").success(function(response){
        $scope.user= response.user;
        objetoReserva={
          "idUsuario" : $scope.user.username,
          "horaInicio" : horaI.toTimeString(),
          "horaEntrega" : horaF.toTimeString(),
          "fecha" : fech.toDateString()
        };
         $http.post("webservice/Reserva/consultaAula",objetoReserva).success(function(response) {$scope.aulas = response;});
        });
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