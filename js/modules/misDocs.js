
var app = angular.module("myAppDocs", []);

app.controller("docController", function($scope, $http, $window) {


    $http.get("webservice/Documento")
        .success(function(response) {$scope.docs = response;});


     $scope.abrirDoc = function(id) {
        for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    var ruta= $scope.docs[i].ruta;
                    $window.open('http://gestofi.com/'+ruta);
                }
         }  
     };

     $scope.incomplete = false;
    
     $scope.editDoc = function(id) { 
         $scope.edit = true;
         for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    $scope.fecha = $scope.docs[i].fecha;
                    $scope.nombre = $scope.docs[i].nombre;
                    $scope.codigo = $scope.docs[i].codigo;
                    $scope.Role = $scope.docs[i].Role;
                    $scope.seguridad = $scope.docs[i].seguridad;     
                    $scope.tipo = $scope.docs[i].tipo;     
                }
         }     
     };

     $scope.actualizaDoc = function(id) {
        
        var objetoJSON;
        for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    objetoJSON = {
                        "nombre": $scope.docs[i].nombre,            
                        "Role": $scope.docs[i].Role,
                        "tipo": $scope.docs[i].tipo,
                        "seguridad": $scope.docs[i].seguridad
                    };                    
                }
            }   
         $http.put("webservice/Documento/update/"+id, objetoJSON).success(
                function(){
                    $http.get("webservice/Documento")
                        .success(function(response) {$scope.docs = null; $scope.docs = response;});
         });
     };
     

     $scope.eliminaDoc = function(id) {
         $http.delete("webservice/Documento/"+id).success( 
            function(){
                for(var i = 0; i<$scope.docs.length; i++) {           
                    if($scope.docs[i].id === id) {
                       $scope.docs.splice(i, 1);
                    }
                }
         });
     };



    $scope.$watch('fecha',function() {$scope.test();});
    $scope.$watch('nombre',function() {$scope.test();});
    $scope.$watch('codigo', function() {$scope.test();});    
    $scope.$watch('Role', function() {$scope.test();});
    $scope.$watch('seguridad', function() {$scope.test();});
    $scope.$watch('tipo', function() {$scope.test();});    

    $scope.test = function() {        
        if ($scope.edit && (!$scope.fecha.length || !$scope.nombre.length ||
            !$scope.codigo.length || !$scope.Role.length || !$scope.seguridad.length ||
            !$scope.tipo.length)) {
            $scope.incomplete = true;
        }else{ $scope.incomplete = false; }
    };




});

