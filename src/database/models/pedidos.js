const { DataTypes } = require('sequelize');


function pedidoModel (connection) {
  const Pedidos = connection.define('Pedidos',{
    estado: {
      type: DataTypes.INTEGER,
    },
    horario: {
      type: DataTypes.DATE,
    },
    metodopago: {
      type: DataTypes.STRING,
    },
    montopago: {
      type: DataTypes.DECIMAL,
    },
    direccion: {
      type: DataTypes.STRING,
    }
  })
  return Pedidos;
}

module.exports = {
  pedidoModel
  }