/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

// myApp/api/controllers/FileController.js

module.exports = {

  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="webservice/file/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  upload: function  (req, res) {
    console.log("en upload");    
    //var uploadPath = 'D:/Documentos/vhosts/GESTOFI/documentos';
    var uploadPath = '../../assets/documents';  
    
    req.file('file').upload({ dirname: uploadPath},function (err, files) {
      if (err)
        return res.send(500, err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  },
  download: function (req, res){
       console.log("en download"); 
    req.validate({
      id: 'string'
    });

    Documento.findOne(req.param('id')).exec(function (err, documento){
      if (err) return res.negotiate(err);
      if (!documento) return res.notFound();

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk();

      // Stream the file down
      fileAdapter.read(documento.ruta)
      .on('error', function (err){
        return res.serverError(err);
      })
      .pipe(res);
    });
  },
  update: function  (req, res) {
    console.log("en update");

    req.validate({
      id: 'string'
    });    
    
    var uploadPath = '../../assets/documents';  
    
    
    Documento.findOne(req.param('id')).exec(function (err, documento){
      if (err) return res.negotiate(err);
      if (!documento) return res.notFound();
      
      var nameHashed = documento.ruta;

      req.file('file').upload({ dirname: uploadPath, saveAs:nameHashed },function (err, files) {
          if (err)
            return res.send(500, err);

          return res.json({
            message: files.length + ' file(s) updated successfully!',
            files: files
          });
        });
      
    });
  }
   
  

};