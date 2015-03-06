/**
 * CorrespondenciaController
 *
 * @description :: Server-side logic for managing correspondencias
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	
	bandejaDeEntrada:function(req, res){
		
		var usuarioLogged = req.user.fullname;
		Correspondencia.find( {receptor : usuarioLogged} )
			.exec(function(err,user){

		          if(err)
		            res.json({error:err});
		          if(user === undefined)
		            res.json({notFound:true});
		          else
		            res.json(user);
		        });
	},
	
	
	bandejaDeSalida:function(req, res){
		
		var usuarioLogged = req.user.fullname;
		Correspondencia.find( {emisor : usuarioLogged} )
			.exec(function(err,user){

		          if(err)
		            res.json({error:err});
		          if(user === undefined)
		            res.json({notFound:true});
		          else
		            res.json(user);
		        });
	}
};

