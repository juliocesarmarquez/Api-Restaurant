const sequelize = require('../../database/index.js');
const { DataTypes, Model } = require('sequelize');



class pedidoModel extends Model { }
pedidoModel.init({
  estado: DataTypes.NUMBER,
  hora: DataTypes.DATE,
  metodopago: DataTypes.STRING,
  montopago: DataTypes.NUMBER,
  usuarioId: DataTypes.STRING,
  direccion: DataTypes.STRING,
}, { sequelize, modelName: 'pedidos', underscored: true 
});



module.exports = pedidoModel;