var app = angular.module("AppPerfil", ['ngFileUpload']);

app.controller("perfilController", function($scope, $http, Upload, $timeout,$interval) {

   $scope.tabs = [  
      { link : '#home2', label : 'Perfil' },
      { link : '#profile', label : 'Contraseña'},
      
    ]; 
$scope.user;
 
$scope.$on('$viewContentLoaded', function () {
    $http.get("webservice/get_user").success(function(response){
                if(response.user == null){
                   window.location.replace("index.html"); 
                }else{
                 	//carga de los datos del usuario
                    $scope.user= response.user;
                    $scope.modalNombre=$scope.user.fullname;
                    $scope.modalFecha=$scope.user.birthdate;
                    $scope.modalDomicilio=$scope.user.address;
                    $scope.modalEmail=$scope.user.email;
                    $scope.modalPhone=$scope.user.phone;
                    	
                    	if($scope.user.photo !== null){// si el usuario ya tiene una foto registrada se muestra sino se muestra a imagen por defecto
                    		$scope.userPhoto= "http://gestofi.com/webservice/fotoPerfil/"+$scope.user.photo;
                    	}
                    	else
                    		$scope.userPhoto= "http://gestofi.com/webservice/fotoPerfil/default-user-image.png" ;

                }
    }).error(function(response, status, header, config){  
            console.log("error en obtencion de usuario conectado");  
    });
});

$scope.modificarPerfil =function(){// metodo encargado de la modificacion del usuario con los datos registrados en el modal de actulizacion 
   
	var objeto={
		"fullname": $scope.modalNombre,
		"birthdate": $scope.modalFecha,
		"address": $scope.modalDomicilio,
		"email": $scope.modalEmail,
		"phone": $scope.modalPhone
	};

	$http.put("webservice/User/update/"+ $scope.user.id ,objeto).success(function(){
		
        $scope.user.fullname= objeto.fullname; 
		$scope.user.birthdate= objeto.birthdate;
		$scope.user.address= objeto.address;
		$scope.user.email= objeto.email;
		$scope.user.phone= objeto.phone;
        $scope.modalNombre=$scope.user.fullname;
        $scope.modalFecha=$scope.user.birthdate;
        $scope.modalDomicilio=$scope.user.address;
        $scope.modalEmail=$scope.user.email;
        $scope.modalPhone=$scope.user.phone;
		

	});
    

};

$scope.switchDate=function(fecha){//metodo que cambio la fecha en el select 
    if(typeof fecha === "undefined"){
        return "";
    }
    else{
    var i=fecha.split("-");
    i=i[1]+"-"+i[0]+"-"+i[2];
    return i;}
};

$scope.editarModal=function(){// metodo actuliza  los datos del modal
       $('#modalFecha').combodate({value:$scope.modalFecha});  
        $('#Modal2').modal({backdrop:false}).one('click', '#confirm', function(){
            $scope.modalFecha=$scope.user.birthdate;
            $scope.modalDomicilio=$scope.user.address;
            $scope.modalEmail=$scope.user.email;
            $scope.modalPhone=$scope.user.phone;
        
        });
    
};


$scope.setContrasena=function(){// metodo encargado de modificacion de contraseña en la base 
	
    if($scope.passNew === $scope.passNewConf && $scope.passNew!= "" && $scope.passNew.length >= 8){
            $http.post("webservice/User/"+$scope.user.id).success(function(response){
                var Passport= response.passports[0].id;
                var objeto;
                objeto={
                    "password": $scope.passNew
                 };
                $http.post("webservice/Passport/Update/"+1,objeto).success(function(response){
                  $scope.passNew="";
                  $scope.passNewConf="";
                     
                });
            });
	}
}; 

$scope.cargarFoto= function(filename){//metod que carga la foto para ser vista en el html, actuliza a nivel de base
    $scope.userPhoto="http://gestofi.com/webservice/fotoPerfil/default-user-image.png";
    var objetoFoto;    
    objetoFoto={
		"photo": filename
	};
    $scope.inter=$interval(function(){
    $http.put("webservice/User/update/"+$scope.user.id,objetoFoto).success(function(response){
        $scope.userPhoto="http://gestofi.com/webservice/fotoPerfil/"+filename;
    });
    },2000);
    bootbox.confirm("Confirme al ver su imagen", function(result){
        $interval.cancel($scope.inter);
    });
};

//codigo encargado de la subida de fotos 

//EMPIEZA CODIGO NECESARIO PARA QUE FUNCIONE EL UPLOADER
    //-------------------------------------------------------------------------------------------------------------------------------------//

    $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
    
    $scope.$watch('files', function(files) {  // metodo atento cambios en el html sobre la carga de archivos     
        if (files != null) {
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function(file) {
                    uploadUsingUpload(file);
                })(files[i]);
            }
        }
    });
    

    function uploadUsingUpload(file) {// metodo que carga la foto en el servidor 
        $scope.errorMsg = null;
        file.upload = Upload.upload({
                    url: 'webservice/User/upload',
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
      
    $scope.onSuccessLoadFile = function(response){//metodo encargado de llamar a la insercion de datos en base sobre la foto con la foto ya cargada en el servidor 
            
            var nombreSliced = "UserPhoto"+$scope.user.id+".png";
            $scope.cargarFoto(nombreSliced);
 
    };   

$scope.test = function() {
  
};

});