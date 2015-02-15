var app = angular.module("myAppAulas", []);

app.controller("aulaController", function($scope, $http) {

$scope.nombre= '';

$http.get("webservice/findReservablebyAula")
        .success(function(response) {$scope.aulas = response;});

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 


$scope.apartarAula = function(idAula) {
  
  if(validacionInputs()){
    a=idAula+'usuarioID'+$scope.fecha+$scope.horaInicio+$scope.horaFinal;
    
    //aqui envio datos a la base a tabla "reserva"
    window.alert(a);
    $scope.horaInicio="";
    $scope.horaFinal="";
    $scope.fecha="";
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
  
};

});