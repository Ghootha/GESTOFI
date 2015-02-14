
var app = angular.module("myAppDocs", ['ngRoute', 'angularFileUpload']);

app.controller("docController", function($scope, $upload, $http, $timeout, $window) {


    $http.get("webservice/findDocByRole")
        .success(function(response) {$scope.docs = response;});

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


     $scope.SubirDoc = function(){
       // debugger;  
         $('#ModalSubir').modal({ backdrop: false})
            .one('click', '#confirmSubir', function () {            
            
            
                var objetoJSON;    
                       
                objetoJSON = {
                    "nombre": "Doc de Prueba",            
                    "Role": $scope.Role,
                    "tipo": $scope.tipo,
                    "clasificacion": $scope.clasificacion,
                    "seguridad": $scope.seguridad,  //hay que asignarla cuando se selecciona el tipo
                    "duenno" : $scope.user.username,
                    "codigo": "asdasd"
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
            
        });
    };

    

    $scope.onFileSelect = function($files) {   
   //var file = $files[];             
                $scope.upload = $upload.upload({
                    url: 'webservice/file/upload',
                    data: {title: 'prueba', documento: $files[0]},                   
                    file: $files
                }).progress( this.progress)
                .success(this.onSuccessLoadFile)
                .error(function(argResponse){
                    ErrorManagerService.displayError(argResponse);
                });
                //.then(success, error, progress);
    };
  
    $scope.onSuccessLoadFile = function(argResponse, status, headers, config){
            //$location.path('/review/' + argResponse.content.id);
            alert("archivo subido con exito");
            //this.subirDoc;
        };

    $scope.progress = function(evt){
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
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