const { Sequelize, DataTypes, ValidationError } = require('sequelize');
function creaProductoModel(connection) {
    const Producto = connection.define('Productos', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },{
        timestamps: false
    });
    return Producto;
}

module.exports = {
    creaProductoModel
}