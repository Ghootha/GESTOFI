/**
 * UserController
 *
 * @description :: Server-side logic for managing tipodocumentoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	upload: function  (req, res) {
    
    var uploadPath = '../../assets/fotoPerfil';  
    console.log(req.param('nomDoc'));
    req.file('documento').upload({ dirname: uploadPath, saveAs:req.param('nomDoc')},function (err, files) {
      if (err)
        return res.send(500, err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  },

  getSeguridadAltaUsers: function  (req, res) {
    User.find({role:['Director','Subdirector','Asistente Administrativa']}).exec(function(err,usuarios){

      var nombres=[];

      for(var i=0; i<usuarios.length; i++){
        nombres[i]=usuarios[i].fullname;
      }

      res.json(nombres);
      //console.log(res.json(nombres));

    });
  }
};