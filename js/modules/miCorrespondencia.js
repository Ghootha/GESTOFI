
var app = angular.module("myAppCorrespondencia", ['ngRoute', 'ngTagsInput']); //tags aqui

	app.controller("CorrespondenciaController", function($scope, $http, $timeout, $location, $window) {

	$http.get("webservice/bandejaDeEntrada")
		.success(function(response) {$scope.entradas = response;});

	$http.get("webservice/bandejaDeSalida")
		.success(function(response) {$scope.salidas = response;});
		
	$http.get("webservice/Correspondencia")
		.success(function(response) {$scope.correspondencia = response;});	

	$http.get("webservice/get_user").success(function(response){
			$scope.user= response.user;
			$scope.userLogged=  $scope.user.fullname;            
			}).error(function(response, status, header, config){  
				if(response.status == 300){ //estatus de error para usuario en uso
					$scope.mensajeErrorRegistro=true;
				}   
			});
        
        //autocompletar
    $scope.loadTags = function(query) {
        return $http.get("webservice/User");
    };
        //end autocompletar
        
	$scope.mensajeExitoSubidaDoc=false;
	$scope.mensajeFallidoSubidaDoc=false;
	

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

	/*$scope.crearMensaje=function() {
		alert("entro a crear mensaje");
		var objetoJSON;    
					   
		objetoJSON = {
			"emisor": $scope.user.username,            
			"receptor": $scope.destinatario,
			"asunto": $scope.asunto,
			"mensaje": $scope.mensaje,
			//"idDocumento": $scope.idDocumento,  //hay que asignarla cuando se selecciona el tipo
			//"folio": $scope.folio
		};
		alert("Usuario: "+$scope.user.username+",    Destinatario: "+$scope.destinatario+",  ASunto: "+$scope.asunto+",    Mensaje"+$scope.mensaje);
		$http.put("webservice/Correspondencia/create", objetoJSON).success(function(response){
					$timeout(function(){
						$scope.mensajeExito=true;
						//Aqui se manda mensaje de exito en etiqueta html
					});                        
			 }).error(function(response, status, header, config){  
					$timeout(function(){
						alert("response: "+response+",    status"+status+",   header: "+header+",    config: "+config);
						$scope.mensajeFallo=true;
						//Aqui se manda mensaje de error
					});                          
			 });
	};*/
        
        //crear mensaje con tags
        $scope.crearMensaje=function() {
		var objetoJSON;
        var destinos=$scope.tags;
        var msjExito="Mensaje Enviado exitosamente a: ";
        var msjFallo="Mensaje No Enviado a: ";
        destinos.forEach(function(entry){
            //alert(JSON.stringify(entry.username, null, 4));
            objetoJSON = {
                "emisor": $scope.user.username,            
                "receptor": entry.username,
                "asunto": $scope.asunto,
                "mensaje": $scope.mensaje,
                //"idDocumento": $scope.idDocumento,  //hay que asignarla cuando se selecciona el tipo
            };
            alert(objetoJSON.receptor);
            $http.put("webservice/Correspondencia/create", objetoJSON).success(function(response){
					$timeout(function(){
						$scope.mensajeExito=true;
                        msjExito.concat(objetoJSON.receptor+" ");
						//Aqui se manda mensaje de exito en etiqueta html
					});                        
			 }).error(function(response, status, header, config){  
					$timeout(function(){
						//alert("response: "+response+",    status"+status+",   header: "+header+",    config: "+config);
						//$scope.mensajeFallo=true;
                        msjFallo.concat(objetoJSON.receptor+" ");
						//Aqui se manda mensaje de error
					});                          
			 });
        });
        
        //alert(msjExito);
        //alert(msjFallo);
        //End crear mensaje con tags
        };
	$scope.viewMailOut=function(id) {
		
			for(var i = 0; i<$scope.salidas.length; i++) {
                if($scope.salidas[i].id === id) {
                    $scope.emisor = $scope.salidas[i].emisor;
                    $scope.receptor = $scope.salidas[i].receptor;
                    $scope.asunto = $scope.salidas[i].asunto;
                    $scope.mensaje = $scope.salidas[i].mensaje;
                    $scope.fecha = $scope.salidas[i].fecha;
                    
                    
                }
            }
	}
	$scope.viewMailIn=function(id) {
		
			for(var i = 0; i<$scope.entradas.length; i++) {
                if($scope.entradas[i].id === id) {
                    $scope.emisor = $scope.entradas[i].emisor;
                    $scope.receptor = $scope.entradas[i].receptor;
                    $scope.asunto = $scope.entradas[i].asunto;
                    $scope.mensaje = $scope.entradas[i].mensaje;
                    $scope.fecha = $scope.entradas[i].fecha;
                    
                    
                }
            }
	}
});
