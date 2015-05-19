/**
 * SolicitudesController
 *
 * @description :: Server-side logic for managing mensajes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var misUsuarios=[];var nomDoc;
module.exports = {
	
  
	upload: function  (req, res) {
    
    var uploadPath = '../../assets/solicitudes/solicitudesRecibidas';  
    
    req.file('file').upload({ dirname: uploadPath},function (err, files) {
      if (err)
        return res.send(500, err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  },

 
  uploadPlantillaGiras: function  (req, res) {
    
    var uploadPath = '../../assets/solicitudes/plantillas';  
    req.file('file').upload({ dirname: uploadPath, saveAs:"PLANTILLA_GIRAS.docx"},function (err, files) {
      
      if (err)
        return res.send(500, err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  },

  uploadPlantillaVacaciones: function  (req, res) {
    
    var uploadPath = '../../assets/solicitudes/plantillas';  
    req.file('file').upload({ dirname: uploadPath, saveAs:"PLANTILLA_VACACIONES.docx"},function (err, files) {
      
      if (err)
        return res.send(500, err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  },

  findSolicitudes : function(req, res){
      User.find().exec(function(err, miUsuario){listaUsuarios=miUsuario;});
      Solicitudes.find().exec(function(err, sol){

        for(var s=0;s<sol.length;s++){
            for(var e=0;e<listaUsuarios.length;e++){
              if(sol[s].solicitante === listaUsuarios[e].username){
                sol[s].solicitante = listaUsuarios[e].fullname;
              }
            }
            
          } 

          res.json(sol);
      });


  }


};
