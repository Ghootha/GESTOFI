
var app = angular.module("validador", []);

app.controller("validadorController", function($scope, $http, $window, $location) {

    //------------------------------------------------------VARIABLES PARA MOSTRAR/OCULATAR MENUS/SUBMENUS----------------------------------------//
    $scope.hideAlmacenar = false;
    $scope.hideSolicitudes = false;
    $scope.hideSolicitudEquipo = false;
    $scope.hideSolicitudAula = false;
    $scope.hideSolicitudVacaciones = false;
    $scope.hideAgenda = false;
    $scope.hideCorrespondencia = false;
    $scope.hideAlmacenar = false;
    $scope.hideConfiguracion = false;
    //-----------------------------------------------------------------------------------------------------------------------------------------//
    
    $http.get("webservice/get_user").success(function(response){
            if(response.user == null){ //valida que exista un usuario conectado, si no es asi lo devuelve a la pagian de login
               window.location.replace("index.html"); 
            }else{  //si existe usuario validado, lo almacena en memoria y lo muestar en la barra de usuario
                $scope.user= response.user;
                $scope.userLogged=  $scope.user.fullname;                
            }
    }).error(function(response, status, header, config){  
            console.log("error en obtencion de usuario conectado");  
    });


$scope.$watch('user',function() {$scope.test();}); //cuando el usuario se conecta activa el metodo est()
   

    $scope.test = function() {  //metodo encargado de limitar el acceso al menu dependiendo del role conectado
        
        if ( $scope.user != null ) {
            var roleLogged = $scope.user.role;
            
            $http.get("webservice/Role").success(function(response){ //obtiene todos lso roles
                    var roles = response;

                    for(var i = 0; i<roles.length; i++) {               
                        if(roles[i].nombre === roleLogged) { //compara el role asignado al usuario con los que se encuetran en la base, para acceder a su seguridad
                            
                            var seguridad=roles[i].seguridad; //obtiene seguridad del role ligado al usuario, y oculta lso menus/submenus necesarios

                            if( seguridad == 'Media'){  
                            $scope.hideConfiguracion = true;
                            $scope.hideControlReserva=true;
                            $scope.hideRespuestaSolicitudes=true;
                            }

                            if( seguridad  == 'Baja'){ 
                            $scope.hideConfiguracion = true;
                            $scope.hideSolicitudEquipo = true;
                            $scope.hideSolicitudAula = true;
                            $scope.hideControlReserva=true;
                            $scope.hideRespuestaSolicitudes=true;
                            }

                            if( seguridad  == 'Ninguna'){ 
                            $scope.hideConfiguracion = true;
                            $scope.hideAlmacenar = true;
                            $scope.hideSolicitudes = true;
                            $scope.hideAgenda = true;
                            $scope.hideCorrespondencia = true; 
                            $scope.hideControlReserva=true;
                            $scope.hideRespuestaSolicitudes=true;
                            }
                        }
                    }  


            });
        }

    };


   



});

