/**
 * AgendaController
 *
 * @description :: Server-side logic for managing correspondencias
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
 module.exports = {
	
	
	findActByUser:function(req, res){
		
		var usuarioLogged = req.user.fullname;
		Agenda.find( {autor : usuarioLogged} )
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