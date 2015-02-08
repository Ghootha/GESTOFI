var app = angular.module("myAppEquipos", []);

app.controller("equipoController", function($scope) {
$scope.nombre= '';
$scope.codigo = '';

$scope.equipos = [
{id:1, nombre:'Computadora 01',tipo:'Computadora', codigo:'B678', estado:'Excelente',descripcion: 'es una computadora(?)'},
{id:2, nombre:'Proyector 01',tipo:'Proyector', codigo:'C147', estado:'Bueno',descripcion: 'es un Proyector(?)'},
{id:3, nombre:'Computadora 02',tipo:'Computadora', codigo:'BR47', estado:'Regular',descripcion: 'es una computadora(?)'},
{id:4, nombre:'Proyector 02',tipo:'Proyector', codigo:'C789', estado:'Bueno',descripcion: 'es un Proyector(?)'}
];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 


$scope.apartarEquipo = function(idEquipo) {
 if(validacionInputs()){
    a=idEquipo+'usuarioID'+document.getElementById("i-Fecha").value+document.getElementById("i-HI").value+document.getElementById("i-HF").value;
    
    //aqui envio datos a la base a tabla "reserva"
    window.alert(a);
    document.getElementById("i-Fecha").value="";
    document.getElementById("i-HI").value="";
    document.getElementById("i-HF").value="";
  }
  else 
    window.alert("Existen espacios vacios");
};

function validacionInputs(){
    if(document.getElementById("i-Fecha").value === "" || document.getElementById("i-HI").value === "" || document.getElementById("i-HF").value === "")
      return false;
    else
      return true;
    
}

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

});