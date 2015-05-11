 var app = angular.module("myAppSolicitudes", []);

app.controller("solicitudController", function($scope, $http , $window, $upload, $timeout,$route) {

$scope.$on('$viewContentLoaded', function() {
    $http.get("webservice/get_user").success(function(response){
            if(response.user == null){
              window.location.replace("index.html"); 
            }else{     
              $scope.user= response.user;  
              var roleLogged = response.user.role;
            
              $http.get("webservice/Role").success(function(response){
                      var roles = response;

                      for(var i = 0; i<roles.length; i++) {           
                          if(roles[i].nombre === roleLogged) {
                              
                              var seguridad=roles[i].seguridad;

                              if( seguridad == 'Ninguna'){  
                                 window.location.replace("paginaPrincipal.html"); 
                              }
                              
                          }
                      }
              });               
          }
    }).error(function(response, status, header, config){  
            console.log("error en obtencion de usuario conectado");  
    });
    
    $http.get("webservice/Solicitudes/findSolicitudes").success(function(response){$scope.solicitudes=response;});
});


$scope.nombre='';
$scope.solicitante = '';

$scope.solicitudes = [];
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 
var estado="";


//$http.get("webservice/get_user").success(function(response){$scope.user= response.user;});



$scope.abrirSolicitud = function(id) {
          if(id==1){
            $window.open('http://gestofi.com/webservice/solicitudes/plantillas/PLANTILLA_GIRAS.docx'); 
          }
          else{
            $window.open('http://gestofi.com/webservice/solicitudes/plantillas/PLANTILLA_VACACIONES.docx'); 
          }
 
    };

$scope.setClassButton = function(estado) {
    
    if(estado=="Aprobar"){
      return "btn btn-success";
    }
    else
		if(estado=="Rechazar"){
			return "btn btn-danger";
		}
		else
			return "btn btn-warning";
};


$scope.setClassSpan = function(estado) {
    
    if(estado=="Rechazar"){
      return "glyphicon glyphicon-remove";
    }
    else {
		if(estado=="Aprobar"){
				return "glyphicon glyphicon-ok";
			}
			else
				return "glyphicon glyphicon-exclamation-sign";
	}	
	};

$scope.cambioEstado = function(id,estado) {
   
     if(estado=="Rechazar"){
    $http.put("webservice/Solicitudes/update/"+id+"?estado=Rechazar").success(function(response){
	var objetoJSON;
			objetoJSON ={
				"duenno":$scope.solicitante,
				"emisor":$scope.user.username,
				"titulo":"Solicitud Rechazada "+$scope.nombre,
				"tipo":"Solicitud",
				"mensaje":$scope.comentario
			};
			$http.put("webservice/notificaciones/create", objetoJSON).success(function(response){alert("Se envió la notificación")});$route.reload();});
   }
   else {
		if(estado=="Aprobar"){
			$http.put("webservice/Solicitudes/update/"+id+"?estado=Aprobar").success(function(response){
			var objetoJSON;
			objetoJSON ={
				"duenno":$scope.solicitante,
				"emisor":$scope.user.username,
				"titulo":"Solicitud Aprobada "+$scope.nombre,
				"tipo":"Solicitud",
				"mensaje":$scope.comentario
			};
			$http.put("webservice/notificaciones/create", objetoJSON).success(function(response){alert("Se envió la notificación")});
			$route.reload();});
		}
		else
			$http.put("webservice/Solicitudes/update/"+id+"?estado=Pendiente").success(function(response){$route.reload();});
	}
};

$scope.setAt =function(id,solicitante,nombre){
	$scope.id=id;
	$scope.nombre=nombre;
	$scope.solicitante=solicitante;
};


$scope.enviarSolicitud = function(id) {
	$scope.cambioEstado($scope.id,$scope.estado);
	$('#Modal').modal('hide');
};

$scope.cargarSolicitud= function(dir, filename){
    $http.get("webservice/get_user").success(function(response){
                    $scope.user= response.user;
    var objetoSolicitud;

    objetoSolicitud={

      "nombre": filename,
	    "estado": "Pendiente",
      "solicitante": $scope.user.username,
      "ruta": dir

    };

    $http.get("webservice/User/getSeguridadAltaUsers").success(function(response){$scope.seguridadAlta=response;
    $http.put("webservice/Solicitudes/create",objetoSolicitud).success(function(response){
      var objetoJSON;
        
        for(var i=0;i<$scope.seguridadAlta.length;i++){
        objetoJSON ={
          
          "duenno":$scope.seguridadAlta[i],//buscar y poner nombre
          "emisor":$scope.user.fullname,
          "titulo":"Solicitud Pendiente",
          "tipo":"Solicitud de Gira/Vacaciones",
          "mensaje":"Ha recibido una nueva solicitud de giras o vacaciones, la puede acceder en Configuraciones > Solicitudes > Pendientes"
        };
      
        $http.put("webservice/notificaciones/create", objetoJSON).success(function(response){});
      }
    });
    bootbox.alert("Solicitud enviada, la respuesta será notificada por correspondencia");
    //alert("Solicitud enviada, la respuesta será notificada por correspondencia");
  });});

    

};

$scope.descargarSolicitud= function(id){
  $http.get("webservice/Solicitudes/"+id).success(function(response){
   $window.open('http://gestofi.com/webservice/solicitudes/solicitudesRecibidas/'+response.ruta); 
  })
    
};


//EMPIEZA CODIGO NECESARIO PARA QUE FUNCIONE EL UPLOADER
    //-------------------------------------------------------------------------------------------------------------------------------------//

    $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
    
    $scope.$watch('files', function(files) {        
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function(file) {
                    uploadUsing$upload(file);
                })(files[i]);
            }
        }
    });
    

    function uploadUsing$upload(file) {
        $scope.errorMsg = null;
        file.upload = $upload.upload({
                    url: 'webservice/Solicitudes/upload',
                    data: {title: 'prueba', documento: file}
                });

        file.upload.then(function(response) {
            $timeout(function() {
               file.result = response.data;
               $scope.onSuccessLoadFile(file.result);
            });
        }, function(response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function(evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

        file.upload.xhr(function(xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }
    
    
    angular.element(window).bind("dragover", function(e) {
        e.preventDefault();
    });
    angular.element(window).bind("drop", function(e) {
        e.preventDefault();
    });
      
    $scope.onSuccessLoadFile = function(response){
           
            var ruta = response.files[0].fd;
            var nombre = response.files[0].filename;

            var nombreSliced = nombre.slice(0,-4);
            var nombreHash = /[^\/]*$/.exec(ruta)[0];//para MAC
            //var nombreHash = /[^\\]*$/.exec(ruta)[0];//para WIN
            $scope.cargarSolicitud(nombreHash, nombreSliced);
            
    };


///////////


$scope.$watch('nombre', function() {$scope.test();});
$scope.$watch('solicitante', function() {$scope.test();});

$scope.test = function() {
  if ($scope.passw1 !== $scope.passw2) {
    $scope.error = true;
    } else {
    $scope.error = false;
  }
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.solicitante.length ||
  !$scope.pApellido.length || !$scope.sApellido.length ||
  !$scope.passw1.length || !$scope.passw2.length)) {
       $scope.incomplete = true;
  }
};

});