var app = angular.module("AppEquipos", []);

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

//variables de validacion o globales
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;
$scope.btnConsultar=true;

$scope.apartarEquipo = function(idEquipo) {// metodo encargado de crear la reserva del reservable en el base

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

$scope.modalConfirmacion = function(id){//modal de confirmacion de la solicitud
    $http.get("webservice/Reservable/"+id).success(function(response){$scope.miReservable=response;});
    $('#Modal3').modal({backdrop:false}).one('click', '#confirm', function(){
      $scope.apartarEquipo(id);
  });
};


$scope.consultarEquipo= function(){// metodo encargado de realizar la consulta de los equipos disponibles en la fecha y horas indicadas 
  $scope.btnConsultar=true;
  $scope.btnFecha=false;
    var h1=new Date("January 01, 2015 "+$scope.horaInicio+":00");//variable con fecha por defecto y con la HORA DE INICIO
    var h2=new Date("January 01, 2015 "+$scope.horaEntrega+":00");//variable con fecha por defecto y con la HORA DE FINAL
    var fech=$scope.fecha.split("-");//modificacion de la fecha ingresada en el html
    fech=new Date(fech[2],fech[1]-1,fech[0]);//variable con la fecha ingresa por el usuario
    var horaI=new Date(fech);
    var horaF=new Date(fech);
    fech.setHours(h1.getHours());
    fech.setMinutes(h1.getMinutes());
    horaI.setHours(h1.getHours());
    horaI.setMinutes(h1.getMinutes());
    horaF.setHours(h2.getHours());
    horaF.setMinutes(h2.getMinutes());// se modifican las variables de las horas para que sean con la fecha y horas indicadas por el usuario
    if(fech > new Date()){//se valida que la fecha sea mayor a la fecha actual(tomando en cuenta la hora)
      fech.setHours(fech.getHours()-6);
      $http.get("webservice/get_user").success(function(response){$scope.user= response.user;
        
        objetoReserva={
          "idUsuario" : $scope.user.username,
          "horaInicio" : horaI.toISOString(),
          "horaEntrega" : horaF.toISOString(),
          "estado": "Pendiente",
          "fecha" : fech.toISOString(),
        };
         $http.post("webservice/Reserva/consultaEquipo",objetoReserva).success(function(response) {$scope.equipos = response;});
         $http.get("webservice/Reserva/findTiposEquipos").success(function(response){$scope.tiposEquipos=response;});
       });}
      else {
        $scope.fecha="";
        bootbox.alert("La fecha es anterior a la fecha de hoy");
      }

};
//validaciones de los espacios de fecha y las horas, no vacios no incorrectos
$scope.$watch('fecha',function() {$scope.validacion();});
$scope.$watch('horaInicio',function() {$scope.validacion();});
$scope.$watch('horaEntrega',function() {$scope.validacion();});


$scope.validacion =function(){
  $scope.equipos=[];$scope.btnConsultar=true;
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
