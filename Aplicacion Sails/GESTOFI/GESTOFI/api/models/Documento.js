/**
* Documento.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    autoCreatedAt: false,
    autoUpdatedAt: false,
    

  attributes: {

      fecha:{
          type: 'datetime',
          defaultsTo: function (){ return new Date(); }
      },
      nombre:{
          type:'string',
          required:true
      },
      codigo:{
        type:'string',
        unique: true
      },
      Role: {
        type:'string',
          /*columnName: 'role_id',
          type: 'integer',
          foreignKey: true,
          references: 'Role',
          on 'id'*/
          
          defaultsTo: 'Director'
      }, 
      tipo:{
        type:'string',
        required:true
      },  
      clasificacion:{
        type:'string',
        required:true
      },   
      seguridad: {
          type:'string',
          defaultsTo:'minima'
      },  
      duenno:{
        type:'string'      
      },    
      ruta:{
          type:'string',
          defaultsTo:'documentos/doc.pdf'          
      }
  }
};
