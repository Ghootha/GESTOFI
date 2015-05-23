
var app = angular.module("myAppNotificaciones", ['ngRoute']);

	app.controller("NotificacionesController", function($scope, $http, $timeout, $location, $window, $route, $interval) {

		$http.get("webservice/Notificaciones/notificacionesUsuario")
			.success(function(response) {
	            $scope.notificaciones = response;
	            var c=0;
	            for(var i=0; i<$scope.notificaciones.length; i++){
	                if($scope.notificaciones[i].leido==false){
	                    c=c+1;
	                }
	            }
	            $scope.cant=c;
	        });

	        $http.get("webservice/Correspondencia/bandejaDeEntrada")
			.success(function(response) {
	            $scope.entradas = response;
	            var c=0;
	            for(var i=0; i<$scope.entradas.length; i++){
	                if($scope.entradas[i].leido==false){
	                    c=c+1;
	                }
	            }
	            $scope.cant2=c;
	        });

		$interval(function(){  // metodo para que se refresque el div de notificaciones
			$http.get("webservice/Notificaciones/notificacionesUsuario")
				.success(function(response) {
		            $scope.notificaciones = response;
		            var c=0;
		            for(var i=0; i<$scope.notificaciones.length; i++){
		                if($scope.notificaciones[i].leido==false){
		                    c=c+1;
		                }
		            }
		            $scope.cant=c;
		        });

		        $http.get("webservice/Correspondencia/bandejaDeEntrada")
				.success(function(response) {
		            $scope.entradas = response;
		            var c=0;
		            for(var i=0; i<$scope.entradas.length; i++){
		                if($scope.entradas[i].leido==false){
		                    c=c+1;
		                }
		            }
		            $scope.cant2=c;
		        });


			},2000); //fin del interval



    $http.get("webservice/get_user").success(function(response){
			$scope.user= response.user;
			$scope.userLogged=  $scope.user.fullname;
			}).error(function(response, status, header, config){
				if(response.status == 300){ //estatus de error para usuario en uso
					$scope.mensajeErrorRegistro=true;
				}
			});

    $scope.eliminaNotificacion = function(id) {
          $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () {

          $http.get("webservice/Notificaciones/destroy/"+id).success(
                    function(){

                    for(var i = 0; i<$scope.notificaciones.length; i++) {
                        if($scope.notificaciones[i].id === id) {
                           $scope.$apply($scope.notificaciones.splice(i, 1));
                        }
                    }
                   });
        });
     };
     $scope.mostrarInfo = function(id){
		for(var i = 0; i<$scope.notificaciones.length; i++) {
                if($scope.notificaciones[i].id === id) {
					$scope.titulo = $scope.notificaciones[i].titulo;
                    $scope.mensaje = $scope.notificaciones[i].mensaje;
				}
		}
	 };


    $scope.cambiarLeido=function(id) {
		$http.put("webservice/Notificaciones/update/"+id+"?leido=true").success();
	}

    $scope.actualizar= function(){
        $route.reload();
    }


});
