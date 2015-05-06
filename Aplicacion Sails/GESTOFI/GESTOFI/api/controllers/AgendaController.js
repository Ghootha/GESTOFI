/**
 * AgendaController
 *
 * @description :: Server-side logic for managing correspondencias
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
 module.exports = {
	
	findActByUser:function(req, res){
		
		var usuarioLogged = req.user.fullname;
		var quer ="select * from Agenda where autor = '"+usuarioLogged+"' OR invitado LIKE '%,"+usuarioLogged+",%'";
		
		Agenda.query(quer,function(err, results) {
		 if (err) 
			return res.serverError(err);
		  return res.ok(results.rows);
		});
	}
};