
var app = angular.module("myAppUsers", []);

app.controller("userController", function($scope) {

    $scope.ced='';
    $scope.nombre = '';
    $scope.pApellido = '';
    $scope.sApellido = '';
    $scope.passw1 = '';
    $scope.passw2 = '';
    $scope.role = '';
    $scope.users = [
        {id:1, ced:'2-0596-0618', nombre:'Michael',   pApellido:"González", sApellido:"Murillo", role:"Profesor"  },
        {id:2, ced:'1-1553-0965', nombre:'Andres',   pApellido:"Rodríguez", sApellido:"Morales", role:"Director" },
        {id:3, ced:'4-0217-0111', nombre:'Natasha',   pApellido:"Arteaga", sApellido:"Guerrero", role:"Asistente" },
        {id:4, ced:'4-0217-0123', nombre:'José',  pApellido:"Alvarado", sApellido:"Villalobos", role:"Secretario" }
    ];
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.mensajeErrorRegistro=false;
    $scope.mensajeExitoRegistro=false;

    $scope.editUser = function(id) {
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.ced='';
            $scope.nombre = '';
            $scope.pApellido = '';
            $scope.sApellido = '';
            $scope.role='';
        } else {

            for(var i = 0; i<$scope.users.length; i++) {           
                if($scope.users[i].id === id) {
                    $scope.edit = false;
                    $scope.ced = $scope.users[i].ced;
                    $scope.nombre = $scope.users[i].nombre;
                    $scope.pApellido = $scope.users[i].pApellido;
                    $scope.sApellido = $scope.users[i].sApellido;
                    $scope.role = $scope.users[i].role;
                    $scope.actualizarUser(id);
                }
            } 
            
        }
    };

    $scope.deleteUser = function(id) {
        $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () {
            for(var i = 0; i<$scope.users.length; i++) {           
                if($scope.users[i].id === id) {
                    $scope.$apply($scope.users.splice(i, 1));
                }
            }    
        });
    };

    $scope.actualizarUser = function(id) {
       $('#Modal').modal({ backdrop: false})
        .one('click', '#confirm', function () { 
             var objetoJSON;
                for(var i = 0; i<$scope.users.length; i++) {           
                    if($scope.users[i].id === id) {
                           objetoJSON = {
                            "cedula": $scope.ced,            
                            "nombre": $scope.nombre,
                            "pApellido": $scope.pApellido,
                            "sApellido": $scope.sApellido,
                            "role": $scope.role,

                        };
                        alert("manda put al servidor el user: "+$scope.nombre+$scope.pApellido+$scope.sApellido+" con ced: "+$scope.ced+" y Role "+$scope.role );
                        // $http.put("webservice/Documento/update/"+id, objetoJSON).success(
                        //         function(){
                        //             $http.get("webservice/Documento")
                        //                 .success(function(response) {$scope.users = response;});
                        //          });
                    }
                }
        }); 
        
    };

    $scope.registrar = function(){
        
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

    $scope.$watch('passw1',function() {$scope.test();});
    $scope.$watch('passw2',function() {$scope.test();});
    $scope.$watch('ced', function() {$scope.test();});    
    $scope.$watch('nombre', function() {$scope.test();});
    $scope.$watch('pApellido', function() {$scope.test();});
    $scope.$watch('sApellido', function() {$scope.test();});
    $scope.$watch('role', function() {$scope.test();});

    $scope.test = function() {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.ced.length || !$scope.nombre.length ||
            !$scope.pApellido.length || !$scope.sApellido.length || !$scope.role.length ||
            !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }
    };

});