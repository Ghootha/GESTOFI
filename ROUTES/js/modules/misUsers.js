
var app = angular.module("myAppUsers", []);

app.controller("userController", function($scope, $http) {

        
    $http.get("webservice/User")
        .success(function(response) {$scope.users = response; });

    $scope.error = false;
    $scope.incomplete = false;
    $scope.incomplete2 = false;
    $scope.mensajeErrorRegistro=false;
    $scope.mensajeExitoRegistro=false;
    $scope.mensajeExitoEdicion=false;
    $scope.mensajeFalloEdicion=false;
    $scope.mensajeExitoCambiaPass=false;
    $scope.mensajeFalloCambiaPass=false;

    $scope.editUser = function(id) { 
            for(var i = 0; i<$scope.users.length; i++) {           
                if($scope.users[i].id === id) {
                    $scope.edit = false;
                    $scope.username = $scope.users[i].username;
                    $scope.fullname = $scope.users[i].fullname;
                    $scope.email = $scope.users[i].email;
                    $scope.role = $scope.users[i].role;
                    $scope.actualizarUser(id);
                }
            } 
    };

    $scope.deleteUser = function(id) {
        $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () {

            $http.get("webservice/User/destroy/"+id).success(function(){

                for(var i = 0; i<$scope.users.length; i++) {           
                    if($scope.users[i].id === id) {
                        $scope.$apply($scope.users.splice(i, 1));
                    }
                }
            });  

        });
    };
 

    $scope.actualizarUser = function(id) {
       $('#Modal').modal({ backdrop: false})
        .one('click', '#confirm', function () { 
             var objetoJSON;
                for(var i = 0; i<$scope.users.length; i++) {           
                    if($scope.users[i].id === id) {
                           objetoJSON = {
                                "username": $scope.username,            
                                "fullname": $scope.fullname,
                                "email": $scope.email,
                                "role": $scope.role
                            };
                        
                            $http.put("webservice/User/update/"+id, objetoJSON).success(function(){
                                        $scope.mensajeExitoRegistro=true;
                            }).error(function(){
                                        $scope.mensajeFalloEdicion=true;
                            });
                    }
                }
        }); 
        
    };

    $scope.registrar = function(){
        $scope.username = '';
        $scope.fullname = '';
        $scope.email = '';
        $scope.role = '';
        $scope.passw1='';
        $scope.passw2='';
        
         $('#Modal2').modal({ backdrop: false})
        .one('click', '#confirmUser', function () {

            var objetoJSON;    
                                    
            objetoJSON = {
                "username"  : $scope.username,   
                "fullname"  : $scope.fullname,
                "email"     : $scope.email,
                "role"      : $scope.role,   
                "password"  : $scope.passw1
            };    

            $http.post("webservice/auth/local/register", objetoJSON).success(function(response, forceReload){                    
                
                if(response.status == 200){ //comprobacion de estatus, devuelve 200 si se realizo el registro/logueo
                     $scope.$apply($scope.mensajeExitoRegistro=true);
                }

            }).error(function(response, status, header, config){  
                if(response.status == 300){ //estatus de error para usuario en uso
                    $scope.$apply($scope.mensajeErrorRegistro=true);
                }                 
                    
            });
        });
            
            
    };

    $scope.cambiarContrasena = function(id){
        $scope.passw1='';
         $('#Modal4').modal({ backdrop: false})
        .one('click', '#confirmContrasena', function () { 

                $http.post("webservice/User/"+id).success(function(response){
                    
                    var Passport= response.passports[0].id;
                    var objetoJSON;    
                                        
                    objetoJSON = {                   
                        "password"  : $scope.passw1
                    };

                    $http.post("webservice/Passport/Update/"+Passport, objetoJSON).success(function(response){                   
                
                        $scope.$apply($scope.mensajeExitoCambiaPass=true);

                    }).error(function(response, status, header, config){  
                       
                        $scope.$apply($scope.mensajeFalloCambiaPass=true);

                    });

                });    

                
        });
            
            
    };

    $scope.$watch('passw1',function() {$scope.test();});
    $scope.$watch('passw2',function() {$scope.test();});
    $scope.$watch('username', function() {$scope.test();});    
    $scope.$watch('fullname', function() {$scope.test();});
    $scope.$watch('email', function() {$scope.test();});
    $scope.$watch('role', function() {$scope.test();});

    $scope.test = function() {
        if ( !($scope.passw1.length >=8) || ($scope.passw1 !== $scope.passw2)) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        $scope.incomplete2 = false;
        if (!$scope.username.length || !$scope.fullname.length ||
            !$scope.email.length || !$scope.role.length) {
            $scope.incomplete2 = true;
        }
        if (!$scope.username.length || !$scope.fullname.length ||
            !$scope.email.length || !$scope.role.length ||
            !$scope.passw1.length || !$scope.passw2.length) {
            $scope.incomplete = true;
        }
    };

});