var app = angular.module("myAppAgenda", []);

app.controller("agendaController", function($scope, $http, $window, $location, $timeout) {


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
		$http.get("webservice/get_user").success(function(response){
			$scope.user= response.user;
			$scope.userLogged=  $scope.user.fullname;            
		});
			
		$scope.agregarActividad = function(){ 
			var i=$scope.startA.split("-");
			var inicio=new Date(i[2],i[1]-1,i[0]);
			var f=$scope.endA.split("-");
			var ffinal=new Date(f[2],f[1]-1,f[0]);
			var objetoJSON;
				 			
				   
			objetoJSON = {
				"title": $scope.actividadA,
				"autor":  $scope.user.fullname,
				"lugar": $scope.lugarA,
				"descripcion": $scope.descripcionA,
				"start": inicio,
				"end": ffinal,
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
		 };
		 
		
	$scope.actualizaAct = function() {  
				var f;
				var i;
				var objetoJSON;
				for(var x = 0; x<$scope.actividades.length; x++) {
					if($scope.actividades[x].id === $scope.id) {
						
								i=$scope.start.split("-");
								f=$scope.end.split("-");
								
								var inicio=new Date(i[2],i[1]-1,i[0]);
								var ffinal=new Date(f[2],f[1]-1,f[0]);
																							
							objetoJSON = {
								"title": $scope.title,
								"autor":  $scope.user.fullname,
								"lugar": $scope.lugar,
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
					
			//$route.reload(); *
			//$('#calendar').fullCalendar( 'refetchEvents' );
			//$location.path();
			location.href="#agenda"; 
			$('#Modal2').modal('hide');			 
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
						$scope.descripcion= calEvent.descripcion;
						$scope.start= calEvent.start.format('DD-MM-YYYY');
						$scope.end= calEvent.end.format('DD-MM-YYYY');
						
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
	
		  