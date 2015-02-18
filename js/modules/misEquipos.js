var app = angular.module("myAppEquipos", []);

app.controller("equiposController", function($scope, $http) {
$scope.nombre= '';
$scope.codigo = '';

$http.get("webservice/findReservablebyEquipo")
        .success(function(response) {$scope.equipos = response;});


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
        var horaI=new Date("January 01, 2015 "+document.getElementById("horaInicio").value+":00");
        var horaF=new Date("January 01, 2015 "+document.getElementById("horaEntrega").value+":00");
        var fech=new Date(document.getElementById("fecha").value);

        var objetoReserva = {
          //"usuario" : $scope.userLogged,
          "horaInicio" : horaI.toTimeString(),
          "horaEntrega" : horaF.toTimeString(),
          "fecha" : fech.toDateString()
        }
    
    $http.put("webservice/Reserva/create",objetoReserva).success(function(response){alert("entro a la base :D!! ");});
    
    $scope.horaInicio="";
    $scope.horaEntrega="";
    $scope.fecha="";
  
};

$scope.consultarEquipo =function(){

    
};



$scope.$watch('nombre',function() {$scope.test();});
$scope.$watch('codigo', function() {$scope.test();});

$scope.test = function() {
  
};

});