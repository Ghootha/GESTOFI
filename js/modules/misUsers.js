var app = angular.module("myAppUsers", []);

app.controller("userController", function($scope) {

    $scope.ced='';
    $scope.fName = '';
    $scope.pApellido = '';
    $scope.sApellido = '';
    $scope.passw1 = '';
    $scope.passw2 = '';
    $scope.elrol = '';
    $scope.users = [
        {id:1, ced:'2-0596-0618', fName:'Michael',   pApellido:"González", sApellido:"Murillo", elrol:"Profesor"  },
        {id:2, ced:'1-1553-0965', fName:'Andres',   pApellido:"Rodríguez", sApellido:"Morales", elrol:"Director" },
        {id:3, ced:'4-0217-0111', fName:'Natasha',   pApellido:"Arteaga", sApellido:"Guerrero", elrol:"Asistente" },
        {id:4, ced:'4-0217-0123', fName:'José',  pApellido:"Alvarado", sApellido:"Villalobos", elrol:"Secretario" },
        {id:5, ced:'3-0894-0561', fName:'John',  pApellido:"Doe", sApellido:"Doe", elrol:"Profesor" },
        {id:6, ced:'9-0753-0159', fName:'Peter', pApellido:"Pan", sApellido:"Pan", elrol:"Sub-Director" }
    ];
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.editUser = function(id) {
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.ced='';
            $scope.fName = '';
            $scope.pApellido = '';
            $scope.sApellido = '';
            $scope.elrol='';
        } else {
            $scope.edit = false;
            $scope.ced = $scope.users[id-1].ced;
            $scope.fName = $scope.users[id-1].fName;
            $scope.pApellido = $scope.users[id-1].pApellido;
            $scope.sApellido = $scope.users[id-1].sApellido;
            $scope.elrol = $scope.users[id-1].elrol;
        }
    };

     $scope.deleteUser = function(id) {
      
    };

    $scope.$watch('passw1',function() {$scope.test();});
    $scope.$watch('passw2',function() {$scope.test();});
    $scope.$watch('ced', function() {$scope.test();});
    $scope.$watch('fName', function() {$scope.test();});
    $scope.$watch('pApellido', function() {$scope.test();});
    $scope.$watch('sApellido', function() {$scope.test();});
    $scope.$watch('elrol', function() {$scope.test();});

    $scope.test = function() {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.ced.length || !$scope.fName.length ||
            !$scope.pApellido.length || !$scope.sApellido.length ||
            !$scope.passw1.length || !$scope.passw2.length || !$scope.elrol.length)) {
            $scope.incomplete = true;
        }
    };

});