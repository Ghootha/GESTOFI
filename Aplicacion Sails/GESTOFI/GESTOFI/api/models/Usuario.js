/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      id: {

          type: 'string',
          primaryKey: true,
          required: true
      },
      nombre: {
          type: 'string',
          required: true
      },
      email: {
        type:'email',
        required:true
      },
      tipo:{
          type:'string',
          required:true
      },
      contraseña:{
          type:'string',
          required: true
      },
      descripcion:{
          type:'string',
          required:true
      }
  }
};
