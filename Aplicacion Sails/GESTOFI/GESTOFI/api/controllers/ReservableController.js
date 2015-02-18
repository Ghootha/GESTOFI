/**
 * ReservableController
 *
 * @description :: Server-side logic for managing reservables
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

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
		          else
		            res.json(reservable);
		        });
	}
		
    

 
};

