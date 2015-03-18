/**
* Reservable.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    autoCreatedAt: false,
    autoUpdatedAt: false,
    //autoPK:false,

  attributes: {
     
      nombre: {
          type: 'string',
          required: true
      },
      tipo: {
          type:'string',
          required:true
      },
      estado:{
          type:'string',
          required:true
      },
      descripcion:{
          type:'string',
          required:true
      },
      codigo:{
          type:'string',
          required:true,
          unique: true

      }

  }
};

