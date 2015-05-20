
var app = angular.module("myAppDocs", ['ngRoute', 'ngFileUpload']);

app.controller("docController", function($scope, Upload, $http, $timeout, $location, $window) {

    $scope.$on('$viewContentLoaded', function () {
        
        $http.get("webservice/Documento/findDocByRole")
            .success(function(response) {$scope.docs = response; }); //Filtra documentos por role, solo muestra los documentos uqe tienen una seguirdad que el role puede manejar

        $http.get("webservice/TipoDocumento/findTipoDocByRole") //SE usa para cargar el combobox de tipso de documentos, dependiendo del role no muestra tipos que no puede crear
            .success(function(response) {$scope.tiposDocumento = response;});

        $http.get("webservice/Role") //SE usa para cargar el combobox de tipso de documentos, dependiendo del role no muestra tipos que no puede crear
            .success(function(response) {$scope.roles = response;});
    });

  
    $scope.tabs = [  
      { link : '#home', label : 'Investigaciones' },
      { link : '#estudiante', label : 'Estudiantes'},
      { link : '#papeleria', label : 'Administrativos'},
      { link : '#correos', label : 'Correos'}
    ]; 



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


    $scope.abrirDoc = function(id) {
        for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    var ruta= $scope.docs[i].ruta;
                    $window.open('gestofi.com/webservice/documents/'+ruta); 
                }
         }  
    };

     $scope.incomplete = false;
    
     $scope.editDoc = function(id) {
    
         for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    $scope.fecha = $scope.docs[i].fecha;
                    $scope.nombre = $scope.docs[i].nombre;
                    $scope.codigo = $scope.docs[i].codigo;
                    $scope.getObjetoRole($scope.docs[i].Role);
                    $scope.getObjetoTipo($scope.docs[i].tipo);                                       
                    $scope.actualizaDoc(id);    
                }
         }     
     };

     $scope.getObjetoRole = function(nombreRole) { 
         
         for(var i = 0; i<$scope.roles.length; i++) {
                if($scope.roles[i].nombre === nombreRole) {                    
                    $scope.Role= $scope.roles[i];                       
                }
         }     
     };

     $scope.getObjetoTipo = function(nombreTipo) { 
         
         for(var i = 0; i<$scope.tiposDocumento.length; i++) {
                if($scope.tiposDocumento[i].nombre === nombreTipo) {                    
                    $scope.tipo= $scope.tiposDocumento[i];                       
                }
         }     
     };

    
     $scope.actVersionDoc = function(id) {  
        $scope.idDoctoUpdate=id;        
        $('#Modal2').modal({backdrop:false});        
    };


    $scope.actualizaDoc = function(id) {  
     $('#Modal').modal({ backdrop: false})
        .one('click', '#confirm', function () {       
        var objetoJSON;
        for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    objetoJSON = {
                        "nombre": $scope.nombre,            
                        "Role": $scope.Role.nombre,
                        "tipo": $scope.tipo.nombre,
                        "seguridad": $scope.tipo.seguridad,
                        "codigo": $scope.codigo,
                        "clasificacion" : $scope.tipo.clasificacion
                    };
                    //alert("llamdo al server put: nombre "+$scope.nombre +"Role"+$scope.Role+" tipo "+$scope.tipo+"seguridad "+$scope.seguridad);
                    $http.put("webservice/Documento/update/"+id, objetoJSON).success(
                     
                            function(){
                                $http.get("webservice/Documento")
                                    .success(function(response) {$scope.docs = response;});
                     });                    
                }
            }
        }); 
        
    };

     $scope.eliminaDoc = function(id) {
          $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () {

          $http.get("webservice/Documento/destroy/"+id).success(
                    function(){
                    for(var i = 0; i<$scope.docs.length; i++) {           
                        if($scope.docs[i].id === id) {
                           $scope.$apply($scope.docs.splice(i, 1));
                        }
                    }  
                   });
        });
     };


     $scope.SubirDoc = function(dir, filename){              
            
                //$scope.getClasificacionDoc();
                //$scope.getSeguridadDoc();
                
                $http.get("webservice/get_user").success(function(response){
                    $scope.user= response.user;  

                $scope.clasificacion=$scope.tipo.clasificacion;

                var objetoJSON;    
                       
                objetoJSON = {
                    "nombre": filename,            
                    "Role": $scope.user.role,
                    "tipo": $scope.tipo.nombre,
                    "clasificacion": $scope.clasificacion,
                    "seguridad": $scope.tipo.seguridad,  
                    "duenno" : $scope.user.username,
                    "ruta" : dir, 
                    "codigo": $scope.codigo
                };
                
                $http.put("webservice/Documento/create", objetoJSON).success(function(response){
                        $timeout(function(){
                            $scope.codigo="";
                            $scope.tipo="";
                            $scope.mensajeExitoSubidaDoc=true;
                        });                        
                 }).error(function(response, status, header, config){  
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
    
    $scope.$watch('files', function(files) {        
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function(file) {
                    uploadUsingUpload(file);
                })(files[i]);
            }
        }
    });
    
    
    $scope.generateThumb = function(file) {
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

    function uploadUsingUpload(file) {
        $scope.errorMsg = null;
        $scope.generateThumb(file);     
        file.upload = Upload.upload({
                    url: 'webservice/file/upload',
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
            var ruta = response.files[0].fd;
            var nombre = response.files[0].filename;

            var nombreSliced = nombre.slice(0,-4);
            //var nombreHash = /[^\/]*$/.exec(ruta)[0];
            var nombreHash = /[^\\]*$/.exec(ruta)[0];

            $scope.SubirDoc(nombreHash, nombreSliced);
            
    };


    //EMPIEZA CODIGO NECESARIO PARA QUE FUNCIONE EL UPDATER
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
     

    function upload2UsingUpload(file) {
        $scope.errorMsg = null;
        $scope.generateThumb(file);

        file.upload = Upload.upload({
                    url: 'webservice/file/update/'+ $scope.idDoctoUpdate,
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



    //$scope.$watch('fecha',function() {$scope.test();});
    $scope.$watch('nombre',function() {$scope.test();});
    $scope.$watch('codigo', function() {$scope.test();});    
    $scope.$watch('Role', function() {$scope.test();});
    //$scope.$watch('seguridad', function() {$scope.test();});
    $scope.$watch('tipo', function() {$scope.test();});    

    $scope.test = function() { 

        if ($scope.nombre == null || $scope.nombre == "") {
            $scope.incomplete = true;
        }else{ $scope.incomplete = false; }
    };



$scope.$watch('tipo',function() {$scope.test2();});
   

    $scope.test2 = function() {       
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

$scope.$watch('codigo',function() {$scope.test3();});
   

    $scope.test3 = function() {  
        if($scope.codigo != null && $scope.codigo != "" ){
            $scope.incomplete2 = true;
            $scope.dragable = false;

            var objetoJSON={
                "where":{
                    "codigo":$scope.codigo
                }
            };

            $http.post("webservice/Documento/find", objetoJSON).success(function(response) {
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