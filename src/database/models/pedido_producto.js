const { DataTypes } = require('sequelize');



function pedidoProductoModel (connection) {
  const PedidoProd = connection.define('Pedido_Producto',{
    cantidad: {
        type: DataTypes.INTEGER,      
      },
    total: {
        type: DataTypes.INTEGER,      
      },
    
  })
  return PedidoProd;
}

module.exports = {
  pedidoProductoModel
  }

