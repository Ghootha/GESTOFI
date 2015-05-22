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

/*function separaSolicitudesUsuario(tipo,lista){
	//separo las solicitudes pendientes o historial 
	var fechaHoy= new Date();
	var i=0;var f1;var f; var hora;var listaPendientes=[]; var listaHistorial=[]; var lp=0; var lh=0;
	while(i<lista.length){
		f1=new Date(lista[i].fecha);
		hora=new Date("January 01, 2015 "+lista[i].horaInicio+":00");
		f1.setHours(hora.getHours());
		f1.setMinutes(hora.getMinutes());
		if(fechaHoy < f1){
			f= f1.getDate()+"/"+(f1.getMonth()+1)+"/"+f1.getFullYear();
		   	lista[i].fecha=f;
		   	listaPendientes[lp]=lista[i];
		   	lp++;
		}
		else {
			f= f1.getDate()+"/"+(f1.getMonth()+1)+"/"+f1.getFullYear();
		   	lista[i].fecha=f;
		   	listaHistorial[lh]=lista[i];
		   	lh++;
		}
		i++;
	}

	if(tipo==1){
		return listaPendientes;
	}
	else
		return listaHistorial;
}*/

function listaPendientesFinal(lista){
	var fechaHoy= new Date();
	var i=0;var f1;var f; var hora;var listaPendientes=[];var lp=0;
	while(i<lista.length){
		f1=new Date(lista[i].fecha);
		hora=new Date("January 01, 2015 "+lista[i].horaInicio+":00");
		f1.setHours(hora.getHours());
		f1.setMinutes(hora.getMinutes());
		if(fechaHoy < f1){
			f= f1.getDate()+"/"+(f1.getMonth()+1)+"/"+f1.getFullYear();
		   	lista[i].fecha=f;
		   	listaPendientes[lp]=lista[i];
		   	lp++;
		}
		i++;
	}
	return listaPendientes;
}

function listaHistorialFinal(lista){
	var fechaHoy= new Date();
	var i=0;var f1;var f; var hora;var listaPendientes=[];var lp=0;
	while(i<lista.length){
		f1=new Date(lista[i].fecha);
		hora=new Date("January 01, 2015 "+lista[i].horaInicio+":00");
		f1.setHours(hora.getHours());
		f1.setMinutes(hora.getMinutes());
		if(fechaHoy > f1){
			f= f1.getDate()+"/"+(f1.getMonth()+1)+"/"+f1.getFullYear();
		   	lista[i].fecha=f;
		   	listaPendientes[lp]=lista[i];
		   	lp++;
		}
		i++;
	}
	return listaPendientes;
}

function mergeJSON(json1,json2){
   var i=0;
   var jsonFinal=[];
   if(json1.length>0 && json2.length>0){
   while(i<json1.length){
   	
   		var o={
   			"ID": i,
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
		
		
	},

	findReservasUsuario : function(req, res){
		
		//var usuario= req.param('usuario');
		var indexList= req.param('lista');//1 para pendiente, 2 para historial
		var reservasUsuario=[]; var reservablesUsuario=[]; var reservaEquipos=[];listaF=[];
		

		Reserva.find({idUsuario:req.user.username}).exec(function(err,reservas){reservasUsuario=reservas;
		ReservaEquipo.find().exec(function(err,reservaEquipo){reservaEquipos=reservaEquipo;
		Reservable.find().exec(function(err,reservables){
			reservablesUsuario=reservaEquipoPorFecha(reservaEquipos,reservasUsuario);
			var i=0;var j=0;
			while(reservablesUsuario.length>i){
				j=0;
				while(reservables.length>j){
					if(reservablesUsuario[i]===reservables[j].id){
						listaF[i]=reservables[j];
						break;
					}
					j++;
				}
				i++;
			}
			
			listaF=mergeJSON(reservasUsuario,listaF);
			if(indexList===1){
				listaF=listaPendientesFinal(listaF);
			}
			else if(indexList===2){
				listaF=listaHistorialFinal(listaF);
			}
			res.json(listaF);
		});});});
	}
	
};

