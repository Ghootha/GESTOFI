
var app = angular.module("AppDocumentos", ['ngRoute', 'ngFileUpload']);

app.controller("docController", function($scope, Upload, $http, $timeout, $location, $window) {

    $scope.$on('$viewContentLoaded', function () { // funcion utilizada para cargar este segmento de codigo solo cuando la vista sea accedida
        
        $http.get("webservice/Documento/findDocByRole")
            .success(function(response) {$scope.docs = response; }); //Filtra documentos por role, solo muestra los documentos uqe tienen una seguirdad que el role puede manejar

        $http.get("webservice/TipoDocumento/findTipoDocByRole") //SE usa para cargar el combobox de tipso de documentos, dependiendo del role no muestra tipos que no puede crear
            .success(function(response) {$scope.tiposDocumento = response;});

        $http.get("webservice/Role") //SE usa para cargar el combobox de tipso de documentos, dependiendo del role no muestra tipos que no puede crear
            .success(function(response) {$scope.roles = response;});
    });

  
    $scope.tabs = [  //tabas en lso que esta dividio el repositorio
      { link : '#home', label : 'Investigaciones' },
      { link : '#estudiante', label : 'Estudiantes'},
      { link : '#papeleria', label : 'Administrativos'},
      { link : '#correos', label : 'Correos'}
    ]; 


    //---------------------- Grupo de variables utilizadas para validar modals o para mostrar elementos--------------------//

    $scope.mensajeExitoSubidaDoc=false;
    $scope.mensajeFallidoSubidaDoc=false;
    $scope.mensajeErrorCodigo=false;
    $scope.error = false;
    $scope.incomplete = true;
    $scope.incomplete2 = true;
    $scope.botonSubir = false;
    $scope.dragable = false;
    $scope.codigofield = false;
    $scope.verDoc="";
    //-------------------------------------------------------------------------------------------------------------------//

    $scope.abrirDoc = function(id) { // Por medio del id que se recibe por parametro, se busca el documento, y luego se abre utilizando la ruta que posee entre sus atributos(modelo en la base)
        for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    var ruta= $scope.docs[i].ruta;
                    $window.open('gestofi.com/webservice/documents/'+ruta); 
                }
         }  
    };

     $scope.incomplete = false;
    
     $scope.editDoc = function(id) { //busca el documento, y llena los datos del modal. Para luego llamar al metodo $scope.actualizaDoc(id); que se encarga de actualizar la info del doc
    
         for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    $scope.fecha = $scope.docs[i].fecha;
                    $scope.nombre = $scope.docs[i].nombre;
                    $scope.codigo = $scope.docs[i].codigo;
                    $scope.getObjetoRole($scope.docs[i].Role);
                    $scope.getObjetoTipo($scope.docs[i].tipo);                                       
                    $scope.actualizaDoc(id);    //metodo que actualiza informacion del documento
                }
         }     
     };

     $scope.getObjetoRole = function(nombreRole) { //obtiene el objeto del role, por medio del ligado al doc. 
         
         for(var i = 0; i<$scope.roles.length; i++) {
                if($scope.roles[i].nombre === nombreRole) {                    
                    $scope.Role= $scope.roles[i];                       
                }
         }     
     };

     $scope.getObjetoTipo = function(nombreTipo) { //obtiene el objeto del tipo. Al ser este un objeto con varios atributos es mejor utilizar el objeto y no cada string pro separado
         
         for(var i = 0; i<$scope.tiposDocumento.length; i++) {
                if($scope.tiposDocumento[i].nombre === nombreTipo) {                    
                    $scope.tipo= $scope.tiposDocumento[i];                       
                }
         }     
     };

    
     $scope.actVersionDoc = function(id) {  // repliega modal de actualizar version del doc, y guarda su aid en una variable en el scope
        $scope.idDoctoUpdate=id;        
        $('#Modal2').modal({backdrop:false});        
    };


    $scope.actualizaDoc = function(id) {  // el modal es levantado por medio de jquery, luego se busca el documento
     $('#Modal').modal({ backdrop: false})
        .one('click', '#confirm', function () {       
        var objetoJSON;
        for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    objetoJSON = {      //la informacion de este objeto se crea con las variables que anteriormente fueron cargadas por el metodo  $scope.editDoc
                        "nombre": $scope.nombre,            
                        "Role": $scope.Role.nombre,
                        "tipo": $scope.tipo.nombre,
                        "seguridad": $scope.tipo.seguridad,
                        "codigo": $scope.codigo,
                        "clasificacion" : $scope.tipo.clasificacion
                    };
                    
                    $http.put("webservice/Documento/update/"+id, objetoJSON).success(
                     
                            function(){
                                $http.get("webservice/Documento/findDocByRole") //recarga los docs del scope, para visualizar los cambios
                                    .success(function(response) {$scope.docs = response;});
                     });                    
                }
            }
        }); 
        
    };

     $scope.eliminaDoc = function(id) { //Elimina un documento por medio de su id
          $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () {

          $http.get("webservice/Documento/destroy/"+id).success( //llamado REST al servidor para eliminar un objeto de un modelo
                    function(){
                    for(var i = 0; i<$scope.docs.length; i++) {  // elimina el documento en memoria, lo quita del scope.docs         
                        if($scope.docs[i].id === id) {
                           $scope.$apply($scope.docs.splice(i, 1));
                        }
                    }  
                   });
        });
     };


     $scope.SubirDoc = function(dir, filename){   // crea un documento nuevo en la base de datos, este metodo recive la direccion en el servidor y el nombre del nuevo doc           
            
                
                $http.get("webservice/get_user").success(function(response){ //se obtiene el usuario conectado en el sistema por medio de esta consulta al servidor
                    $scope.user= response.user; 
                                
                var objetoJSON;    
                       
                objetoJSON = { //atributos necesarios para la creacion de un Documento
                    "nombre": filename,            
                    "Role": $scope.user.role,
                    "tipo": $scope.auxTipo.nombre,
                    "clasificacion": $scope.auxTipo.clasificacion,
                    "seguridad": $scope.auxTipo.seguridad,  
                    "duenno" : $scope.user.username,
                    "ruta" : dir, 
                    "codigo": $scope.auxCodigo
                };
                
                $http.put("webservice/Documento/create", objetoJSON).success(function(response){
                        $timeout(function(){//uego de ser creado se limpian las variables de la vista y se muestra un msj de exito/informativo
                            $scope.codigo="";
                            $scope.tipo=null;
                            $scope.mensajeExitoSubidaDoc=true;
                        });                        
                 }).error(function(response, status, header, config){  //si algo no sucede como se espera, este metodo se encarga de mostrar al usario que algo sucedio
                        $timeout(function(){
                            $scope.codigo="";
                            $scope.tipo="";
                            $scope.mensajeFallidoSubidaDoc=true; 
                        });                          
                 });
            
        }); 
    };

    //EMPIEZA CODIGO NECESARIO PARA QUE FUNCIONE EL UPLOADER
    //-------------------------------------------------------------------------------------------------------------------------------------//

    $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
    
    $scope.$watch('files', function(files) {        //se encarga de subir los documentos fisicos cuando sea seleccionados por el usuario
        if (files != null) {
            $scope.auxCodigo=$scope.codigo; //guarda el codigo  en un auxiliar para luego ser utilizado cuando se crea el documento logico(es necesario en subidas multiples)
            $scope.auxTipo=$scope.tipo;     //guarda el tipoo  en un auxiliar para luego ser utilizado cuando se crea el documento logico
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function(file) {
                    uploadUsingUpload(file); //realiza la interaccion necesaria con el servidor para subir el documento
                })(files[i]);
            }
        }
    });
    
    
    $scope.generateThumb = function(file) { // si son imagenes lo uqe se esta subiendo, crea una vista previa de la imagen(Thumb)
        if (file != null) {
            if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                $timeout(function() {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function(e) {
                        $timeout(function() {
                            file.dataUrl = e.target.result;
                        });
                    }
                });
            }
        }
    }

    function uploadUsingUpload(file) { // envia el documento al servidor
        $scope.errorMsg = null;         //variable que se utiliza para almacenar el error si sucede
        $scope.generateThumb(file);     //crea vista previa si es una imagen
        file.upload = Upload.upload({   // Rquest al servidor para subir el documento
                    url: 'webservice/file/upload',
                    method: 'POST',
                    file: file
                });

        file.upload.then(function(response) { //si el documento se subio con exito entonces se ejecuta este metodo
            $timeout(function() {
               file.result = response.data; //se almacena el response del servidor cuando se subio el doc
               $scope.onSuccessLoadFile(file.result); //cuando la subida del documento fue totalmente exitosa se ejecuta este metodo y se le envia la info que devolvio el server
            });
        }, function(response) { //muestra error si sucede
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function(evt) { //muestra el avance de la subida
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
      
    $scope.onSuccessLoadFile = function(response){ // se encarga de prepara cierta informacion necesaria para el documento logico y luego llama al metodo que se encarga de subirlo a la base
            var ruta = response.files[0].fd; //ruta del documento, con el nombre hash del doc
            var nombre = response.files[0].filename; // nombre del documento pero posee extension .png/.pdf etc

            var nombreSliced = nombre.slice(0,-4); //al nombre anterior se le elimina la extension para solo guardar el nombre
            //var nombreHash = /[^\/]*$/.exec(ruta)[0];
            var nombreHash = /[^\\]*$/.exec(ruta)[0]; // se utiliza para obtener solamente el nombre del documento y su extension. Pero esta vez es el nombre ya hasheado que le otorgo el server

            $scope.SubirDoc(nombreHash, nombreSliced); //crea el documento en base
            
    };


    //EMPIEZA CODIGO NECESARIO PARA QUE FUNCIONE EL UPDATER (MISMA LOGICA QUE EL CODIGO DE SUBIDA)
    //-------------------------------------------------------------------------------------------------------------------------------------//

    $scope.$watch('filesUpdate', function(files) {        
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function(file) {
                    upload2UsingUpload(file);
                })(files[i]);
            }
        }
    });
     

    function upload2UsingUpload(file) { // misma logica que el metodo anterior para subir un documento
        $scope.errorMsg = null;
        $scope.generateThumb(file);

        file.upload = Upload.upload({
                    url: 'webservice/file/update/'+ $scope.idDoctoUpdate, //unica diferencia es que esta vez se le pasa el id del documento a remplazar
                    method: 'POST',
                    file: file
                });

        file.upload.then(function(response) {
            $timeout(function() {
               file.result = response.data;
               $scope.mensajeExitoSubidaDoc=true;  
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

//-------------------------------------------------------------VALIDACIONES----------------------------------------------//
    $scope.$watch('nombre',function() {$scope.test();});
    $scope.$watch('codigo', function() {$scope.test();});    
    $scope.$watch('Role', function() {$scope.test();});    
    $scope.$watch('tipo', function() {$scope.test();});    

    $scope.test = function() { 

        if ($scope.nombre == null || $scope.nombre == "") {
            $scope.incomplete = true;
        }else{ $scope.incomplete = false; }
    };



$scope.$watch('tipo',function() {$scope.test2();}); //cuando tipo cambia, se llama el metodo test2()
   

    $scope.test2 = function() {       //validacion en subida de documento, si no se ha seleccionado un tipo de documento no deja subir ningun documento
        $scope.incomplete2 = false;
        $scope.botonSubir = true;
        $scope.dragable=true;
        $scope.codigofield=true;
        if ( $scope.tipo == null ) {
            $scope.incomplete2 = true;
            $scope.botonSubir = false;
            $scope.dragable=false;
            $scope.codigofield=false;
        }
    };

$scope.$watch('codigo',function() {$scope.test3();}); //Cada vez que hay un cambio en "codigo" se llama al metodo test3()
   

    $scope.test3 = function() {  //se encarga de verificar si el codigo que esta siendo ingresado ya esta siendo usado por otro documento ya subido en la base
        if($scope.codigo != null && $scope.codigo != "" ){
            $scope.incomplete2 = true;
            $scope.dragable = false;

            var objetoJSON={
                "where":{
                    "codigo":$scope.codigo
                }
            };

            $http.post("webservice/Documento/find", objetoJSON).success(function(response) { //busca si existe un documento con el codigo ingresado
                if(response.length != 0){
                    $scope.mensajeErrorCodigo=true; 
                    $scope.botonSubir = false;                                       
                }else{
                    $scope.mensajeErrorCodigo=false;
                    $scope.botonSubir = true; 
                }

            });
        }
        if($scope.codigo == "" && $scope.tipo != null){
            $scope.incomplete2 = false;
            $scope.dragable = true;
        }

    };


});