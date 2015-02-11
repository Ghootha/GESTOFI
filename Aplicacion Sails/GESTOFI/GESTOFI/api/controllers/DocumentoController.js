/**
 * DocumentoController
 *
 * @description :: Server-side logic for managing documentoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	findDocByRole:function(req,res){
    
    var roleLogged = req.user.role;

    if(roleLogged  == 'Director'){
		Documento.find({})
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

    }

    if( roleLogged  == 'Secretaria' || roleLogged  == 'Recepcionista' || roleLogged  == 'Concerje' ){  

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

    }

    
	
};

//Estudiante