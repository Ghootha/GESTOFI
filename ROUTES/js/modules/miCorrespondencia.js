
var app = angular.module("myAppCorrespondencia", []);

app.controller("CorrespondenciaController", function($scope) {

    $scope.nombre='';
    $scope.asunto= '';
    $scope.fecha = '';
    $scope.entradas = [
        {id:1, nombre:'Remitente 1', asunto:"Correspondencia 1" , fecha:'16/02/2014'},
        {id:1, nombre:'Remitente 2', asunto:"Correspondencia 2", fecha:'1/08/2014'},
        {id:1, nombre:'Remitente 3', asunto:"Correspondencia 3", fecha:'25/11/2014'}
    ];
    $scope.salidas = [
        {id:1, nombre:'Destinatario 1', asunto:"Correspondencia 1" , fecha:'16/02/2014'},
        {id:1, nombre:'Destinatario 2', asunto:"Correspondencia 2", fecha:'1/08/2014'},
        {id:1, nombre:'Destinatario 3', asunto:"Correspondencia 3", fecha:'25/11/2014'}
    ];


    $scope.inbox = true;
    $scope.outbox = false;
    $scope.finbox = function() {
        $scope.inbox = true;
        $scope.outbox = false;
    };
    $scope.foutbox = function() {
        $scope.inbox = false;
        $scope.outbox = true;
    };

    $scope.$watch('nombre',function() {$scope.test();});
    $scope.$watch('asunto',function() {$scope.test();});
    $scope.$watch('fecha', function() {$scope.test();});

     $scope.test = function() {        
        if ($scope.edit && (!$scope.nombre.length || !$scope.asunto.length ||
            !$scope.fecha.length)) {
            $scope.incomplete = true;
        }else{ $scope.incomplete = false; }
    };

});

