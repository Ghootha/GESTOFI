
	  
  $(document).ready(function() {
  /* var aux;
   
  $.ajax({
    type: "GET",
    url: "webservice/Agenda",
    data: "[]",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(results) {
		alert("results: "+results);
		aux=results;
        alert(aux[1].start);   // alerts json above

    }
});
		
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			defaultDate: '2015-02-12',
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			
			events:aux,
			
			/*
			events: [
				{
					title: 'Dia de los directores',
					start: '2015-02-01',
					end: '2015-02-04',
					description: 'una vara loca',
					autor: 'Carlos Cascante',
					lugar: 'Ciencias Sociales'
					
				},
				{
					title: 'Long Event',
					start: '2015-02-07',
					end: '2015-02-10',
					description: 'otra vara loca'
				},
				{
					id: 999,
					title: 'alallalal',
					start: '2015-02-09T16:00:00',
					description: 'una otra vara loca'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2015-02-16T16:00:00'
				},
				{
					title: 'Conference',
					start: '2015-02-11',
					end: '2015-02-13'
				},
				{
					title: 'Meeting',
					start: '2015-02-12T10:30:00',
					end: '2015-02-12T12:30:00'
				},
				{
					title: 'Lunch',
					start: '2015-02-12T12:00:00'
				},
				{
					title: 'Meeting',
					start: '2015-02-12T14:30:00'
				},
				{
					title: 'Happy Hour',
					start: '2015-02-12T17:30:00'
				},
				{
					title: 'Dinner',
					start: '2015-02-12T20:00:00'
				},
				{
					title: 'Birthday Party',
					start: '2015-02-13T07:00:00'
				},
				{
					title: 'Click for Google',
					url: 'http://google.com/',
					start: '2015-02-28'
				}
			],*/
	/*		 eventClick: function(calEvent, jsEvent, view) {
					
				$('#modalTitle').html(calEvent.title);
				$('#modalBody').html("Autor: "+calEvent.autor+"<br>"+"Descripcion: "+calEvent.description+"<br>"+"Lugar: "+calEvent.lugar+"<br>"+calEvent.start+"<br>"+calEvent.end);
				//$('#modalBody').html(calEvent.start);
				//$('#modalBody').html(calEvent.end);
				
				$('#eventUrl').attr('href',calEvent.url);
				$('#fullCalModal').modal();
				

			}
			
					
		});
	*/	
		$.ajax({
    type: "GET",
    url: "webservice/Agenda",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {
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

    },
	error: function (XMLHttpRequest, textStatus, errorThrown) {
alert(XMLHttpRequest + " : " + textStatus + " : " + errorThrown);
}
});
	});
	
		  