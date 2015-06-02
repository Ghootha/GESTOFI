var app = angular.module("AppConfiguracion", ['duScroll','ngFileUpload']);

app.controller("configController", function($scope, $http, Upload, $timeout, $document) {



$scope.$on('$viewContentLoaded', function () {

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

		                    if( seguridad != 'Alta'){  
		                    	 window.location.replace("paginaPrincipal.html"); 
		                    }
		                    
		                }
		            }
		    });               
		}
	}).error(function(response, status, header, config){  
	        console.log("error en obtencion de usuario conectado");  
	});
	//carga de listas con respecto a la base
	$http.get("webservice/Reservable").success(function(response){$scope.equipos=response;});
	$http.get("webservice/TipoReservable").success(function(response){$scope.selectTipos=response;});
	$http.get("webservice/TipoDocumento").success(function(response){$scope.tipoDocumentos=response;});
	
});

$scope.toTheTop = function() {
      $document.scrollTopAnimated(0, 5000).then(function() {
        console && console.log('You just scrolled to the top!');
      });
    }
    var section2 = angular.element(document.getElementById('section-2'));
    $scope.toSection2 = function() {
      $document.scrollToElementAnimated(section2);
    }
  


$scope.btnFile=false;
    $scope.tabs = [  //tabs para la seccion de reservables
      { link : '#agregarReservable', label : 'Agregar' },
      { link : '#editarReservable', label : 'Editar'},
      { link : '#editarTipo', label : 'Editar Tipo'},
      
    ]; 

    $scope.tabs2 = [  
      { link : '#agregarTipoDocumento', label : 'Agregar' },
      { link : '#editarTipoDocumento', label : 'Editar'},
      
    ]; 

    $scope.plantillas = [ //nombres de las etiquetas para carga de plantillas
        {nombre:'Giras'},
        {nombre:'Vacaciones'}
    ];

$scope.agregarTipo=function(){//metodo para agregar el tipo de reservable
	if(typeof $scope.nomNuevoTipo !== "undefined"){
	var objeto={
		"nombre":$scope.nomNuevoTipo,
		"tipo":$scope.selectTipoReservable

	};

	$http.post("webservice/TipoReservable/create",objeto).success(function(response){
		$scope.selectTipos.push(response);
		$scope.nomNuevoTipo="";
		$scope.selectTipoReservable="";
		bootbox.alert("Tipo creado");
	});}
	else{
		bootbox.alert("Espacio de nombre esta vacio");
	}

};

$scope.agregarReservable=function(){//metodo que agrega el reservable a la base
	
	if(typeof $scope.inputNombre!=="undefined" && typeof $scope.inputEstado !=="undefined" && typeof $scope.inputDescripcion!=="undefined" && typeof $scope.inputCodigo!=="undefined"){
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
		$scope.equipos.push(response);
		bootbox.alert("Reservable creado");
		
	});}
	else{
		bootbox.alert("Existen espacios con datos incorrectos");
		
	}
};

$scope.editarModal=function(idReservable, index){//metodo que edita la informacion del modal puede variar de tipo de reservable o reservable
	if(index===1){
	$http.get("webservice/Reservable/"+idReservable).success(function(response){// aqui para modificar el modal si es reservable 
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
	});}
	else if(index===2){//aqui para modificar si es tipo de reservable
		$http.get("webservice/TipoReservable/"+idReservable).success(function(response){
		$scope.nombreModal=response.nombre;
		$scope.editarTipoReservable(idReservable);
	});
	}
};

