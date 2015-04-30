
var app = angular.module("myAppCorrespondencia", ['ngRoute', 'ngTagsInput']); //tags aqui

	app.controller("CorrespondenciaController", function($scope, $http, $timeout, $location, $window, $upload, $document, $route) {

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

        $http.get("webservice/Correspondencia/bandejaDeEntrada")
        .success(function(response) {
            $scope.entradas = response;
            var c=0;
            for(var i=0; i<$scope.entradas.length; i++){
                if($scope.entradas[i].leido==false){
                    c=c+1;
                }
            }
            $scope.cant=c;
        });

        $http.get("webservice/Correspondencia/bandejaDeSalida")
            .success(function(response) {$scope.salidas = response;});
            
        $http.get("webservice/Correspondencia")
            .success(function(response) {$scope.correspondencia = response;});  
    }); 

           
        //autocompletar
    $scope.loadTags = function(query) {
        return $http.get("webservice/User");
    };
        //end autocompletar
        
	$scope.mensajeExitoSubidaDoc=false;
	$scope.mensajeFallidoSubidaDoc=false;
	
    
    var ruta="vacio";    
    var rutaAct;
    var refrescar=false;
	$scope.inbox = true;
	$scope.outbox = false;
    $scope.btnDoc = false;
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
            /*if(ruta="vacio"){
                objetoJSON = {
                    "emisor": $scope.user.username,            
                    "receptor": entry.username,
                    "asunto": $scope.asunto,
                    "mensaje": $scope.mensaje
                    //"idDocumento": $scope.idDocumento,  //hay que asignarla cuando se selecciona el tipo
                };
            } else {*/
                objetoJSON = {
                    "emisor": $scope.user.username,            
                    "receptor": entry.username,
                    "asunto": $scope.asunto,
                    "mensaje": $scope.mensaje,
                    "documento": ruta  //hay que asignarla cuando se selecciona el tipo
                };
            //}
            ruta="vacio";
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
        
        };//End crear mensaje con tags
        
        
	$scope.viewMailOut=function(id) {
		
			for(var i = 0; i<$scope.salidas.length; i++) {
                if($scope.salidas[i].id === id) {
                    $scope.emisor = $scope.salidas[i].emisor;
                    $scope.receptor = $scope.salidas[i].receptor;
                    $scope.asunto = $scope.salidas[i].asunto;
                    $scope.mensaje = $scope.salidas[i].mensaje;
                    $scope.fecha = $scope.salidas[i].fecha;
                    if($scope.entradas[i].documento=="vacio" || $scope.entradas[i].documento==null){
                        $scope.btnDoc=false;
                    } else {$scope.btnDoc=true;}
                    
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
                    if($scope.entradas[i].documento=="vacio"){
                        $scope.btnDoc=false;
                    } else {
                        $scope.btnDoc=true;
                        rutaAct=$scope.entradas[i].documento;
                    }
                    if($scope.entradas[i].leido==false){
                        objetoJSON = {
                            "emisor": $scope.entradas[i].emisor,            
                            "receptor": $scope.entradas[i].receptor,
                            "asunto": $scope.entradas[i].asunto,
                            "mensaje": $scope.entradas[i].mensaje,
                            "fecha": $scope.entradas[i].fecha,
                            "documento": $scope.entradas[i].documento,
                            "leido": true
                        };
                        $http.put("webservice/Correspondencia/update/"+id, objetoJSON);
                        refrescar=true;
                        
                    } else {refrescar=false;}
                }
            }
	}
    
    $scope.reloadRoute = function() {
        if(refrescar=true){
            $route.reload();
        }
    }
    
    $scope.abrirDoc = function(){
        var nom=rutaAct.split("docsCorrespondencia/");
        debugger;
        $window.open('http://gestofi.com/webservice/docsCorrespondencia/'+nom[1]);
    }
    
    
    $scope.responder=function(){
        var resp=$scope.emisor;
        $scope.asunto=resp;
        $location.path("/EnviarCorrespondencia"); 
        
        debugger;
        $scope.$apply(function(){
						$scope.asunto=resp;	
					});
        
    }
    
    
    $scope.eliminaMsjEntrada = function(id) {
          $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () {

          $http.get("webservice/Correspondencia/destroy/"+id).success(
                    function(){
                        
                    for(var i = 0; i<$scope.entradas.length; i++) {           
                        if($scope.entradas[i].id === id) {
                           $scope.$apply($scope.entradas.splice(i, 1));
                        }
                    }  
                   });
        });
     };
        
     $scope.eliminaMsjSalida = function(id) {
          $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () {

          $http.get("webservice/Correspondencia/destroy/"+id).success(
                    function(){
                    for(var i = 0; i<$scope.salidas.length; i++) {           
                        if($scope.salidas[i].id === id) {
                           $scope.$apply($scope.salidas.splice(i, 1));
                        }
                    }  
                   });
        });
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
                    url: 'webservice/Correspondencia/uploadDocCorrespondencia',
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
           
            ruta = response.files[0].fd;
            var nombre = response.files[0].filename;
            $scope.docu = nombre;
            //var nombreSliced = nombre.slice(0,-4);
            //var nombreHash = /[^\/]*$/.exec(ruta)[0];//para MAC
            //var nombreHash = /[^\\]*$/.exec(ruta)[0];//para WIN
            //$scope.cargarArchivo($scope.nombreArchivo);
        //alert("nombre: "+nombre+", ruta: "+ruta);
            
    };
    
    
    
});


