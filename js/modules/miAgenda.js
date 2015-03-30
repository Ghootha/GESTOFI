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
			var i=$scope.startA.split("-");
			var inicio=new Date(i[2],i[1]-1,i[0]);
			var f=$scope.endA.split("-");
			var ffinal=new Date(f[2],f[1]-1,f[0]);
			var objetoJSON;    
				   
			objetoJSON = {
				"title": $scope.actividadA,
				"autor": $scope.autorA,
				"lugar": $scope.lugarA,
				"descripcion": $scope.descripcionA,
				"start": inicio,
				"end": ffinal,
			};
			
			//alert(objetoJSON.title);
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
             $('#calendar').fullCalendar('renderEvent', objetoJSON, true);
//             $('#modal3').each (function(){
//                          this.reset();
//                          });
            $('#modalform').trigger("reset");
		    $('#modal3').modal('hide');
		 };
		$http(req).success(function(data){
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
						$scope.title= calEvent.title;
						$scope.autor= calEvent.autor;
						$scope.lugar= calEvent.lugar;
						$scope.descripcion= calEvent.descripcion;
						$scope.start= calEvent.start.format('DD MM YYYY');
						$scope.end= calEvent.end.format('DD MM YYYY');	
					});
					$('#Modal2').modal({backdrop:false});
					 //$('#Modal3').reset();
					 
					  							
				},
				
							 
				dayClick: function(date, jsEvent, view) {
					$('#Modal3').modal({backdrop:false});
					$scope.$apply(function(){
						$scope.startA = date.format('DD-MM-YYYY');
					});	
					//$(this).css('background-color', 'blue');
				}
				//$('#Modal3').removeData('bs.modal');
										
			});
		
			
		}).error(function (XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + " : " + textStatus + " : " + errorThrown);
		});

});
	
		  