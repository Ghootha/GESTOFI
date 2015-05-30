var app = angular.module("AppAgenda", []);

app.controller("agendaController", function($scope, $http, $window, $location, $timeout, $route) {


		var req = {
			 method: 'GET',
			 url: 'webservice/Agenda/findActByUser', //Filtra actividades por usuario
			 dataType: 'json',
			 data: '',
			 headers: {
			   'Content-Type': "application/json; charset=utf-8"
			 }
			 
		};
		
		$scope.$on('$viewContentLoaded', function () { //Todo aquello que se quiera cargar al inicio de cada pagina
		  	$http.get("webservice/get_user").success(function(response){
		            if(response.user == null){ //valida que exista un usuario conectado, si no es asi lo devuelve a la pagian de login
		               window.location.replace("index.html"); 
		            }else{ 
		                $scope.user= response.user;               
		                var roleLogged = response.user.role;
		            
		                $http.get("webservice/Role").success(function(response){ // obtiene el role del usuario conectado, luego busca cual es la seguridad de dicho role
		                        var roles = response;

		                        for(var i = 0; i<roles.length; i++) {           
		                            if(roles[i].nombre === roleLogged) {
		                                
		                                var seguridad=roles[i].seguridad;

		                                if( seguridad == 'Ninguna'){  //Seguridad de las vistas que usen este controlador
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

		$scope.loadTags = function(query) { //Trae los usuarios al tag 
        return $http.get("webservice/User");
		};
	
//------------------------Agregar una actividad a la Agenda----------------------------------------------------//

		$scope.agregarActividad = function(){ 
			debugger;
			//variables utilizadas para convertir la fecha al formato deseado
			var k=$scope.horaSA.split(":");
			var w=$scope.horaEA.split(":");
			var i=$scope.startA.split("-");
			var inicio=new Date(i[2],i[1]-1,i[0],k[0]-6,k[1],"00");
			var f=$scope.endA.split("-");
			var ffinal=new Date(f[2],f[1]-1,f[0],w[0]-6,w[1],"00");
			// variables usadas para manejar los invitados
			var objetoJSON;
			var invitados=$scope.invitadoA;
			var auxinvitado="";
			
			//Invitado por invitado se envia una notificacion 
			if(invitados.length != 0 ){
				var auxinvitado=",";
				invitados.forEach(function(entry){		
					auxinvitado=auxinvitado+entry.username+",";	
					
					var objetoJSON;
					objetoJSON ={
						
						"duenno":entry.username,
						"emisor":$scope.user.username,
						"titulo":"Agenda: "+$scope.actividadA,
						"tipo":"Agenda",
						"mensaje":$scope.descripcionA
					};
				
					$http.put("webservice/notificaciones/create", objetoJSON).success(function(response){});
									
				});	
			}
			//validacion de fechas de la actividad
			if(ffinal > inicio){
			//Se crea el objeto completo para crear la actividad en la base
			objetoJSON = {
				"title": $scope.actividadA,
				"autor":  $scope.user.username,
				"lugar": $scope.lugarA,
				"invitado": auxinvitado,
				"descripcion": $scope.descripcionA,
				"start": inicio,
				"end": ffinal
			};
			// alertas,cierre y refresque del modal
			$http.post("webservice/Agenda/create", objetoJSON).success(function(response){				
				$route.reload();
				$('#calendar').fullCalendar('renderEvent', objetoJSON, true);
				$('#modalform').trigger("reset");
				$('#Modal3').modal('hide');
				bootbox.alert("Se ha creado la actividad correctamente");
					
             }).error(function(response, status, header, config){  
                    $timeout(function(){
                       bootbox.alert("Se ha producido un error");
                      });                          
             });
				
			 }else {
				$scope.endA="";
				bootbox.alert("No se creo la actividad porque la fecha final es anterior a la fecha de inicio");
			}
					
         };
//------------------------Agregar una actividad a la Agenda----------------------------------------------------//


//------------------------Actualizar una actividad a la Agenda----------------------------------------------------//		 
		
	$scope.actualizaAct = function() {  
		debugger;
		//variables auxiliares para el manejo de fechas 
				var f;
				var i;
				var objetoJSON;
						
				var k=$scope.horaS.split(":");
				var w=$scope.horaE.split(":");
				var i=$scope.start.split("-");
				var inicio=new Date(i[2],i[1]-1,i[0],k[0]-6,k[1],"00");
				var f=$scope.end.split("-");
				var ffinal=new Date(f[2],f[1]-1,f[0],w[0]-6,w[1],"00");				
																	
						//validacion de fechas de la actividad			
						if(ffinal > inicio){
						//objeto actualizado
							objetoJSON = {
								"title": $scope.title,
								"autor":  $scope.user.username,
								"lugar": $scope.lugar,
								"descripcion": $scope.descripcion,
								"start": inicio,
								"end": ffinal
						};
											
						$http.put("webservice/Agenda/update/"+$scope.id, objetoJSON).success(function(response){
									
									$http.get("webservice/Agenda/findActByUser")
										.success(function(data) {											
											$route.reload();
											$('#Modal2').modal('hide');	
											bootbox.alert("Se ha editado la actividad correctamente");
										});
						 }).error(function(response, status, header, config){  
							$timeout(function(){
								bootbox.alert("la actividad no se pudo editar");
							});                          
						});	
						
						
					}
					
			 else {
				$scope.end="";
				bootbox.alert("No se edito la actividad porque la fecha final es anterior a la fecha de inicio");
			}
	};

//------------------------Actualizar una actividad a la Agenda----------------------------------------------------//	

//------------------------Eliminar una actividad a la Agenda----------------------------------------------------//	 
		 $scope.eliminarAct = function() { 
			 $('#Modal4').modal({ backdrop: false})
			.one('click', '#confirm', function () { //al confirmar eliminar, borra la actividad de la base  
				
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
//------------------------Eliminar una actividad a la Agenda----------------------------------------------------//	
			
//------------------------Muestra la Agenda----------------------------------------------------//	 
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
				eventLimit: true, 
				
				events:data,
				//al dar click a una actividad
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
						
						if(calEvent.autor==$scope.user.username){
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
	
		  