$scope.editarReservable=function(idReservable){//modifica el reservable en la base 
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

$scope.editarTipoReservable=function(idReservable){//edita el tipo de reservable en la base
	$('#Modal4').modal({backdrop:false}).one('click', '#confirm', function(){
		
		var objeto={
		"nombre": $scope.nombreModal,
	};

	$http.put("webservice/TipoReservable/update/"+idReservable, objeto).success(function(response){
		$scope.nombreModal="";
		$http.get("webservice/TipoReservable").success(function(response){$scope.selectTipos=response;});
	});

	});
	
};


//------------------------------------------------------------INICIA CONFIG DE TIPO DOCUMENTO------------------------------------------------------//
$scope.agregarTipoDoc=function(){
	var objeto={
		"nombre": $scope.nombreTipoDoc,
		"seguridad": $scope.seguridadTipoDoc,
		"clasificacion": $scope.clasificacionTipoDoc
	};

	$http.post("webservice/TipoDocumento/create",objeto).success(function(response){
		$scope.nombreTipoDoc="";		
		$scope.seguridadTipoDoc="";
		$scope.clasificacionTipoDoc="";		
		$scope.tipoDocumentos.push(response);		
		bootbox.alert("Tipo Creado");
	});
};

$scope.editarTipoDoc=function(id){
		for(var i = 0; i<$scope.tipoDocumentos.length; i++) {
                if($scope.tipoDocumentos[i].id === id) {
                    $scope.nombreTipoDoc = $scope.tipoDocumentos[i].nombre;
                    $scope.seguridadTipoDoc = $scope.tipoDocumentos[i].seguridad;
                    $scope.clasificacionTipoDoc = $scope.tipoDocumentos[i].clasificacion;                    
                    $scope.actualizaTipoDoc(id);    
                }
         }     
	
};

$scope.actualizaTipoDoc=function(idTipoDoc){
	$('#Modal2').modal({backdrop:false}).one('click', '#confirm2', function(){

		var objeto={
		"nombre": $scope.nombreTipoDoc,
		"seguridad": $scope.seguridadTipoDoc,
		"clasificacion": $scope.clasificacionTipoDoc
	};

	$http.put("webservice/TipoDocumento/update/"+idTipoDoc, objeto).success(function(response){
		$scope.nombreTipoDoc="";
		$scope.seguridadTipoDoc="";
		$scope.clasificacionTipoDoc="";		
		$http.get("webservice/TipoDocumento").success(function(response){$scope.tipoDocumentos=response;});
	});

	});
	
};

 $scope.eliminaTipoDoc = function(id) {
          $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () {

            $http.get("webservice/TipoDocumento/destroy/"+id).success(function(){
                    for(var i = 0; i<$scope.tipoDocumentos.length; i++) {           
                        if($scope.tipoDocumentos[i].id === id) {
                            $scope.$apply($scope.tipoDocumentos.splice(i, 1));
                        }
                    }  
            });
        });
     };


//----------------------------------------------------TERMINA CONFIG TIPO DOC -----------------------------------------------------//

$scope.checkOption=function(){//indica el nombre de la plantilla a subir y habilita el boton
	if($scope.selectPlantilla==="Giras"){
		$scope.nombreArchivo=1;//"PLANTILLA_GIRAS.docx";
		$scope.btnFile=true;
	}
	else if($scope.selectPlantilla==="Vacaciones"){
		$scope.nombreArchivo=2;//"PLANTILLA_VACACIONES.docx";
		$scope.btnFile=true;
	}
	else if($scope.selectPlantilla==="Permisos"){
		$scope.nombreArchivo=3;//"PLANTILLA_VACACIONES.docx";
		$scope.btnFile=true;
	}
};

 $scope.cargarArchivo=function(nombre){//confirma la carga del archivo
 	$scope.btnFile=false;
 	$scope.selectPlantilla=false;
 	if(nombre===1){
 		nombre="PLANTILLA_GIRAS.docx";
 	}
 	else if(nombre===2){
 		nombre="PLANTILLA_VACACIONES.docx";
 	} 
 	else if(nombre===3){
 		nombre="PLANTILLA_PERMISOS.docx";
 	}
 	bootbox.alert("subida del archivo"+" "+nombre+" "+"exitoso");
 	//alert("subida del archivo"+" "+nombre+" "+"exitoso");

 };

//EMPIEZA CODIGO NECESARIO PARA QUE FUNCIONE EL UPLOADER
    //-------------------------------------------------------------------------------------------------------------------------------------//

    $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
    
    $scope.$watch('files', function(files) {   //metodo atento a la carga de archivos para la modificacion de plantillas     
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function(file) {
                    uploadUsingUpload(file);
                })(files[i]);
            }
        }
    });
    

    function uploadUsingUpload(file) {//carga de plantilla al servidor
        $scope.errorMsg = null;
       	var miUrl;
       	if($scope.nombreArchivo===1){
       		miUrl='webservice/Solicitudes/uploadPlantillaGiras';
       	}
       	else if($scope.nombreArchivo===2){
       		miUrl='webservice/Solicitudes/uploadPlantillaVacaciones';
       	}
       	else if($scope.nombreArchivo===3){
       		miUrl='webservice/Solicitudes/uploadPlantillaPermisos';
       	}
        file.upload = Upload.upload({
                    url: miUrl,
                    method: 'POST',
                    file:file
                    
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
      
    $scope.onSuccessLoadFile = function(response){// llama al metodo cargaArchivo(para la base) una vez que la plantilla este en el servidor
           
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

var init = function () {
	if ( $scope.user != null ) {
            var roleLogged = $scope.user.role;
            
            $http.get("webservice/Role").success(function(response){
                    var roles = response;

                    for(var i = 0; i<roles.length; i++) {           
                        if(roles[i].nombre === roleLogged) {
                            
                            var seguridad=roles[i].seguridad;

                            if( seguridad != 'Alta'){  
                            	 window.location.replace("paginaPrincipal.html"); 
                            }
                            
                        }
                    }  


            });
        }
};
// and fire it after definition
init();

}).value('duScrollOffset', 30);
