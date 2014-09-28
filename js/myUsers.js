function userController($scope) {
$scope.fName = '';
$scope.pApellido = '';
$scope.sApellido = '';
$scope.passw1 = '';
$scope.passw2 = '';
$scope.users = [
{id:1, fName:'Michael',   pApellido:"González", sApellido:"Murillo"  },
{id:2, fName:'Andres',   pApellido:"Rodríguez", sApellido:"Morales" },
{id:3, fName:'Natasha',   pApellido:"Arteaga", sApellido:"Arteaga" },
{id:4, fName:'José',  pApellido:"Alvarado", sApellido:"Alvarado" },
{id:5, fName:'John',  pApellido:"Doe", sApellido:"Doe" },
{id:6, fName:'Peter', pApellido:"Pan", sApellido:"Pan" }
];
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.editUser = function(id) {
  if (id == 'new') {
    $scope.edit = true;
    $scope.incomplete = true;
    $scope.fName = '';
    $scope.pApellido = '';
    $scope.sApellido = '';
    } else {
    $scope.edit = false;
    $scope.fName = $scope.users[id-1].fName;
    $scope.pApellido = $scope.users[id-1].pApellido; 
    $scope.sApellido = $scope.users[id-1].sApellido;
  }
};

$scope.$watch('passw1',function() {$scope.test();});
$scope.$watch('passw2',function() {$scope.test();});
$scope.$watch('fName', function() {$scope.test();});
$scope.$watch('pApellido', function() {$scope.test();});
$scope.$watch('sApellido', function() {$scope.test();});

$scope.test = function() {
  if ($scope.passw1 !== $scope.passw2) {
    $scope.error = true;
    } else {
    $scope.error = false;
  }
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.fName.length ||
  !$scope.pApellido.length || !$scope.sApellido.length ||
  !$scope.passw1.length || !$scope.passw2.length)) {
       $scope.incomplete = true;
  }
};

}