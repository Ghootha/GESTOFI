/**
 * SolicitudesController
 *
 * @description :: Server-side logic for managing mensajes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	upload: function  (req, res) {
    
    var uploadPath = '../../assets/solicitudes/solicitudesRecibidas';  
    
    req.file('documento').upload({ dirname: uploadPath},function (err, files) {
      if (err)
        return res.send(500, err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }
};
