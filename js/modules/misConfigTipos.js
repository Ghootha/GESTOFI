var app = angular.module("myAppConfigTipos", []);

app.controller("configTiposController", function($scope, $http,$upload, $timeout) {


$scope.btnFile=false;
    $scope.tabs = [  
      { link : '#agregarReservable', label : 'Agregar' },
      { link : '#editarReservable', label : 'Editar'},
      
    ]; 

    $scope.plantillas = [
        {nombre:'Giras'},
        {nombre:'Vacaciones'}
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

$scope.checkOption=function(){
	if($scope.selectPlantilla==="Giras"){
		$scope.nombreArchivo="PLANTILLA_GIRAS.docx";
		$scope.btnFile=true;
	}
	else{
		$scope.nombreArchivo="PLANTILLA_VACACIONES.docx";
		$scope.btnFile=true;
	}
};

 $scope.cargarArchivo=function(nombre){
 	$scope.btnFile=false;
 	$scope.selectPlantilla=false;
 	alert("subida del archivo"+" "+nombre+" "+"exitoso");

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
                    url: 'webservice/Solicitudes/uploadPlantilla',
                    data: {title: 'prueba', documento: file, nomDoc:$scope.nombreArchivo}
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
           
            //var ruta = response.files[0].fd;
            //var nombre = response.files[0].filename;

            //var nombreSliced = nombre.slice(0,-4);
            //var nombreHash = /[^\/]*$/.exec(ruta)[0];//para MAC
            //var nombreHash = /[^\\]*$/.exec(ruta)[0];//para WIN
            $scope.cargarArchivo($scope.nombreArchivo);
            
    };


///////////

$scope.test = function() {

};

});
