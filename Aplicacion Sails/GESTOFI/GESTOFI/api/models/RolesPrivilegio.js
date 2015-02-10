/**
* RolesPrivilegio.js
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
          unique:true,
          primaryKey: true,
          required: true
      },
      idRole: {
          columnName: 'role_id',
          type: 'integer',
          foreignKey: true,
          references: 'Role',
          on: 'id'
      },
      idPrivilegio: {
          columnName: 'privilegio_id',
          type: 'integer',
          foreignKey: true,
          references: 'Privilegio',
          on: 'id'
      }

  }
};

