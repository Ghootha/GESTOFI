var app = angular.module("myAppReserva", []);

app.controller("reservaController", function($scope, $http) {

/*$scope.reservas = [
{id:1, nombre:'Nombre 1', tipoReserva: 'Computadora', codigoReserva: '1212', HoraReserva: '01:00' },
{id:2, nombre:'Nombre 2', tipoReserva: 'Proyector', codigoReserva: '1212' ,HoraReserva: '02:00'},
{id:3, nombre:'Nombre 3', tipoReserva: 'Aula XXX', codigoReserva: '---',HoraReserva: '02:00'},
{id:4, nombre:'Nombre 4', tipoReserva: 'Bandera' , codigoReserva: '1212'  ,HoraReserva: '02:00'},
{id:5, nombre:'Nombre 5', tipoReserva: 'Computadora' , codigoReserva: '1212'  ,HoraReserva: '02:00'},
{id:6, nombre:'Nombre 6', tipoReserva: 'Computadora' , codigoReserva: '1212' ,HoraReserva: '02:00'}
];*/

$http.get("webservice/ReservaEquipo/findReservas").success(function(response){$scope.reservas=response;});

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 



});