
var app = angular.module("myAppAutentificacion", []);

app.controller("autentificacionController", function($scope, $http, $window, $location) {

$scope.mensajeError=false;
$scope.mensajeErrorRegistro=false;

    $scope.loguear = function(){
        debugger;
            var objetoJSON;    
            
            objetoJSON = {
                "identifier": $scope.identifier,          
                "password": $scope.password
            };          
            
            $http.post("webservice/auth/local", objetoJSON).success(function(response, forceReload){                    
                
                if(response.status == 200){ //exito en logueo
                    $scope = $scope || angular.element(document).scope();
                    if(forceReload || $scope.$$phase) {
                        window.location = "paginaPrincipal.html";
                    }
                }

            }).error(function(response, status, header, config){  
                if(response.status == 300){ //ususario o contraseña invalidos
                    $scope.mensajeError=true;
                }                 
                    
            });
    };


    $scope.registrar = function(){

            var objetoJSON;    
            debugger;
            objetoJSON = {
                "username"  : $scope.username,                
                "fullname"  : $scope.fullname,    
                "email"     : $scope.email,     
                "role"      : $scope.role,    
                "password"  : $scope.password
            };          
            
          

            $http.post("webservice/auth/local/register", objetoJSON).success(function(response, forceReload){                    
                
                if(response.status == 200){ //comprobacion de estatus, devuelve 200 si se realizo el registro/logueo
                    $scope = $scope || angular.element(document).scope();
                    if(forceReload || $scope.$$phase) {                         
                         window.location = "paginaPrincipal.html";
                         //getUserLogged();
                       
                    }
                }

            }).error(function(response, status, header, config){  
                if(response.status == 300){ //estatus de error para usuario en uso
                    $scope.mensajeErrorRegistro=true;
                }                 
                    
            });
    };

    $scope.getUserLogged = function(){                 

            $http.post("webservice/auth/local/get_user").success(function(response, forceReload){                    
                
              alert("USUARIO CONECTADO: " + response.user);

            }).error(function(response, status, header, config){  
                if(response.status == 300){ //estatus de error para usuario en uso
                    $scope.mensajeErrorRegistro=true;
                }                 
                    
            });
    };





});

