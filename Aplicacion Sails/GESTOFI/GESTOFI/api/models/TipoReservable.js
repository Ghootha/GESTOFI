/**
* TipoReservable.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    autoCreatedAt: false,
    autoUpdatedAt: false,
    

  attributes: {
      nombre:{
          type: 'string',
          required: true,
          unique: true
      }, 

       tipo:{
         	type: 'string',
         	required: true
       }
      
  }
};

