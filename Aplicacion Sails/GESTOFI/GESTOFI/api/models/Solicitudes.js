/**
* Solicitudes.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    autoCreatedAt: false,
    autoUpdatedAt: false,
    

  attributes: {
     
      nombre: {
           type:'string',
          required:true
      },
      
      fecha:{
          type:'datetime',
          defaultsTo: function (){ return new Date();}
      },

      estado:{
          type:'string',
          required:true
      },

      solicitante:{
          type:'string',
          required:true,
          foreignKey: true,
          references: 'User',
          on: 'username'
      },
      
      ruta:{
          type:'string',
          required:true
      }


  }
};