var app = angular.module("myAppSolicitudesUser", []);

app.controller("solicitudesUserController", function($scope, $http) {
   $scope.tabs = [  
      { link : '#pendiente', label : 'Pendientes' },
      { link : '#historial', label : 'Historial'},
      
    ]; 
    var objetoPendientes;var objetoHistorial;
    
    $scope.$on('$viewContentLoaded', function () {
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

                  ///////////////////////////////

                /////NO SE DONDE DEBO UBICAR ESTO PARA QUE SIEMPRE SIRVA
                  objetoPendientes={
                    "usuario": $scope.user.username,
                    "lista":1
                  };
                  objetoHistorial={
                    "usuario": $scope.user.username,
                    "lista":2
                  }; 
                  $http.post("webservice/ReservaEquipo/findReservasUsuario",objetoPendientes).success(function(response){$scope.reservasPendientes=response;});
                  $http.post("webservice/ReservaEquipo/findReservasUsuario",objetoHistorial).success(function(response){$scope.reservasHistorial=response;});
                  ///////////////////// 
                                
              }
      }).error(function(response, status, header, config){  
              console.log("error en obtencion de usuario conectado");  
      });

      
    });
      

    $scope.modalConfirmacion = function(objeto){
        $scope.nombre=objeto.nombre;
        $scope.horaInicio=objeto.horaInicio;
        $scope.horaEntrega=objeto.horaEntrega;
        $scope.fecha=objeto.fecha;
        $('#Modal3').modal({backdrop:false}).one('click', '#confirm', function(){
          $scope.borrarSolicitud(objeto.idReserva, objeto.ID);
        });
    };
    
    $scope.borrarSolicitud=function(idReserva,pos){
        
        $http.get("webservice/ReservaEquipo/?idReserva="+idReserva).success(function(response){$scope.indice=response[0].id;
            $http.get("webservice/ReservaEquipo/destroy/"+$scope.indice).success(function(response){
                $http.get("webservice/Reserva/destroy/"+idReserva).success(function(response){
                    for(var i=0; i<$scope.reservasPendientes.length;i++){
                        if($scope.reservasPendientes[i].ID===pos){
                            $scope.$apply($scope.reservasPendientes.splice(i, 1));
                        }
                    }
                    //$http.post("webservice/ReservaEquipo/findReservasUsuario",objetoPendientes).success(function(response){$scope.reservasPendientes=response;});
                });
            });
        });

        
    };
    
    
    
});