
var app = angular.module("AppCorrespondencia", ['ngRoute', 'ngTagsInput', 'ngFileUpload']); //tags aqui

app.controller("CorrespondenciaController", function($scope, $http, $timeout, $location, $window, Upload, $document, $route, MyService) {

    $scope.$on('$viewContentLoaded', function () {

        $http.get("webservice/get_user").success(function(response){    // funcion utilizada para cargar este segmento de codigo solo cuando la vista sea accedida
            if(response.user == null){
                window.location.replace("index.html");                   //si no hay usuario logeado lo manda al index
            }else{
                $scope.user= response.user;
                var roleLogged = response.user.role;

                $http.get("webservice/Role").success(function(response){        //valida si el usuario puede ver esta pagina
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

        $http.get("webservice/Correspondencia/bandejaDeEntrada")        //Se trae los json de correspondencia que el destinatario sea igual al usuario
            .success(function(response) {
                $scope.entradas = response;
                var c=0;
                for(var i=0; i<$scope.entradas.length; i++){                //se hace un conteo de los mensajes no leidos para mostrarlo en la barra de notificaciones
                    if($scope.entradas[i].leido==false){
                        c=c+1;
                    }
                }
                $scope.cant=c;
            });

        $http.get("webservice/Correspondencia/bandejaDeSalida")     //Se trae los json de correspondencia que el destinatario sea igual al usuario
            .success(function(response) {$scope.salidas = response;});

        $http.get("webservice/Correspondencia")
            .success(function(response) {$scope.correspondencia = response;});
    });

    if(MyService.data.nombre!=null){                               //ve si proviene de una respuesta y si es asi llena los campos
        $scope.tags = [MyService.data.nombre];
    } else {
        $scope.tags=[];
    }
    $scope.mensaje = MyService.data.mens;
    $scope.asunto = MyService.data.asun;
    MyService.data.nombre=null;
    MyService.data.mens="";
    MyService.data.asun="";
    //autocompletar
    $scope.loadTags = function(query) {                             // llena los tags de correspondencia con la lista de usuarios
        return $http.get("webservice/User");
    };
    //end autocompletar




    var ruta="vacio";               //variable del documento para guardar la ruta del documento adjunto
    var rutaAct;
    var refrescar=false;            //variable por si en un futuro se quiere refrescar
    $scope.inbox = true;            //por default se muestraa la bandeja de entrada se trabaja con ng-shows
    $scope.outbox = false;
    $scope.btnDoc = false;          //por default el boton de descargar documento no se ve
    $scope.finbox = function() {    //cambiar vistas de bandeja Entrada y Salida
        $scope.inbox = true;
        $scope.outbox = false;
    };
    $scope.foutbox = function() {
        $scope.inbox = false;
        $scope.outbox = true;
    };

//	$scope.$watch('nombre',function() {$scope.test();});
//	$scope.$watch('asunto',function() {$scope.test();});
//	$scope.$watch('fecha', function() {$scope.test();});
//
//	 $scope.test = function() {
//		if ($scope.edit && (!$scope.nombre.length || !$scope.asunto.length ||
//			!$scope.fecha.length)) {
//			$scope.incomplete = true;
//		}else{ $scope.incomplete = false; }
//	};


    //crear mensaje
    $scope.crearMensaje=function() {
        debugger;
        if($scope.tags.length!=0) {               //ve  que por lo menos haya un destinatario
            var objetoJSON;
            var destinos = $scope.tags;
            var msjExito = "Mensaje Enviado Exitosamente";
            var msjFallo = "Mensaje No Enviado a: ";
            destinos.forEach(function (entry) {           //por cada usuario manda un mensaje
                objetoJSON = {                            //crea un objeto json
                    "emisor": $scope.user.username,
                    "receptor": entry.username,
                    "asunto": $scope.asunto,
                    "mensaje": $scope.mensaje,
                    "documento": ruta,  //
                    "destinatario": entry.username,
                    "emisor2": $scope.user.username
                };
                $http.put("webservice/Correspondencia/create", objetoJSON).success(function (response) { //crea el mensaje a travez del webservice

                    msjExito=msjExito+" , "+objetoJSON.receptor;

                }).error(function (response, status, header, config) {
                    $timeout(function () {

                        msjFallo.concat(objetoJSON.receptor + " ");

                    });
                });
            });
            bootbox.alert(msjExito);                          //manda msj exito
            $scope.tags = [];                                 //limpia campos
            $scope.asunto = "";
            $scope.mensaje = "";
            $scope.docu = "";
            ruta = "vacio";
        } else {
            alert("Mensaje No Enviado: Campo Destinatarios Vacios");
        }
    };//End crear mensaje

    $scope.viewMailOut=function(id) {                   //llena los campos para ver la informacion de un mensaje enviado
        for(var i = 0; i<$scope.salidas.length; i++) {
            if($scope.salidas[i].id === id) {
                $scope.emisor2 = $scope.salidas[i].emisor2;
                $scope.destinatario = $scope.salidas[i].destinatario;
                $scope.asunto = $scope.salidas[i].asunto;
                $scope.mensaje = $scope.salidas[i].mensaje;
                $scope.fecha = $scope.salidas[i].fecha;
                if($scope.salidas[i].documento=="vacio" || $scope.salidas[i].documento==null){  //se fija si hay documento para mostrar el boton de descargar
                    $scope.btnDoc=false;
                } else {$scope.btnDoc=true;}
            }
        }
    }
    $scope.viewMailIn=function(id) {                    //llena los campos para ver la informacion de un mensaje recibido

        for(var i = 0; i<$scope.entradas.length; i++) {
            if($scope.entradas[i].id === id) {
                $scope.emisor2 = $scope.entradas[i].emisor2;
                $scope.destinatario = $scope.entradas[i].destinatario;
                $scope.asunto = $scope.entradas[i].asunto;
                $scope.mensaje = $scope.entradas[i].mensaje;
                $scope.fecha = $scope.entradas[i].fecha;
                if($scope.entradas[i].documento=="vacio"){   //se fija si hay documento para mostrar el boton de descargar
                    $scope.btnDoc=false;
                } else {
                    $scope.btnDoc=true;
                    rutaAct=$scope.entradas[i].documento;
                }
                if($scope.entradas[i].leido==false){
                    $http.put("webservice/Correspondencia/update/"+id+"?leido=true").success(); //marca el mensaje como leido
                    refrescar=true;
                } else {refrescar=false;}
            }
        }
    }

    $scope.reloadRoute = function() { //metodo para refrescar el route
        if(refrescar=true){
            $route.reload();
        }
    }

    $scope.abrirDoc = function(){
        var nom=rutaAct.split("docsCorrespondencia\\"); //corta la ruta del documento para meterla en el link
        $window.open('http://gestofi.com/webservice/docsCorrespondencia/'+nom[1]);//abre el documento segun la ruta
    }


    $scope.responder=function(){
        var resp=$scope.emisor2;                                            //asigna las variables para responder
        var men="\n \n------------- MENSAJE ANTERIOR---------------- \n";
        men=men+$scope.mensaje;
        var asu="RE: ";
        asu=asu+$scope.asunto;
        MyService.data.nombre=resp;                     //lo guarda en el my service para pasar la variables a otra pagina
        MyService.data.mens=men;
        MyService.data.asun=asu;
        $location.url("/EnviarCorrespondencia");            //abre la otra paginna

    }


    $scope.eliminaMsjEntrada = function(id) {
        $('#Modal3').modal({ backdrop: false})              //espera confirmacion para eliminar
            .one('click', '#confirm', function () {
                var vacio="";
                $http.put("webservice/Correspondencia/update/"+id+"?receptor="+vacio).success(      //solo lo quita de la vista de el receptor no lo borra del todo
                    function(){
                        //$route.reload();
                        for(var i = 0; i<$scope.entradas.length; i++) {
                            if($scope.entradas[i].id === id) {
                                $scope.$apply($scope.entradas.splice(i, 1));
                            }
                        }
                    });
            });
    };

    $scope.eliminaMsjSalida = function(id) {                 //espera confirmacion para eliminar
        $('#Modal3').modal({ backdrop: false})
            .one('click', '#confirm', function () {
                var vacio="";
                $http.put("webservice/Correspondencia/update/"+id+"?emisor="+vacio).success(  //solo lo quita de la vista de el receptor no lo borra del todo
                    function(){
                        //$route.reload();
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

    $scope.$watch('files', function(files) {    //se encarga de subir los documentos fisicos cuando sea seleccionados por el usuario
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function(file) {
                    uploadUsingUpload(file);   //realiza la interaccion necesaria con el servidor para subir el documento
                })(files[i]);
            }
        }
    });


    function uploadUsingUpload(file) {
        $scope.errorMsg = null;
        file.upload = Upload.upload({
            url: 'webservice/Correspondencia/uploadDocCorrespondencia',
            method: 'POST',
            file: file
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

    };



});
