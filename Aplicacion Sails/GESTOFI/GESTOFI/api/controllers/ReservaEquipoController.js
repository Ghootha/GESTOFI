/**
 * ReservaEquipoController
 *
 * @description :: Server-side logic for managing reservaequipoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
	var reservasPorFecha=[]; var listaReservaEquipo=[]; var listaF=[]; var listaUsuarios=[];
function reservaEquipoPorFecha(listaReservaEquipo, reservasPorFecha){

	var l=[];
	var i=0; var j=0;
	while(i < reservasPorFecha.length){
		j=0;
		while(j < listaReservaEquipo.length){
			if(listaReservaEquipo[j].idReserva === reservasPorFecha[i].id ){
				l[i]=listaReservaEquipo[j].idReservable;
				break;
			}
			j++;
		}
		i++;
	}
	return l;


}

function mergeJSON(json1,json2){
   var i=0;
   var jsonFinal=[];
   if(json1.length>0 && json2.length>0){
   while(i<json1.length){

   		var o={
   			"usuario" : json1[i].idUsuario,
   			"horaInicio" : new Date(json1[i].horaInicio).toLocaleTimeString(),
			"horaEntrega" : new Date(json1[i].horaEntrega).toLocaleTimeString(),
			"fecha" : json1[i].fecha,
			"estado_reserva" : json1[i].estado,
			"idReserva" : json1[i].id,
			"nombre" : json2[i].nombre,
			"tipo" : json2[i].tipo,
			"estado" : json2[i].estado,
			"descripcion" : json2[i].descripcion,
			"codigo" : json2[i].codigo,
			"idReservable" : json2[i].id
   		}

   		jsonFinal[i]=o;
   		i++;
   }
}

   return jsonFinal;
}

module.exports = {


	findReservas : function (req,res){

	 	
		
		var f=req.param('fecha');
		
		
		Reserva.find({fecha:f}).exec(function(err,reservas){reservasPorFecha=reservas;});
		ReservaEquipo.find().exec(function(err,reservaEquipos){listaReservaEquipo=reservaEquipos;});
		User.find().exec(function(err, miUsuario){listaUsuarios=miUsuario;});
		Reservable.find().exec(function(err, reservables){ 
				var listaReservaEquipoPorFecha= reservaEquipoPorFecha(listaReservaEquipo,reservasPorFecha);
				var i=0; var j=0; 

				while(listaReservaEquipoPorFecha.length>i){

					j=0;
					while(reservables.length>j){

						if(listaReservaEquipoPorFecha[i] === reservables[j].id){
							listaF[i]=reservables[j];
							break;
						}
						j++;
					}
					i++;
				}
				
				listaF=mergeJSON(reservasPorFecha,listaF);
				
					for(var s=0;s<listaF.length;s++){
						for(var e=0;e<listaUsuarios.length;e++){
							if(listaF[s].usuario === listaUsuarios[e].username){
								listaF[s].usuario = listaUsuarios[e].fullname;
							}
						}
						
					} 

					res.json(listaF);
				
		});
		
		
	}
	
	
};

