const { DataTypes } = require('sequelize');


function pedidoModel (connection) {
  const Pedidos = connection.define('Pedidos',{
    horario: {
      type: DataTypes.DATE,
    },
    total: {
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