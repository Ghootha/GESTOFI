
var app = angular.module("myAppDocs", []);

app.controller("docController", function($scope, $http, $window) {


    $http.get("webservice/Documento")
        .success(function(response) {$scope.docs = response;});


     $scope.abrirDoc = function(id) {
         var ruta= $scope.docs[id-1].ruta;
         $window.open('http://gestofi.com/'+ruta);
     };

     $scope.incomplete = false;
    
     $scope.editDoc = function(id) {    
     $scope.edit = true;
     $scope.fecha = $scope.docs[id-1].fecha;
     $scope.nombre = $scope.docs[id-1].nombre;
     $scope.codigo = $scope.docs[id-1].codigo;
     $scope.Role = $scope.docs[id-1].Role;
     $scope.seguridad = $scope.docs[id-1].seguridad;     
     $scope.tipo = $scope.docs[id-1].tipo;     
     };

     $scope.actualizaDoc = function(id) {
        
        var objetoJSON = {
            "nombre": $scope.docs[id-1].nombre,            
            "Role": $scope.docs[id-1].Role,
            "tipo": $scope.docs[id-1].tipo,
            "seguridad": $scope.docs[id-1].seguridad
        };

         $http.put("webservice/Documento/update/"+id, objetoJSON).success(
                function(){
                    $http.get("webservice/Documento")
                        .success(function(response) {$scope.docs = null; $scope.docs = response;});
                });
     };

     $scope.eliminaDoc = function(id) {
         $http.delete("webservice/Documento/"+id).success( 
            function(){
                $http.get("webservice/Documento").success(function(response) {$scope.docs = response;});
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

