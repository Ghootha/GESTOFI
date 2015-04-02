 var app = angular.module("myAppSolicitudes", []);

app.controller("solicitudController", function($scope, $http , $window, $upload, $timeout) {

$scope.nombre='';
$scope.solicitante = '';

$scope.solicitudes = [];
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$http.get("webservice/Solicitudes/findSolicitudes").success(function(response){$scope.solicitudes=response;})

$scope.abrirSolicitud = function(id) {
          if(id===1){
            $window.open('http://gestofi.com/webservice/solicitudes/plantillas/PLANTILLA_GIRAS.docx'); 
          }
          else{
            $window.open('http://gestofi.com/webservice/solicitudes/plantillas/PLANTILLA_VACACIONES.docx'); 
          }
 
    };

$scope.setClassButton = function(estado) {
    
    if(estado!=="Pendiente"){
      return "btn btn-success"
    }
    else
      return "btn btn-warning";
    
};

$scope.setClassSpan = function(estado) {
    
    if(estado==="Pendiente"){
      return "glyphicon glyphicon-exclamation-sign";
    }
    else
      return "glyphicon glyphicon-ok-sign";
    
};

$scope.cambioEstado = function(id, estado) {
    
   if(estado==="Pendiente"){
    $http.put("webservice/Solicitudes/update/"+id+"?estado=Revisado").success(function(response){});
   }
   else
    $http.put("webservice/Solicitudes/update/"+id+"?estado=Pendiente").success(function(response){});
    
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
    $http.put("webservice/Solicitudes/create",objetoSolicitud).success(function(response){});
    alert("Solicitud enviada, la respuesta será notificada por correspondencia");
  });

    

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
            debugger;
            var ruta = response.files[0].fd;
            var nombre = response.files[0].filename;

            var nombreSliced = nombre.slice(0,-4);
            //var nombreHash = /[^\\]*$/.exec(ruta)[0];
            var nombreHash = ruta.slice(74,ruta.length+1);

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