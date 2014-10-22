var app = angular.module("myAppRoles", []);

app.controller("rolController", function($scope) {

    $scope.nombre='';
    $scope.seguridad = '';
    $scope.descripcion = '';
    $scope.roles = [
        {id:1, nombre:'director', seguridad:'Alta',   descripcion:"es el director(?)"},
        {id:2, nombre:'asistente', seguridad:'Alta',   descripcion:"es el asistente del director(?)"},
        {id:3, nombre:'secretario', seguridad:'medio',   descripcion:"es el secretario(?)"},
        {id:4, nombre:'profesor', seguridad:'Baja',   descripcion:"es un profesor(?)" },
        {id:5, nombre:'sub-director', seguridad:'Alta',   descripcion:"es el sub-director(?)" }
    ];
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.editRole = function(id) {
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.nombre='';
            $scope.seguridad = '';
            $scope.descripcion = '';
        } else {
            for(var i = 0; i<$scope.roles.length; i++) {
                if($scope.roles[i].id === id) {
                    $scope.nombre = $scope.roles[i].nombre;
                    $scope.seguridad = $scope.roles[i].seguridad;
                    $scope.descripcion = $scope.roles[i].descripcion;
                }
            }
            
        }
    };

    $scope.deleteRole = function(id) {
       

         $('#Modal3').modal({ backdrop: 'static', keyboard: false })
        .one('click', '#confirm', function (e) {
                for(var i = 0; i<$scope.roles.length; i++) {           
                    if($scope.roles[i].id === id) {
                       $scope.roles.splice(i, 1);
                    }
                } 
        });

               
    };


    $scope.actualizarRole = function(id) {
        for(var i = 0; i<$scope.roles.length; i++) {           
            if($scope.roles[i].id === id) {
               //llamado: http.put(webservice/update/+"id"+)
            }
        }
        
    };

    $scope.$watch('nombre', function() {$scope.test();});
    $scope.$watch('seguridad',function() {$scope.test();});
    $scope.$watch('descripcion',function() {$scope.test();});

    $scope.test = function() {
        if ($scope.nombre !== null) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.nombre.length ||
            !$scope.seguridad.length || !$scope.descripcion.length )) {
            $scope.incomplete = true;
        }
    };
});
