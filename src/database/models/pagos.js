const { Sequelize, DataTypes, ValidationError } = require('sequelize');
function creaPagosModel(connection) {
    const Pagos = connection.define('Pagos', {
        detalle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

    }, {
        timestamps: false
    });
    return Pagos;
}

module.exports = {
    creaPagosModel
}