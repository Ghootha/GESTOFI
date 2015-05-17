var app = angular.module("myAppAgenda", []);

app.controller("agendaController", function($scope, $http, $window, $location, $timeout, $route) {


		var req = {
			 method: 'GET',
			 url: 'webservice/Agenda/findActByUser',
			 dataType: 'json',
			 data: '',
			 headers: {
			   'Content-Type': "application/json; charset=utf-8"
			 }
			 //url: 'webservice/Agenda', para ver todas las act
		};
		
		$scope.$on('$viewContentLoaded', function () {
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
		});

		$scope.loadTags = function(query) {
        return $http.get("webservice/User");
		};
	

		$scope.agregarActividad = function(){ 
			var k=$scope.horaSA.split(":");
			var w=$scope.horaEA.split(":");
			var i=$scope.startA.split("-");
			var inicio=new Date(i[2],i[1]-1,i[0],k[0]-6,k[1],"00");
			var f=$scope.endA.split("-");
			var ffinal=new Date(f[2],f[1]-1,f[0],w[0]-6,w[1],"00");
			var objetoJSON;
			var invitados=$scope.invitadoA;
			var auxinvitado=",";
			
			invitados.forEach(function(entry){		
				auxinvitado=auxinvitado+entry.fullname+",";	
				
				var objetoJSON;
				objetoJSON ={
					
					"duenno":entry.fullname,
					"emisor":$scope.user.fullname,
					"titulo":"Agenda: "+$scope.actividadA,
					"tipo":"Agenda",
					"mensaje":$scope.descripcionA
				};
			
				$http.put("webservice/notificaciones/create", objetoJSON).success(function(response){});
				$route.reload();
				
			});	
			
			if(ffinal > inicio){
			
			objetoJSON = {
				"title": $scope.actividadA,
				"autor":  $scope.user.fullname,
				"lugar": $scope.lugarA,
				"invitado": auxinvitado,
				"descripcion": $scope.descripcionA,
				"start": inicio,
				"end": ffinal
			};
			
			$http.post("webservice/Agenda/create", objetoJSON).success(function(response){
					$timeout(function(){
				   
				   }); 
					
             }).error(function(response, status, header, config){  
                    $timeout(function(){
                       alert("Se ha producido un error");
                      });                          
             });
				$('#calendar').fullCalendar('renderEvent', objetoJSON, true);
				$('#modalform').trigger("reset");
				$('#Modal3').modal('hide');
				bootbox.alert("Se ha creado la actividad correctamente");
			 }
			 else {
				$scope.endA="";
				bootbox.alert("No se creo la actividad porque la fecha final es anterior a la fecha de inicio");
			}
					
         };
		 
		
	$scope.actualizaAct = function() {  
				var f;
				var i;
				var objetoJSON;
				for(var x = 0; x<$scope.actividades.length; x++) {
					if($scope.actividades[x].id === $scope.id) {
					
								var k=$scope.horaS.split(":");
								var w=$scope.horaE.split(":");
								var i=$scope.start.split("-");
								var inicio=new Date(i[2],i[1]-1,i[0],k[0]-6,k[1],"00");
								var f=$scope.end.split("-");
								var ffinal=new Date(f[2],f[1]-1,f[0],w[0]-6,w[1],"00");
							var invitados=$scope.invitado;
							var auxinvitado=",";
							invitados.forEach(function(entry){		
								auxinvitado=auxinvitado+entry.fullname+",";		
							});											
									
							if(ffinal > inicio){
							objetoJSON = {
								"title": $scope.title,
								"autor":  $scope.user.fullname,
								"lugar": $scope.lugar,
								//"invitado": auxinvitado,
								"descripcion": $scope.descripcion,
								"start": inicio,
								"end": ffinal
							};
											
						$http.put("webservice/Agenda/update/"+$scope.id, objetoJSON).success(
						 
								function(){
									$http.get("webservice/Agenda")
										.success(function(data) {$scope.actividades = data;});
						 }).error(function(response, status, header, config){  
							$timeout(function(){
								alert("la actividad no se pudo editar");
							});                          
						});	
						location.href="#agenda"; 
						$('#Modal2').modal('hide');	
						bootbox.alert("Se ha editado la actividad correctamente");
					}
					
			 else {
				$scope.end="";
				bootbox.alert("No se edito la actividad porque la fecha final es anterior a la fecha de inicio");
			}
			}
          } 
  };
		 
		 
		 $scope.eliminarAct = function() {
			 $('#Modal4').modal({ backdrop: false})
			.one('click', '#confirm', function () {
				
			  $http.get("webservice/Agenda/destroy/"+$scope.id).success(
					function(){
						for(var i = 0; i<$scope.actividades.length; i++) {  
								
							if($scope.actividades[i].id === $scope.id) {
							  $scope.$apply($scope.actividades.splice(i, 1));
							}
						}  
				    }).error(function(response, status, header, config){  
						$timeout(function(){
							alert("la actividad no se pudo eliminar");
						});                          
					});
			
			location.href="#agenda"; 
			$('#Modal2').modal('hide');	
			bootbox.alert("Se ha eliminado la actividad correctamente");
			});
			
		 };
			
	 
		$http(req).success(function(data, response){
			$scope.actividades=data;
			
			$('#calendar').fullCalendar( {
				lang: 'es',
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
					
				},
				editable: true,
				eventLimit: true, // allow "more" link when too many events
				
				events:data,
				
				eventClick: function(calEvent, jsEvent, view) {
													
										
					$scope.$apply(function(){
						$scope.incomplete = true;
						$scope.id=calEvent.id;
						$scope.title= calEvent.title;
						$scope.autor= calEvent.autor;
						$scope.lugar= calEvent.lugar;
																								
						$scope.invitado= [{ text: calEvent.invitado }];
						$scope.descripcion= calEvent.descripcion;
						$scope.start= calEvent.start.format('DD-MM-YYYY');
						$scope.end= calEvent.end.format('DD-MM-YYYY');
						$scope.horaS=calEvent.start.format('HH:mm');
						$scope.horaE=calEvent.end.format('HH:mm');
						
						if(calEvent.autor==$scope.user.fullname){
							$scope.incomplete=false;
							
						}	
					});
					
					$('#Modal2').modal({backdrop:false});
					 				 
					  							
				},
				
							 
				dayClick: function(date, jsEvent, view) {
					$('#Modal3').modal({backdrop:false});
					$scope.$apply(function(){
						$scope.startA = date.format('DD-MM-YYYY');
					});
						
					//$(this).css('background-color', 'blue');
				}
														
			});
		
			
		}).error(function (XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + " : " + textStatus + " : " + errorThrown);
		});

});
	
		  