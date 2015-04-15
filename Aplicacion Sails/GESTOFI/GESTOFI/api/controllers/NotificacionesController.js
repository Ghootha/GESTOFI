/**
 * NotificacionesController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    notificacionesUsuario:function(req, res){
		
		var usuarioLogged = req.user.fullname;
		Notificaciones.find( {duenno : usuarioLogged} )
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