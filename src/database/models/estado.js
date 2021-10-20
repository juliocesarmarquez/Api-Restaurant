const { Sequelize, DataTypes, ValidationError } = require('sequelize');
function creaEstadosModel(connection) {
    const Estados = connection.define('Estados', {
        detalle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    },{
        timestamps: false
    });
    return Estados;
}

module.exports = {
    creaEstadosModel
}