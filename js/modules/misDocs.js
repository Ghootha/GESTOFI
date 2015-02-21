
var app = angular.module("myAppDocs", ['ngRoute', 'angularFileUpload']);

app.controller("docController", function($scope, $upload, $http, $timeout, $location, $window) {


    $http.get("webservice/findDocByRole")
        .success(function(response) {$scope.docs = response;}); //Filtra documentos por role, solo muestra los documentos uqe tienen una seguirdad que el role puede manejar

    $http.get("webservice/findTipoDocByRole") //SE usa para cargar el combobox de tipso de documentos, dependiendo del role no muestra tipos que no puede crear
        .success(function(response) {$scope.tiposDocumento = response;});


    $http.get("webservice/get_user").success(function(response){
            $scope.user= response.user;
            $scope.userLogged=  $scope.user.fullname;            
            }).error(function(response, status, header, config){  
                if(response.status == 300){ //estatus de error para usuario en uso
                    $scope.mensajeErrorRegistro=true;
                }   
            });
     

    $scope.mensajeExitoSubidaDoc=false;
    $scope.mensajeFallidoSubidaDoc=false;
    $scope.error = false;
    $scope.incomplete = true;
    $scope.incomplete2 = true;
    $scope.botonSubir = false;

     $scope.abrirDoc = function(id) {
        for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    var ruta= $scope.docs[i].ruta;
                    $window.open('http://gestofi.com/'+ruta);
                }
         }  
     };

     $scope.incomplete = false;
    
     $scope.editDoc = function(id) { 
         $scope.edit = true;
         for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    $scope.fecha = $scope.docs[i].fecha;
                    $scope.nombre = $scope.docs[i].nombre;
                    $scope.codigo = $scope.docs[i].codigo;
                    $scope.Role = $scope.docs[i].Role;
                    $scope.seguridad = $scope.docs[i].seguridad;     
                    $scope.tipo = $scope.docs[i].tipo; 
                    $scope.clasificacion = $scope.docs[i].clasificacion; 
                    $scope.actualizaDoc(id);    
                }
         }     
     };

     $scope.actualizaDoc = function(id) {  
     $('#Modal').modal({ backdrop: false})
        .one('click', '#confirm', function () {       
        var objetoJSON;
        for(var i = 0; i<$scope.docs.length; i++) {
                if($scope.docs[i].id === id) {
                    objetoJSON = {
                        "nombre": $scope.nombre,            
                        "Role": $scope.Role,
                        "tipo": $scope.tipo,
                        "seguridad": $scope.seguridad,
                        "clasificacion" : $scope.clasificacion
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
       // debugger;  
         /*$('#ModalSubir').modal({ backdrop: false})
            .one('click', '#confirmSubir', function () {  */          
            
                $scope.getClasificacionDoc();
                $scope.getSeguridadDoc();
            
                var objetoJSON;    
                       
                objetoJSON = {
                    "nombre": filename,            
                    "Role": $scope.user.role,
                    "tipo": $scope.tipo.nombre,
                    "clasificacion": $scope.clasificacion,
                    "seguridad": $scope.seguridad,  //hay que asignarla cuando se selecciona el tipo
                    "duenno" : $scope.user.username,
                    "ruta" : dir, 
                    "codigo": $scope.codigo
                };
                
                $http.put("webservice/Documento/create", objetoJSON).success(function(response){
                        $timeout(function(){
                            $scope.mensajeExitoSubidaDoc=true;
                        });                        
                 }).error(function(response, status, header, config){  
                        $timeout(function(){
                            $scope.mensajeFallidoSubidaDoc=true; 
                        });                          
                 });
            
        //});
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

    function uploadUsing$upload(file) {
        $scope.errorMsg = null;
        $scope.generateThumb(file);     
        file.upload = $upload.upload({
                    url: 'webservice/file/upload',
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
    

    /*$scope.onFileSelect = function($files) {   
   //var file = $files[];             
                $scope.upload = $upload.upload({
                    url: 'webservice/file/upload',
                    data: {title: 'prueba', documento: $files[0]},                   
                    file: $files
                }).progress( this.progress)
                .success(this.onSuccessLoadFile)
                .error(function(argResponse){
                    $scope.mensajeFallidoSubidaDoc=true;
                });
                //.then(success, error, progress);
    };*/
  
    $scope.onSuccessLoadFile = function(response){
            var ruta = response.files[0].fd;
            var nombre = response.files[0].filename;

            var rutaSliced = "documentos/"+ruta.slice(40); 
            var nombreSliced = nombre.slice(0,-4);

           $scope.SubirDoc(rutaSliced , nombreSliced);
            
        };

   /* $scope.progress = function(evt){
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
    };*/


    $scope.getClasificacionDoc = function(){         

            var tipo = $scope.tipo.nombre;

            if(tipo== 'Formulacion De Proyecto' || tipo== 'Investigación' ){
                $scope.clasificacion='Investigacion';
            }
            if (tipo== 'Malla Curricular' || tipo== 'Plan de Estudio' || tipo== 'Descriptores De Programas' ) {
                $scope.clasificacion='Estudiante ';
            }
            if (tipo== 'Oficios' || tipo== 'Constancias' || tipo== 'Memorandos' || tipo== 'Circulares' || tipo== 'Minutas Análisis de Oficios') {
                $scope.clasificacion='Papeleria';
            }
            if (tipo== 'Correos Electronicos') {
                $scope.clasificacion='Correo';
            }
    };

    $scope.getSeguridadDoc = function(){

            var tipo = $scope.tipo.nombre;

            if(tipo== 'Formulacion De Proyecto' || tipo== 'Investigación' || tipo== 'Minutas Análisis de Oficios' ){
                $scope.seguridad='Alta'
            }

            if (tipo== 'Oficios' || tipo== 'Constancias' || tipo== 'Memorandos' || tipo== 'Circulares') {
                $scope.seguridad='Media'
            }
            /*if (tipo== '') {  //especificaron seguridad, pero no le dan este grado a ningun documento
                $scope.seguridad='Baja' 
            }*/
            if (tipo== 'Malla Curricular' || tipo== 'Plan de Estudio' || tipo== 'Descriptores De Programas' || tipo== 'Correos Electronicos') {
                $scope.seguridad='Ninguna'
            }
    };

    $scope.$watch('fecha',function() {$scope.test();});
    $scope.$watch('nombre',function() {$scope.test();});
    $scope.$watch('codigo', function() {$scope.test();});    
    $scope.$watch('Role', function() {$scope.test();});
    $scope.$watch('seguridad', function() {$scope.test();});
    $scope.$watch('tipo', function() {$scope.test();});    

    $scope.test = function() {        
        if ($scope.edit && (!$scope.fecha.length || !$scope.nombre.length ||
            !$scope.codigo.length || !$scope.Role.length || !$scope.seguridad.length ||
            !$scope.tipo.length)) {
            $scope.incomplete = true;
        }else{ $scope.incomplete = false; }
    };



$scope.$watch('tipo',function() {$scope.test2();});
   

    $scope.test2 = function() {       
        $scope.incomplete2 = false;
        $scope.botonSubir = true;
        if ( $scope.tipo == null ) {
            $scope.incomplete2 = true;
            $scope.botonSubir = false;
        }
    };



});



/*$scope.SubirDocFisico = function(){
            var objeto_JSON;    
                       
            objeto_JSON = {
                "title": $scope.title,            
                "avatar": $scope.avatar
            };

            $http({  method: 'POST', url: 'webservice/file/upload', headers: {enctype:'multipart/form-data'}  }, objeto_JSON).success(function(response){
                alert("se subio doc: " + $scope.title +" " + $scope.avatar);

            }); 

    }*/