
var app = angular.module("myAppDocs", []);

app.controller("docController", function($scope, $http, $window) {


    $http.get("webservice/Documento")
        .success(function(response) {$scope.docs = response;});


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
                        "seguridad": $scope.seguridad
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
        debugger;  
     $('#Modal4').modal({ backdrop: false})
        .one('click', '#confirm', function () {       
        
            var objetoJSON;    
                   
            objetoJSON = {
                "nombre": "tes5",            
                "Role": "Director",
                "tipo": "asdasd",
                "clasificacion": "Correo",
                "fecha": "1//14/2014",
                "codigo": "asdasd"
            };
            
            $http.put("webservice/Documento/create", objetoJSON).success(
             
                    function(){
                        $http.get("webservice/Documento")
                            .success(function(response) {$scope.docs = response;});
             });                    
               
           
        }); 
        
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

