
var app = angular.module("validador", []);

app.controller("validadorController", function($scope, $http, $window, $location) {

    $scope.hideAlmacenar = false;
    $scope.hideSolicitudes = false;
    $scope.hideSolicitudEquipo = false;
    $scope.hideSolicitudAula = false;
    $scope.hideSolicitudVacaciones = false;
    $scope.hideAgenda = false;
    $scope.hideCorrespondencia = false;
    $scope.hideAlmacenar = false;
    $scope.hideConfiguracion = false;
 
    
    $http.get("webservice/get_user").success(function(response){
            if(response.user == null){
               window.location.replace("index.html"); 
            }else{ 
                $scope.user= response.user;
                $scope.userLogged=  $scope.user.fullname;                
            }
    }).error(function(response, status, header, config){  
            console.log("error en obtencion de usuario conectado");  
    });


$scope.$watch('user',function() {$scope.test();});
   

    $scope.test = function() {  //metodo encargado de limitar el acceso al menu dependiendo del role conectado
        
        if ( $scope.user != null ) {
            var roleLogged = $scope.user.role;
            
            $http.get("webservice/Role").success(function(response){
                    var roles = response;

                    for(var i = 0; i<roles.length; i++) {           
                        if(roles[i].nombre === roleLogged) {
                            
                            var seguridad=roles[i].seguridad;

                            if( seguridad == 'Media'){  
                            $scope.hideConfiguracion = true;
                            }

                            if( seguridad  == 'Baja'){ 
                            $scope.hideConfiguracion = true;
                            $scope.hideSolicitudEquipo = true;
                            $scope.hideSolicitudAula = true;
                            }

                            if( seguridad  == 'Ninguna'){ 
                            $scope.hideConfiguracion = true;
                            $scope.hideAlmacenar = true;
                            $scope.hideSolicitudes = true;
                            $scope.hideAgenda = true;
                            $scope.hideCorrespondencia = true; 
                            }
                        }
                    }  


            });
        }

    };


   



});

