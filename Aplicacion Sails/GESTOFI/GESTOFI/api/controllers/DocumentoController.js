/**
 * DocumentoController
 *
 * @description :: Server-side logic for managing documentoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {	

    findDocByRole: function(req, res){

    	var roleLogged = req.user.role; 
		
		Role.findOne({ nombre: roleLogged}).exec(function (err, role){
			var seguridadRole= role.seguridad;
			
			if(seguridadRole =='Alta'){
				Documento.find( {} )
				.exec(function(err,user){
					  if(err)
					    res.json({error:err});
					  if(user === undefined)
					    res.json({notFound:true});
					  else
					    res.json(user);
				});
			}
			if (seguridadRole == 'Media') {
				Documento.find( { seguridad: { '!': 'Alta' }} )
				.exec(function(err,user){
					  if(err)
					    res.json({error:err});
					  if(user === undefined)
					    res.json({notFound:true});
					  else
					    res.json(user);
				});

			}
			
			if (seguridadRole == 'Baja') {
				Documento.find( { seguridad: { '!' : ['Alta', 'Media'] } } )
				.exec(function(err,user){
					  if(err)
					    res.json({error:err});
					  if(user === undefined)
					    res.json({notFound:true});
					  else
					    res.json(user);
				});

			}

			if(seguridadRole == 'Ninguna'){
				Documento.find( {seguridad: seguridadRole} )
				.exec(function(err,user){
					  if(err)
					    res.json({error:err});
					  if(user === undefined)
					    res.json({notFound:true});
					  else
					    res.json(user);
				});

			}

				
		});


    }
    
	
};