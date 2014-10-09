
var app = angular.module("myAppDocs", []);

app.controller("docController", function($scope) {

    $scope.fecha='';
    $scope.nombre= '';
    $scope.codigo = '';
    $scope.rol = '';
    $scope.tipo = '';

    $scope.docs = [
        {id:1, fecha:'1/08/2014', nombre:'Doc 1', codigo:'A1245', rol:"Director", tipo:"Acta" },
        {id:2, fecha:'2/11/2013', nombre:'Doc 2', codigo:'B678', rol:"Secretaria", tipo:"Carta"},
        {id:3, fecha:'2/02/2012', nombre:'Doc 3', codigo:'C789', rol:"Profesor", tipo:"Plan de Estudio"}
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

    $scope.$watch('fecha',function() {$scope.test();});
    $scope.$watch('nombre',function() {$scope.test();});
    $scope.$watch('codigo', function() {$scope.test();});
    $scope.$watch('rol', function() {$scope.test();});
    $scope.$watch('tipo', function() {$scope.test();});

    $scope.test = function() {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.fecha.length ||
            !$scope.codigo.length || !$scope.rol.length ||
            !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }
    };

});

