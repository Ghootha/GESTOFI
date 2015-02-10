/**
* MensajeUsuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK:false,

  attributes: {
      id: {

          type: 'integer',
          autoIncrement: true,
          unique: true,
          primaryKey: true,
          required: true
      },
      idUsuario: {
          columnName: 'usuario_id',
          type: 'string',
          foreignKey: true,
          references: 'Usuario',
          on: 'id'
      },
      idMensaje: {
          columnName: 'mensaje_id',
          type: 'integer',
          foreignKey: true,
          references: 'Mensaje',
          on: 'id'
      }

  }
};

