var app = angular.module("myAppPerfil", []);

app.controller("perfilController", function($scope, $http) {

$http.get("webservice/get_user").success(function(response){
            if(response.user == null){
               window.location.replace("index.html"); 
            }else{
             	
                $scope.user= response.user;
                
                
                	if($scope.user.photo !== null){
                		$scope.userPhoto= $scope.user.photo;
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
		"fullname": $scope.user.fullname,
		"birthdate": $scope.user.birthdate,
		"address": $scope.user.address,
		"email": $scope.user.email,
		"phone": $scope.user.phone
	};

	$http.put("webservice/User/update/"+$scope.user.id,objeto).success(function(){
		$scope.user.fullname= objeto.fullname; 
		$scope.user.birthdate = objeto.birthdate;
		$scope.user.address= objeto.address;
		$scope.user.email= objeto.email;
		$scope.user.phone= objeto.phone;
		alert("cambiado");

	});

};    

$scope.test = function() {
  
};

});