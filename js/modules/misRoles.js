var app = angular.module("myAppRoles", []);

app.controller("rolController", function($scope, $http) {
    
    $http.get("webservice/Role")
            .success(function(response) {$scope.roles = response; });

    $scope.nombre='';
    $scope.seguridad = '';

    
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.mensajeError=false;
    $scope.mensajeExito=false;

    $scope.editRole = function(id) {
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.nombre='';
            $scope.seguridad = '';
        } else {
            for(var i = 0; i<$scope.roles.length; i++) {
                if($scope.roles[i].id === id) {
                    $scope.nombre = $scope.roles[i].nombre;
                    $scope.seguridad = $scope.roles[i].seguridad;
                    $scope.actualizarRole(id);
                }

            }
            
        }
    };

    $scope.deleteRole = function(id) { 
         $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () { 
                
            $http.get("webservice/Role/destroy/"+id).success(function(){
                for(var i = 0; i<$scope.roles.length; i++) {           
                    if($scope.roles[i].id === id) {
                        $scope.$apply($scope.roles.splice(i, 1));                       
                    }
                } 
            });  
        });    
    };

   

    $scope.actualizarRole = function(id) {
        $('#Modal2').modal({ backdrop: false})
        .one('click', '#confirm', function () { 
             var objetoJSON;
                for(var i = 0; i<$scope.roles.length; i++) {           
                    if($scope.roles[i].id === id) {
                           objetoJSON = {
                            "nombre": $scope.nombre,            
                            "seguridad": $scope.seguridad
                        };
                        
                        $http.put("webservice/Role/update/"+id, objetoJSON).success(
                                function(){
                                    $http.get("webservice/Role")
                                        .success(function(response) {$scope.roles = response;});
                                 });
                    }
                }
        }); 
    };

    $scope.crearRole = function(){
        $scope.nombre = '';
        $scope.seguridad = '';
        
        
         $('#Modal').modal({ backdrop: false})
        .one('click', '#confirmRole', function () {

            var objetoJSON;    
                                    
            objetoJSON = {
                "nombre"  : $scope.nombre,   
                "seguridad"  : $scope.seguridad
            };    

            $http.post("webservice/Role/create", objetoJSON).success(function(response){
                $http.get("webservice/Role")
            .success(function(response) {$scope.roles = response; });
                     $scope.$apply($scope.mensajeExito=true);
            }).error(function(response, status, header, config){
                    $scope.$apply($scope.mensajeError=true);               
            });
        });
            
            
    };

   

    $scope.$watch('nombre', function() {$scope.test();});
    $scope.$watch('seguridad',function() {$scope.test();});    

    $scope.test = function() {
        
        $scope.incomplete = false;
        if (!$scope.nombre.length ||
            !$scope.seguridad.length) {
            $scope.incomplete = true;
        }
    };
});
