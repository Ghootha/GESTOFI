var app = angular.module("myAppEquipos", []);

app.controller("equiposController", function($scope, $http) {
var objetoReserva;

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;


$scope.apartarEquipo = function(idEquipo) {

    var IDReserva, objetoReservaEquipo; 
    $http.post("webservice/Reserva/create",objetoReserva).success(function(response){ 
      objetoReservaEquipo= {
        "idReserva" : response.id,
        "idReservable" : idEquipo,
        
      };

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
    var h1=new Date("January 01, 2015 "+$scope.horaInicio+":00");
    var h2=new Date("January 01, 2015 "+$scope.horaEntrega+":00");
    var fech=$scope.fecha.split("-");
    fech=new Date(fech[2],fech[1]-1,fech[0]);
    var horaI=new Date(fech);
    var horaF=new Date(fech);
    horaI.setHours(h1.getHours());
    horaI.setMinutes(h1.getMinutes());
    horaF.setHours(h2.getHours());
    horaF.setMinutes(h2.getMinutes());
    
    if(horaI < horaF){
      $http.get("webservice/get_user").success(function(response){$scope.user= response.user;
        
        objetoReserva={
          "idUsuario" : $scope.user.username,
          "horaInicio" : horaI.toISOString(),//.toTimeString(),
          "horaEntrega" : horaF.toISOString(),//.toTimeString(),
          "estado": "Pendiente",
          "fecha" : fech.toISOString(),//.toDateString()
        };
         $http.post("webservice/Reserva/consultaEquipo",objetoReserva).success(function(response) {$scope.equipos = response;});
         $http.get("webservice/Reserva/findTiposEquipos").success(function(response){$scope.tiposEquipos=response;});
       });
       
    
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
