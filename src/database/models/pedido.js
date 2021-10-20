const { Sequelize, DataTypes, ValidationError } = require('sequelize');

function creaPedidoModel(connection) {
    const Pedidos = connection.define('Pedidos', {
        direccion: {
            type: DataTypes.STRING,
        },
    });

    return Pedidos;
}

module.exports = {
    creaPedidoModel
}