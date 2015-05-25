var app = angular.module("AppRoles", []);

app.controller("rolController", function($scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() { // funcion utilizada para cargar este segmento de codigo solo cuando la vista sea accedida
        $http.get("webservice/get_user").success(function(response){
            if(response.user == null){ //valida que exista un usuario conectado, si no es asi lo devuelve a la pagian de login
               window.location.replace("index.html"); 
            }else{                
                var roleLogged = response.user.role;
            
                $http.get("webservice/Role").success(function(response){ // obtiene el role del usuario conectado, luego busca cual es la seguridad de dicho role
                        $scope.roles = response;
                        var roles = response;

                        for(var i = 0; i<roles.length; i++) {           
                            if(roles[i].nombre === roleLogged) {
                                
                                var seguridad=roles[i].seguridad;

                                if( seguridad != 'Alta'){  //seguridad de las vistas que usen este controlador
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
    
    
    $scope.nombre='';
    $scope.seguridad = '';

    //-------------------------------VARIABLES DE MSJS O DE VALIDACIONES----------------------------------------------/
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.mensajeError=false;
    $scope.mensajeExito=false;

    //----------------------------------------------------------------------------------------------------------------/

    $scope.editRole = function(id) { //busca role por id, obtiene su informacion para mostrar en modal y luego llama al metodo $scope.actualizarRole(id); que se encarga de actualizar el role 
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

    $scope.deleteRole = function(id) { //elimina un role seleccionado de la lista 
         $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () {  //este modal es el de confirmacion, una vez confirmado se ejecuta este metodo
                
            $http.get("webservice/Role/destroy/"+id).success(function(){ //llamado REST para eliminar un ojeto de un modelo
                for(var i = 0; i<$scope.roles.length; i++) {           
                    if($scope.roles[i].id === id) {
                        $scope.$apply($scope.roles.splice(i, 1));         //elimina el role de la memoria ($scope.roles)              
                    }
                } 
            });  
        });    
    };

   

    $scope.actualizarRole = function(id) { //metodo que actualiza la nueva informacion del objeto
        $('#Modal2').modal({ backdrop: false})
        .one('click', '#confirm', function () { //despliega modal donde se muestra/cambia la info del role
             var objetoJSON;
                for(var i = 0; i<$scope.roles.length; i++) {           
                    if($scope.roles[i].id === id) {
                           objetoJSON = {
                            "nombre": $scope.nombre,            
                            "seguridad": $scope.seguridad
                        };
                        
                        $http.put("webservice/Role/update/"+id, objetoJSON).success( //llamado rest para actualizar un objeto del modelo, recibe el id, y un json con la nueva informacion
                                function(){
                                    $http.get("webservice/Role")
                                        .success(function(response) {$scope.roles = response;}); //vuelve a cargar el scope con la nueva informacion
                                 });
                    }
                }
        }); 
    };

    $scope.crearRole = function(){ //creacion de un nuevo role
        $scope.nombre = '';
        $scope.seguridad = '';
        
        
         $('#Modal').modal({ backdrop: false})
        .one('click', '#confirmRole', function () { //levanta modal de creacion del role

            var objetoJSON;
                          
            objetoJSON = {
                "nombre"  : $scope.nombre,   
                "seguridad"  : $scope.seguridad
            };    

            $http.post("webservice/Role/create", objetoJSON).success(function(response){
                $scope.roles.push(response); //se mete el nuevo objeto en el scope(se trabaja en memoria para no volver a hacer consulta al servidor)                
                $timeout(function(){
                    $scope.mensajeExito=true; //Msj
                }); 
            }).error(function(response, status, header, config){
                $timeout(function(){
                    $scope.mensajeError=true;
                });                  
            });
        });
            
            
    };

   
    //------------------------------------------------------VALIDACIONES EN MODAL----------------------------------------//
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
