/**
* ReservaEquipo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {


    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {
     
        estado:{
            
            type: 'string',
            required: true

        },

        idReserva: {
            columnName: 'reserva_id',
            required: true,
            type: 'integer',
            foreignKey: true,
            references: 'Reserva',
            on: 'id'
        },
        idReservable: {
            columnName: 'reservable_id',
            required: true,
            type: 'integer',
            foreignKey: true,
            references: 'Reservable',
            on: 'id'
        }



    }
};

