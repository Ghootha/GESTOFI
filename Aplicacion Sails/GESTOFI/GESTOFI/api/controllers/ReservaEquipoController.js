/**
 * ReservaEquipoController
 *
 * @description :: Server-side logic for managing reservaequipoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
	var reservasPorFecha=[]; var listaReservaEquipo=[]; var listaF=[];
function reservaEquipoPorFecha(listaReservaEquipo, reservasPorFecha){

	var l=[];
	var i=0; var j=0;
	while(i < reservasPorFecha.length){
		j=0;
		while(j <listaReservaEquipo.length){
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
   			"horaInicio" : json1[i].horaInicio,
			"horaEntrega" : json1[i].horaEntrega,
			"fecha" : json1[i].fecha,
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
		ReservaEquipo.find().exec(function(err,reservaEquipos){listaReservaEquipo=reservaEquipos;}); //FALLA LA PRIMERA VEZ, NO DA RESULTADO Y TABLA NO ESTA VACIA

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
				
				res.json(mergeJSON(reservasPorFecha,listaF));

		});
		

	}
	
	
};

