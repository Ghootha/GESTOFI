/**
 * UserController
 *
 * @description :: Server-side logic for managing tipodocumentoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	upload: function  (req, res) {
    
    var uploadPath = '../../assets/fotoPerfil';  
    
    req.file('file').upload({ dirname: uploadPath, saveAs:'UserPhoto'+req.user.id+".png"},function (err, files) {
      
      if (err)
        return res.send(500, err);

      else{
          return res.json({
          message: files.length + ' file(s) uploaded successfully!',
          files: files
      });   
      }
    });
    
  },
  getSeguridadAltaUsers: function  (req, res) {
    
    Role.find({seguridad:"Alta"}).exec(function(err, roles){
      var nombresRoles=[];
      for(var i=0; i<roles.length;i++){
        nombresRoles[i]=roles[i].nombre;
      }
      User.find({role:nombresRoles}).exec(function(err,usuarios){
        var nombres=[];
          for(var i=0; i<usuarios.length; i++){
            nombres[i]=usuarios[i].fullname;
          }
        res.json(nombres);
      });});


  }
};