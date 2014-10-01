function aulaController($scope) {
$scope.nombre= '';


$scope.aulas = [
{id:1, nombre:'Aula 1'},
{id:2, nombre:'Aula 2'},
{id:3, nombre:'Aula 3'}
];
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 


$scope.editDoc = function(id) {
  if (id == 'new') {
    $scope.edit = true;    
    $scope.nombre = '';
    
    } else {
    $scope.edit = false;    
    $scope.nombre = $scope.docs[id-1].nombre; 
         
  }
};

$scope.$watch('nombre',function() {$scope.test();});

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