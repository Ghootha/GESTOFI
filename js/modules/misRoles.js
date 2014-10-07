var app = angular.module("myAppRoles", []);

app.controller("rolController", function($scope) {

    $scope.name='';
    $scope.seg = '';
    $scope.desc = '';
    $scope.roles = [
        {id:1, name:'director', seg:'Alta',   desc:"es el director(?)"},
        {id:2, name:'asistente', seg:'Alta',   desc:"es el asistente del director(?)"},
        {id:3, name:'secretario', seg:'medio',   desc:"es el secretario(?)"},
        {id:4, name:'profesor', seg:'Baja',   desc:"es un profesor(?)" },
        {id:5, name:'sub-director', seg:'Alta',   desc:"es el sub-director(?)" }
    ];
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.editRol = function(id) {
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.name='';
            $scope.seg = '';
            $scope.desc = '';
        } else {
            $scope.edit = false;
            $scope.name = $scope.roles[id-1].name;
            $scope.seg = $scope.roles[id-1].seg;
            $scope.desc = $scope.roles[id-1].desc;
        }
    };

    $scope.$watch('name', function() {$scope.test();});
    $scope.$watch('seg',function() {$scope.test();});
    $scope.$watch('desc',function() {$scope.test();});

    /*$scope.test = function() {
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
    };*/
});
