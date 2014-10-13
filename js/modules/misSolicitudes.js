var app = angular.module("myAppSolicitudes", []);

app.controller("solicitudController", function($scope) {

$scope.nombre='';
$scope.solicitante = '';

$scope.solicitudes = [
{id:1, nombre:'Nombre 1', solicitante:'Michael' },
{id:2, nombre:'Nombre 2', solicitante:'Andres' },
{id:3, nombre:'Nombre 3', solicitante:'Natasha'},
{id:4, nombre:'Nombre 4', solicitante:'José'   },
{id:5, nombre:'Nombre 5', solicitante:'John'   },
{id:6, nombre:'Nombre 6', solicitante:'Peter'  }
];
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.respondernombre = function(id) {
 
};

$scope.descargarnombre = function(id) {
 
};

$scope.$watch('nombre', function() {$scope.test();});
$scope.$watch('solicitante', function() {$scope.test();});

$scope.test = function() {
  if ($scope.passw1 !== $scope.passw2) {
    $scope.error = true;
    } else {
    $scope.error = false;
  }
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.solicitante.length ||
  !$scope.pApellido.length || !$scope.sApellido.length ||
  !$scope.passw1.length || !$scope.passw2.length)) {
       $scope.incomplete = true;
  }
};

});