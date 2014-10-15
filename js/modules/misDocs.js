
var app = angular.module("myAppDocs", []);

app.controller("docController", function($scope, $http, $window) {


    $http.get("webservice/Documento")
        .success(function(response) {$scope.docs = response;});


     $scope.abrirDoc = function(id) {
         var ruta= $scope.docs[id-1].ruta;
         $window.open('http://gestofi.com/'+ruta);
     };


    /*
     $scope.editDoc = function(id) {
     if (id == 'new') {
     $scope.edit = true;
     $scope.incomplete = true;
     $scope.fecha = '';
     $scope.nombre = '';
     $scope.codigo = '';
     $scope.rol = '';
     $scope.tipo = '';
     } else {
     $scope.edit = false;
     $scope.fecha = $scope.docs[id-1].fecha;
     $scope.nombre = $scope.docs[id-1].nombre;
     $scope.codigo = $scope.docs[id-1].codigo;
     $scope.rol = $scope.docs[id-1].rol;
     $scope.tipo = $scope.docs[id-1].tipo;
     }
     };*/




});

