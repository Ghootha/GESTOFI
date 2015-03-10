var app = angular.module("myAppAgenda", []);

app.controller("agendaController", function($scope, $http) {

		var req = {
			 method: 'GET',
			 url: 'webservice/Agenda',
			 dataType: 'json',
			 data: '',
			 headers: {
			   'Content-Type': "application/json; charset=utf-8"
			 }
		}

		$http(req).success(function(data){
			$('#calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				defaultDate: '2015-02-12',
				editable: true,
				eventLimit: true, // allow "more" link when too many events
				
				events:data,
				
				eventClick: function(calEvent, jsEvent, view) {
						
					$('#modalTitle').html(calEvent.title);
					$('#modalBody').html("Autor: "+calEvent.autor+"<br>"+"Descripcion: "+calEvent.descripcion+"<br>"+"Lugar: "+calEvent.lugar+"<br>"+calEvent.start.format()+"<br>"+calEvent.end.format());
					//$('#modalBody').html(calEvent.start);
					//$('#modalBody').html(calEvent.end);
					
					$('#eventUrl').attr('href',calEvent.url);
					$('#fullCalModal').modal();
					

				},/*,											Esto sirve para cuando le doy click en la fecha agregar un evento se supone que yo con esto ya debo entender que hacer
				 :D*/
				 
				dayClick: function(date, jsEvent, view) {

					alert('Clicked on: ' + date.format());

					alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

					alert('Current view: ' + view.name);

					// change the day's background color just for fun
					$(this).css('background-color', 'red');

				}
				
						
			});
		}).error(function (XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest + " : " + textStatus + " : " + errorThrown);
		});

});
	
		  