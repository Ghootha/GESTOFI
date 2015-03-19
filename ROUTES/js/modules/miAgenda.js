var app = angular.module("myAppAgenda", []);

app.controller("agendaController", function($scope, $http, $window) {

		var req = {
			 method: 'GET',
			 url: 'webservice/Agenda',
			 dataType: 'json',
			 data: '',
			 headers: {
			   'Content-Type': "application/json; charset=utf-8"
			 }
		};
		
		
		$scope.agregarActividad = function(){ 
			
			var objetoJSON;    
				debugger;   
			objetoJSON = {
				"title": $scope.actividadA,
				"autor": $scope.autorA,
				"lugar": $scope.lugarA,
				"descripcion": $scope.descripcionA,
				"start": $scope.startA,
				"end": $scope.endA,
			};
			
			alert(objetoJSON.title);
			$http.post("webservice/Agenda/create", objetoJSON).success(function(response){
				/*$timeout(function(){
				   // $scope.mensajeExitoSubidaDoc=true;
				   alert("yeahhh");
				});   */                     
		 }).error(function(response, status, header, config){  
				/*$timeout(function(){
				   // $scope.mensajeFallidoSubidaDoc=true; 
				   alert("noooo");
				}); */                         
		 });
		};
		$http(req).success(function(data){
			$('#calendar').fullCalendar({
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
						$scope.title= calEvent.title;
						$scope.autor= calEvent.autor;
						$scope.lugar= calEvent.lugar;
						$scope.descripcion= calEvent.descripcion;
						$scope.start= calEvent.start;
						$scope.end= calEvent.end;	
					});
					$('#Modal2').modal({backdrop:false});
					
				
							
				},
				
							 
				dayClick: function(date, jsEvent, view) {
					$('#Modal3').modal({backdrop:false});
					$scope.$apply(function(){
						$scope.startA = date.format('DD MM YYYY');
					});	
					$(this).css('background-color', 'blue');
				}
					
					
							
			});
		}).error(function (XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + " : " + textStatus + " : " + errorThrown);
		});

});
	
		  