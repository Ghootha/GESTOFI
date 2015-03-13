/**
 * ReservaController
 *
 * @description :: Server-side logic for managing reservas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var listaF,listaIDReservas,listaIDReservables,horaI,fech;
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
		 Reserva.find().exec(function(err, reservas){
		 	
			if(Object.keys(reservas).length === 0){
			 	Reservable.find(  { tipo: {'!': 'Aula' } }).exec(function(err,reservable){
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
			 			
			 		    Reserva.find({ horaInicio: horaI, fecha : fech}).exec(function(err, idReservas){listaIDReservas=idReservas;});
			 		   	ReservaEquipo.find().exec(function(err, idReservables){listaIDReservables=idReservables;});
			 			
			 			Reservable.find({ tipo:{ '!': 'Aula'}}).exec(function(err, listaFinal){
			 			listaF=listaFinal;	
			 			var cont=0; var cont2=0;
			 			 
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
		 Reserva.find().exec(function(err, reservas){
		 	
			if(Object.keys(reservas).length === 0){
			 	Reservable.find(  { tipo:  'Aula'  }).exec(function(err,reservable){
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
			 			
			 			
			 		    Reserva.find({ horaInicio: horaI, fecha : fech}).exec(function(err, idReservas){listaIDReservas=idReservas;});
			 		   	ReservaEquipo.find().exec(function(err, idReservables){listaIDReservables=idReservables;});
			 			Reservable.find({ tipo: 'Aula'}).exec(function(err, listaFinal){
			 			listaF=listaFinal;	
			 			var cont=0; var cont2=0;
			 			 
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

