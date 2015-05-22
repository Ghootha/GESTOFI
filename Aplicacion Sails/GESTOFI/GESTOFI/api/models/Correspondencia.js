/**
* Correspondencia.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    autoCreatedAt: false,
    autoUpdatedAt: false,

  attributes: {
	  documento: {
		  columnName: 'documento',
		  type: 'string',
		  //foreignKey: true,
		  //references: 'Usuario',
		  //on: 'id'
	  },
	  emisor: {
		  type: 'string'
	  },
	  receptor: {
		  type: 'string'
	  },
	  asunto: {
		  type: 'string',
		  required: true
	  },
	fecha:{
		  type:'date',
		defaultsTo: function (){ return new Date(); }
	  },
	mensaje:{
		type:'text'
	},
      leido:{
        type:'boolean',
          defaultsTo: false
      },
      destinatario: {
		  type:'text'
	  },
	  emisor2: {
		  type: 'text'
	  }
	
  }
};

