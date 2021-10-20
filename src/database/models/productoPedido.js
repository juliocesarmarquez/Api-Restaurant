const { Sequelize, DataTypes } = require('sequelize');


function creaProductoPedidoModel(connection, Productos, Pedidos) {
    const ProductoPedido = connection.define('ProductoPedido', {
        ProductoId: {
            type: DataTypes.INTEGER,
            references: {

                model: Productos,

                key: 'id'
            }
        },
        PedidoId: {
            type: DataTypes.INTEGER,
            references: {
                
                model: Pedidos,

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        cantidad: {
            type: DataTypes.INTEGER,
        },
        total:{
            type: DataTypes.INTEGER,
        },
    }, {
        
        modelName: 'productopedido',
        tableName: 'productopedido'
    });
    return ProductoPedido;
}

module.exports = {
    creaProductoPedidoModel
}