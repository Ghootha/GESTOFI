var app = angular.module("myAppEquipos", []);

app.controller("equiposController", function($scope, $http) {
var objetoReserva;

$scope.$on('$viewContentLoaded', function() {
    $http.get("webservice/get_user").success(function(response){
            if(response.user == null){
              window.location.replace("index.html"); 
            }else{     
              $scope.user= response.user;  
              var roleLogged = response.user.role;
            
              $http.get("webservice/Role").success(function(response){
                      var roles = response;

                      for(var i = 0; i<roles.length; i++) {           
                          if(roles[i].nombre === roleLogged) {
                              
                              var seguridad=roles[i].seguridad;

                              if( seguridad == 'Ninguna' || seguridad == 'Baja' ){  
                                 window.location.replace("paginaPrincipal.html"); 
                              }
                              
                          }
                      }
              });               
          }
  }).error(function(response, status, header, config){  
          console.log("error en obtencion de usuario conectado");  
  });
 
});


$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;
$scope.btnConsultar=true;

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

$scope.modalConfirmacion = function(id){
    $http.get("webservice/Reservable/"+id).success(function(response){$scope.miReservable=response;});
    $('#Modal3').modal({backdrop:false}).one('click', '#confirm', function(){
      $scope.apartarEquipo(id);
  });
};


$scope.consultarEquipo= function(){
  $scope.btnConsultar=true;
  $scope.btnFecha=false;
    var h1=new Date("January 01, 2015 "+$scope.horaInicio+":00");
    var h2=new Date("January 01, 2015 "+$scope.horaEntrega+":00");
    var fech=$scope.fecha.split("-");
    fech=new Date(fech[2],fech[1]-1,fech[0]);
    var horaI=new Date(fech);
    var horaF=new Date(fech);
    fech.setHours(h1.getHours());
    fech.setMinutes(h1.getMinutes());
    horaI.setHours(h1.getHours());
    horaI.setMinutes(h1.getMinutes());
    horaF.setHours(h2.getHours());
    horaF.setMinutes(h2.getMinutes());
    
    if(fech >= new Date()){
   
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
       });}
      else {
        $scope.fecha="";
        alert("La fecha es anterior a la fecha de hoy");
      }

};

$scope.$watch('fecha',function() {$scope.validacion();});
$scope.$watch('horaInicio',function() {$scope.validacion();});
$scope.$watch('horaEntrega',function() {$scope.validacion();});


$scope.validacion =function(){
  $scope.equipos=[];
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
      $scope.equipos=[];
      $scope.btnConsultar=false;
    }
  }
};


});
