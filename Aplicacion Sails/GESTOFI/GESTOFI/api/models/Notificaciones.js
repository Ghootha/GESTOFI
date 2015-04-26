/**
* Notificaciones.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  autoCreatedAt: false,
  autoUpdatedAt: false,
    

  attributes: {
      duenno:{
          type:'string'
      },
      emisor:{
        type:'string'
      },
      titulo:{
          type: 'string',
          required: true
      },
      leido:{
          type: 'boolean',
          required: true,
		  defaultsTo:false
      },
      tipo:{
        type: 'string',
        required: true
      },
      fecha:{
		  type:'date',
		defaultsTo: function (){ return new Date(); }
	  },
	  mensaje:{
		type:'text'
	  }
  }
  
};