
	  
  $(document).ready(function() {
  
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
				$('#eventUrl').attr('href',calEvent.url);
				$('#fullCalModal').modal();
				

			},
			 
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
	
		  