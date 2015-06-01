/**
 * ReservaController
 *
 * @description :: Server-side logic for managing reservas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var listaF,listaIDReservas,listaIDReservables,horaI,horaE,fech;
function MlistaNoDisponibles(listaIDReservables, listaIDReservas){

		var cont=0; var cont2=0; var listaNoDisponibles=[];
		while(listaIDReservas.length>cont){
			while(listaIDReservables.length>cont2){
				if(listaIDReservables[cont2].idReserva === listaIDReservas[cont].id){
					listaNoDisponibles[cont]=listaIDReservables[cont2].idReservable;
					cont2=0;
					break;
				}
				cont2++;
			}								
			cont++;
		}
		return listaNoDisponibles;
	}

	function depurarDisponibles(listaIDReservas, horaInicio, horaEntrega){
		var listaResult=[];var j=0;
		
		for(var i=0;i<listaIDReservas.length;i++){
			if( new Date(listaIDReservas[i].horaInicio) <= new Date (horaInicio) && new Date(listaIDReservas[i].horaEntrega) > new Date (horaInicio) 
				|| new Date(listaIDReservas[i].horaInicio) <= new Date(horaEntrega) && new Date(horaEntrega)<= new Date(listaIDReservas[i].horaEntrega) 
				|| new Date(listaIDReservas[i].horaInicio) > new Date(horaInicio) && new Date(listaIDReservas[i].horaEntrega) < new Date(horaEntrega) ){
				
				listaResult[j]=listaIDReservas[i];
				j++;
			}
		}
		
		return listaResult;
	}

	function existe(tipo, array){
		var i=0;
		while(i<array.length){
			if(array.length===0){
				return false;
			}

			else if(array[i]===tipo){
				return true;
			}

			else
				i++;
		}

		return false;

	}

module.exports = {
	
	findTiposEquipos:function(req,res){
		Reservable.find({ tipo:{'!':'Aula'}}).exec(function(err, reservable){
			if(err)
		        res.json({error:err});
		    if(reservable=== undefined)
		      	res.json({notFound:true});
		    else{
		    	var tipos=[];
		   		var i=0;
		    	while(reservable.length>i){
		    		
		    		if(!existe(reservable[i].tipo, tipos)){
		    			tipos.push(reservable[i].tipo);
		    			i++;
		    		}
		    		else 
		    			i++;
		    	}
		    	res.json(tipos);
		    }
		       	
		});

	},

	findReservablebyAula:function(req,res){


		Reservable.find(  { tipo:  'Aula' })
		        .exec(function(err,reservable){

		          if(err)
		            res.json({error:err});
		          if(reservable=== undefined)
		            res.json({notFound:true});
		          else
		            res.json(reservable);
		        });
	},

	findReservablebyEquipo:function(req,res){
   

		Reservable.find(  { tipo:{ '!': 'Aula'}})
		        .exec(function(err,reservable){

		          if(err)
		            res.json({error:err});
		          if(reservable=== undefined)
		            res.json({notFound:true});
		          else{

		            res.json(reservable);}
		        });
	},

	consultaEquipo: function (req, res){
		 
		
		 horaI= req.param('horaInicio');
		 fech= req.param('fecha');
		 horaE= req.param('horaEntrega');
		 var misTiposEquipos=[];
		 TipoReservable.find({tipo:"Equipo"}).exec(function(err,r){
			//var nombres=[];
		      for(var i=0; i<r.length;i++){
		        misTiposEquipos[i]=r[i].nombre;
		      }
		 });
		 Reserva.find().exec(function(err, reservas){
		 	
			if(Object.keys(reservas).length === 0){
			 	Reservable.find(  { tipo: misTiposEquipos }).exec(function(err,reservable){
				  if(err)
		            res.json({error:err});
		          if(reservable=== undefined)
		            res.json({notFound:true});
		          else{
		            res.json(reservable);
		            	
		        	}
		        });
			 	}
			 	else{
			 			
			 		    /*Reserva.find({fecha:fech}).exec(function(err, idReservas){
			 		    //Reserva.find({ fecha : req.param('fecha'), horaInicio: { $lg :req.param('horaInicio')}, horaEntrega: {$gl:req.param('horaEntrega')}}).exec(function(err, idReservas){listaIDReservas=idReservas;
	
			 		    	if(err)
					         res.json({error:err});
					        else if(idReservas=== undefined)
					         res.json({notFound:true});
					        else{


					          listaIDReservas=idReservas;
					            	
					        }
			 		    	
			 		    });*/
		 				Reserva.find({fecha:fech}).exec(function(err, idReservas){listaIDReservas=idReservas;});
			 		   	ReservaEquipo.find().exec(function(err, idReservables){listaIDReservables=idReservables;});
			 			
			 			Reservable.find({ tipo: misTiposEquipos}).exec(function(err, listaFinal){
			 			listaF=listaFinal;	
			 			var cont=0; var cont2=0;
			 			listaIDReservas=depurarDisponibles(listaIDReservas,horaI,horaE);
			 			var listaNoDisponibles=MlistaNoDisponibles(listaIDReservables,listaIDReservas);
			 			
			 				while(listaNoDisponibles.length>cont){
			 					cont2=0;
			 					while(listaF.length>cont2){

			 						if(listaNoDisponibles[cont] === listaF[cont2].id){
			 							
			 							listaF.splice(cont2,1);
			 							
			 							break;
			 						}
			 						cont2++;
			 					}
			 					cont++;

			 				}
			 				
			 				res.json(listaF);

			 			});

					}
			 	});

	},

	consultaAula: function (req, res){
		 horaI= req.param('horaInicio');
		 fech= req.param('fecha');
		 horaE= req.param('horaEntrega');
		 var misTiposAulas=[];
		 TipoReservable.find({tipo:"Aula"}).exec(function(err,r){
			//var nombres=[];
		      for(var i=0; i<r.length;i++){
		        misTiposAulas[i]=r[i].nombre;
		      }
		 });
		 Reserva.find().exec(function(err, reservas){
		 	
			if(Object.keys(reservas).length === 0){
			 	Reservable.find(  { tipo:  misTiposAulas  }).exec(function(err,reservable){
				  if(err)
		            res.json({error:err});
		          if(reservable=== undefined)
		            res.json({notFound:true});
		          else{
		            res.json(reservable);
		            	
		        	}
		        });
			 	}
			 	else{
			 		   	Reserva.find({fecha:fech}).exec(function(err, idReservas){listaIDReservas=idReservas;});
			 		   	//Reserva.find({ fecha : req.param('fecha'), horaInicio: { $gl :req.param('horaInicio')}, horaEntrega: {$lg:req.param('horaEntrega')}}).exec(function(err, idReservas){listaIDReservas=idReservas;});
			 		   	ReservaEquipo.find().exec(function(err, idReservables){listaIDReservables=idReservables;});
			 			Reservable.find({ tipo: misTiposAulas}).exec(function(err, listaFinal){
			 			listaF=listaFinal;	
			 			var cont=0; var cont2=0;
			 			listaIDReservas=depurarDisponibles(listaIDReservas,horaI,horaE); 
			 			var listaNoDisponibles=MlistaNoDisponibles(listaIDReservables,listaIDReservas);
			 				
			 				while(listaNoDisponibles.length>cont){
			 					cont2=0;
			 					while(listaF.length>cont2){
			 						if(listaNoDisponibles[cont] === listaF[cont2].id){
			 							listaF.splice(cont2,1);
			 							
			 							break;
			 						}
			 						cont2++;
			 					}
			 					cont++;

			 				}
			 				res.json(listaF);

			 			});

					}
			 	});

	}
};

