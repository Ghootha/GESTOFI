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
		  type: 'string'
	  },
	  emisor: {
		  type: 'string',
		  required: true
	  },
	  receptor: {
		  type: 'string',
		  required: true
	  },
	  asunto: {
		  type: 'string'
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
		  type:'text',
		  required = true;
	  },
	  emisor2: {
		  type: 'text',
		  required = true;
	  }
	
  }
};

