/**
* Agenda.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    autoCreatedAt: false,
    autoUpdatedAt: false,
    

  attributes: {
	title:{
          type:'string',
          required:true
      },
	  autor:{
          type:'string',
          required:false
      },
	  descripcion:{
			type:'string',
			required:false
      }, 
	  lugar:{
			type:'string',
			required:false
      }, 
	  invitado:{
			type:'string',
			required:false
	  },
	  start:{
          type: 'datetime'
        
      },
	  end:{
          type: 'datetime'
          
      }
  }
};
	  