var app = angular.module("myAppReserva", []);

app.controller("reservaController", function($scope, $http) {

$scope.$on('$viewContentLoaded', function() {
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

                              if( seguridad != 'Alta'){  
                                 window.location.replace("paginaPrincipal.html"); 
                              }
                              
                          }
                      }
              });               
          }
	}).error(function(response, status, header, config){  
	        console.log("error en obtencion de usuario conectado");  
	});	
});


$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.opcs=[{id:1,nombre:'Pendiente'},{id:2,nombre:'En uso'},{id:3,nombre:'Recibido'}];
$scope.nombresSelect=[];

var objetoFecha;

$scope.buscarPorFecha = function (){
	if(typeof fecha === "undefined"){
        return "";
    }
    else{
	var fech=$scope.fecha.split("-");
    fech=new Date(fech[2],fech[1]-1,fech[0]);
	objetoFecha={
		"fecha" : fech.toISOString()
	};
	$http.post("webservice/ReservaEquipo/findReservas", objetoFecha).success(function(response){$scope.reservas=response;
		$scope.nombresSelect=[];
	for(var i=0; i<$scope.reservas.length;i++){
		$scope.nombresSelect[i]="select"+i;
	}

	});
	}
	
};


$scope.mostrarEstado= function(estado, ID){
	if(estado==="Pendiente"){
		
		$scope.nombresSelect[ID]= $scope.opcs[0].id;
	}
	else if(estado==="En uso"){
		
		$scope.nombresSelect[ID]= $scope.opcs[1].id;
	}

	else if(estado==="Recibido"){
		
		$scope.nombresSelect[ID]= $scope.opcs[2].id;
	}

};


$scope.setEstado = function(id, idReserva){
	
	var objeto={
		"estado": id.nombre
	};
	$http.put("webservice/Reserva/update/"+idReserva, objeto).success(function(response){
		
	});
	
	
};

});