var app = angular.module("myAppPerfil", []);

app.controller("perfilController", function($scope, $http, $upload, $timeout) {

   $scope.tabs = [  
      { link : '#home2', label : 'Perfil' },
      { link : '#profile', label : 'Contraseña'},
      
    ]; 
$scope.user;
$http.get("webservice/get_user").success(function(response){
            if(response.user == null){
               window.location.replace("index.html"); 
            }else{
             	
                $scope.user= response.user;
                $scope.modalNombre=$scope.user.fullname;
                $scope.modalFecha=$scope.user.birthdate;
                $scope.modalDomicilio=$scope.user.address;
                $scope.modalEmail=$scope.user.email;
                $scope.modalPhone=$scope.user.phone;
                	
                	if($scope.user.photo !== null){
                		$scope.userPhoto= "http://gestofi.com/webservice/fotoPerfil/"+$scope.user.photo;
                	}
                	else
                		$scope.userPhoto= "http://gestofi.com/webservice/fotoPerfil/default-user-image.png" ;



            }
    }).error(function(response, status, header, config){  
            console.log("error en obtencion de usuario conectado");  
    });
$http.get("webservice/User").success(function(response) {$scope.users = response; });



$scope.modificarPerfil =function(){
    
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
        //$http.get("webservice/get_user").success(function(response){$scope.user= response.user;});
        $scope.modalNombre=$scope.user.fullname;
        $scope.modalFecha=$scope.user.birthdate;
        $scope.modalDomicilio=$scope.user.address;
        $scope.modalEmail=$scope.user.email;
        $scope.modalPhone=$scope.user.phone;
		alert("cambiado");

	});
    

};

$scope.editarModal=function(){
        
        $('#Modal2').modal({backdrop:false}).one('click', '#confirm', function(){
            $scope.modalNombre=$scope.user.fullname;
            $scope.modalFecha=$scope.user.birthdate;
            $scope.modalDomicilio=$scope.user.address;
            $scope.modalEmail=$scope.user.email;
            $scope.modalPhone=$scope.user.phone;
        
        });
    
};


$scope.setContrasena=function(){
	

	/*$http.get("webservice/User/"+$scope.user.id).success(function(response){
		pass = response.passports[0].password;
		alert(pass);
	});*/
	
	if($scope.passNew === $scope.passNewConf && $scope.passNew!= "" && $scope.passNew.length >= 8){
		//if($scope.pass===$scope.passAct){
			var o={
				"password": $scope.passNew
			};

			$http.put("webservice/Passport/update/"+$scope.user.id,o).success(function(response){
		          alert("Cambio existoso");   
            });

		//}

	}
    
	

}; 

$scope.cargarFoto= function( filename){
    var objetoFoto;
    
    objetoFoto={
		"photo": filename
	};
    $http.put("webservice/User/update/"+$scope.user.id,objetoFoto).success(function(response){
        alert("Foto cambiada");
        $scope.userPhoto= "http://gestofi.com/webservice/fotoPerfil/"+$scope.user.photo;
        
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
                    url: 'webservice/User/upload',
                    data: {title: 'prueba', documento: file, nomDoc:"UserPhoto"+$scope.user.id+".png"}
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
            var nombreSliced = "UserPhoto"+$scope.user.id+".png";
            $scope.cargarFoto(nombreSliced);
 
    };   

$scope.test = function() {
  
};

});