function equipoController($scope) {
$scope.nombre= '';
$scope.codigo = '';

$scope.equipos = [
{id:1, nombre:'Equipo 1', codigo:'A1245'},
{id:2, nombre:'Equipo 2', codigo:'B678' },
{id:3, nombre:'Equipo 3', codigo:'C789' }
];
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 


$scope.editDoc = function(id) {
  if (id == 'new') {
    $scope.edit = true;    
    $scope.nombre = '';
    $scope.codigo = '';    
    } else {
    $scope.edit = false;    
    $scope.nombre = $scope.docs[id-1].nombre; 
    $scope.codigo = $scope.docs[id-1].codigo;     
  }
};

$scope.$watch('nombre',function() {$scope.test();});
$scope.$watch('codigo', function() {$scope.test();});

$scope.test = function() {
  // if ($scope.passw1 !== $scope.passw2) {
  //   $scope.error = true;
  //   } else {
  //   $scope.error = false;
  // }
  // $scope.incomplete = false;
  // if ($scope.edit && (!$scope.fecha.length ||
  // !$scope.codigo.length || !$scope.rol.length ||
  // !$scope.passw1.length || !$scope.passw2.length)) {
  //      $scope.incomplete = true;
  // }
};

}