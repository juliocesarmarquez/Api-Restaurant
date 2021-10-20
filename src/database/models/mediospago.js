const { DataTypes } = require('sequelize');



function mediosPagoModel (connection) {
  const medPagos = connection.define('Medios_Pago',{
    nombre: { 
    type: DataTypes.STRING
    
    }
    
  })
return medPagos;
}





module.exports = {
  mediosPagoModel
  }



