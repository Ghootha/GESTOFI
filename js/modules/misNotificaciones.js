
var app = angular.module("myAppNotificaciones", ['ngRoute']); 

	app.controller("NotificacionesController", function($scope, $http, $timeout, $location, $window, $route) {

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
        
        
    $scope.actualizar=function(id) {
		
			for(var i = 0; i<$scope.notificaciones.length; i++) {
                if($scope.notificaciones[i].id === id) {
                    
                    if($scope.notificaciones[i].leido==false){
                        objetoJSON = {
                            "duenno": $scope.notificaciones[i].duenno,            
                            "emisor": $scope.notificaciones[i].emisor,
                            "titulo": $scope.notificaciones[i].titulo,
                            "tipo": $scope.notificaciones[i].tipo,
                            "fecha": $scope.notificaciones[i].fecha,
                            "leido": true
                        };
                        $http.put("webservice/Notificaciones/update/"+id, objetoJSON).success(
                            function (){
                                 $route.reload();
                            }
                        );
                        
                        
                    }
                }
            }
	}    
});
