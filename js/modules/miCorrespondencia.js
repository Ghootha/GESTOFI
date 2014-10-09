
var app = angular.module("myAppCorrespondencia", []);

app.controller("CorrespondenciaController", function($scope) {

    $scope.nombre='';
    $scope.asunto= '';
    $scope.fecha = '';
    $scope.correspondencias = [
        {id:1, nombre:'Remitente 1', asunto:"Correspondencia 1" , fecha:'16/02/2014'},
        {id:1, nombre:'Remitente 2', asunto:"Correspondencia 2", fecha:'1/08/2014'},
        {id:1, nombre:'Remitente 3', asunto:"Correspondencia 3", fecha:'25/11/2014'}
    ];
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

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

    $scope.$watch('nombre',function() {$scope.test();});
    $scope.$watch('asunto',function() {$scope.test();});
    $scope.$watch('fecha', function() {$scope.test();});

});

