/**
* Reserva.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    autoCreatedAt: false,
    autoUpdatedAt: false,
    

  attributes: {
     
      idUsuario: {
          type: 'string',
          required: true,
          foreignKey: true,
          references: 'User',
          on: 'username'
      },

      estado:{
        type: 'string',
        required: true
      },

      horaInicio:{
          type:'date',
          required:true
      },
      horaEntrega:{
          type:'date',
          required:true
      },
      fecha:{
          type:'date',
          required:true
      }

  }
};

