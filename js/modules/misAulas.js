var app = angular.module("myAppAulas", []);

app.controller("aulaController", function($scope, $http) {
var objetoReserva;
$scope.nombre= '';


$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 
$scope.btnConsultar=true;

$scope.apartarAula = function(idAula) {
  var IDReserva, objetoReservaEquipo; 
  
    $http.post("webservice/Reserva/create",objetoReserva).success(function(response){ 
      objetoReservaEquipo= {
        "idReserva" : response.id,
        "idReservable" : idAula,
        
      };

      $http.post("webservice/ReservaEquipo/create",objetoReservaEquipo).success(function(response){
         $scope.horaInicio="";
         $scope.horaEntrega="";
         $scope.fecha="";
         $scope.aulas=[];

      });
   });

};

$scope.modalConfirmacion = function(id){
    $http.get("webservice/Reservable/"+id).success(function(response){$scope.miReservable=response;});
    $('#Modal3').modal({backdrop:false}).one('click', '#confirm', function(){
      $scope.apartarAula(id);
  });
};


$scope.consultarAula= function(){
    $scope.btnConsultar=true;
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
    
   
      $http.get("webservice/get_user").success(function(response){$scope.user= response.user;
        
        objetoReserva={
          "idUsuario" : $scope.user.username,
          "horaInicio" : horaI.toISOString(),//.toTimeString(),
          "horaEntrega" : horaF.toISOString(),//.toTimeString(),
          "estado": "Pendiente",
          "fecha" : fech.toISOString(),//.toDateString()
        };
         $http.post("webservice/Reserva/consultaAula",objetoReserva).success(function(response) {$scope.aulas = response;});
         
       });
};
$scope.$watch('fecha',function() {$scope.validacion();});
$scope.$watch('horaInicio',function() {$scope.validacion();});
$scope.$watch('horaEntrega',function() {$scope.validacion();});

$scope.validacion =function(){
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
      $scope.btnConsultar=false;
    }
  }
};

});