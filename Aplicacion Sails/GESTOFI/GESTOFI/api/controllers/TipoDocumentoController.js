/**
 * TipoDocumentoController
 *
 * @description :: Server-side logic for managing tipodocumentoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	findTipoDocByRole:function(req,res){
    
    var roleLogged = req.user.role; 
		
		Role.findOne({ nombre: roleLogged}).exec(function (err, role){
			var seguridadRole= role.seguridad;
			
			if(seguridadRole =='Alta'){
				TipoDocumento.find( {} )
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
				TipoDocumento.find( { seguridad: { '!': 'Alta' }} )
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
				TipoDocumento.find( { seguridad: { '!' : ['Alta', 'Media'] } } )
				.exec(function(err,user){
					  if(err)
					    res.json({error:err});
					  if(user === undefined)
					    res.json({notFound:true});
					  else
					    res.json(user);
				});

			}

			// if(seguridadRole == 'Ninguna'){
			// 	TipoDocumento.find( {seguridad: seguridadRole} )
			// 	.exec(function(err,user){
			// 		  if(err)
			// 		    res.json({error:err});
			// 		  if(user === undefined)
			// 		    res.json({notFound:true});
			// 		  else
			// 		    res.json(user);
			// 	});

			// }

				
		});
    }
	
};

