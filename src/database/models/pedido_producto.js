const { DataTypes } = require('sequelize');



function pedidoProductoModel (connection) {
  const Estado = connection.define('Pedido_Producto',{
    cantidad: {
        type: DataTypes.INTEGER,      
      },
    total: {
        type: DataTypes.INTEGER,      
      },
    
  })
  return Estado;
}

module.exports = {
  pedidoProductoModel
  }

