/**
 * TipoDocumentoController
 *
 * @description :: Server-side logic for managing tipodocumentoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	findTipoDocByRole:function(req,res){
    
    var roleLogged = req.user.role;

    if(roleLogged  == 'Director' || roleLogged  == 'Subdirector' || roleLogged  == 'Asistente Administrativa' ){
		TipoDocumento.find({})
		        .exec(function(err,user){

		          if(err)
		            res.json({error:err});
		          if(user === undefined)
		            res.json({notFound:true});
		          else
		            res.json(user);
		        });
		  }
    

    if( roleLogged  == 'Encargado de Maestría' || roleLogged  == 'Personal Académico' ){  

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

    

    if( roleLogged  == 'Secretaria' || roleLogged  == 'Recepcionista' || roleLogged  == 'Concerje' || roleLogged  == 'Estudiante' ){  

    	TipoDocumento.find( { seguridad: 'Ninguna' } )
		        .exec(function(err,user){

		          if(err)
		            res.json({error:err});
		          if(user === undefined)
		            res.json({notFound:true});
		          else
		            res.json(user);
		        });
		  }

    }
	
};

