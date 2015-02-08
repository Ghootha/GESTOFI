var app = angular.module("myAppAulas", []);

app.controller("aulaController", function($scope) {

$scope.nombre= '';

$scope.aulas = [
{id:1, nombre:'Aula 1'},
{id:2, nombre:'Aula 2'},
{id:3, nombre:'Aula 3'}
];
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 


$scope.apartarAula = function(idAula) {
  
  if(validacionInputs()){
    a=idAula+'usuarioID'+document.getElementById("i-Fecha").value+document.getElementById("i-HI").value+document.getElementById("i-HF").value;
    
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