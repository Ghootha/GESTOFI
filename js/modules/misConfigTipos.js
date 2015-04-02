var app = angular.module("myAppConfigTipos", []);

app.controller("configTiposController", function($scope, $http) {



    $scope.tabs = [  
      { link : '#agregarReservable', label : 'Agregar' },
      { link : '#editarReservable', label : 'Editar'},
      
    ]; 

$http.get("webservice/Reservable").success(function(response){$scope.equipos=response;});
$http.get("webservice/TipoReservable").success(function(response){$scope.selectTipos=response;});
$scope.agregarTipo=function(){

	var objeto={
		"nombre":$scope.nomNuevoTipo
	};

	$http.post("webservice/TipoReservable/create",objeto).success(function(response){
		$http.get("webservice/TipoReservable").success(function(response){$scope.selectTipos=response;});
		$scope.nomNuevoTipo="";
		alert("Tipo creado");
	});

};

$scope.agregarReservable=function(){
	var objeto={
		"nombre": $scope.inputNombre,
		"tipo": $scope.tipoSelect,
		"estado": $scope.inputEstado,
		"descripcion": $scope.inputDescripcion,
		"codigo": $scope.inputCodigo
	};

	$http.post("webservice/Reservable/create",objeto).success(function(response){
		$scope.inputNombre="";
		$scope.tipoSelect= $scope.selectTipos[0];
		$scope.inputEstado="";
		$scope.inputDescripcion="";
		$scope.inputCodigo="";
		$http.get("webservice/Reservable").success(function(response){$scope.equipos=response;});
		alert("Reservable creado");
	});
};

$scope.editarModal=function(idReservable){
	
	$http.get("webservice/Reservable/"+idReservable).success(function(response){
		$scope.nombreModal=response.nombre;
		for(var i=0;i<$scope.selectTipos.length;i++){
			if($scope.selectTipos[i].nombre===response.tipo){
				$scope.tipoModal=$scope.selectTipos[i].nombre;
			}
		}
		
		$scope.codigoModal=response.codigo;
		$scope.estadoModal=response.estado;
		$scope.descripcionModal=response.descripcion;
		$scope.editarReservable(idReservable);
	});
};

$scope.editarReservable=function(idReservable){
	$('#Modal').modal({backdrop:false}).one('click', '#confirm', function(){

		var objeto={
		"nombre": $scope.nombreModal,
		"tipo": $scope.tipoModal,
		"estado": $scope.estadoModal,
		"descripcion": $scope.descripcionModal,
		"codigo": $scope.codigoModal
	};

	$http.put("webservice/Reservable/update/"+idReservable, objeto).success(function(response){
		$scope.nombreModal="";
		$scope.tipoModal="";
		$scope.codigoModal="";
		$scope.estadoModal="";
		$scope.descripcionModal="";
		$http.get("webservice/Reservable").success(function(response){$scope.equipos=response;});
	});

	});
	
};

$scope.test = function() {

};

});
