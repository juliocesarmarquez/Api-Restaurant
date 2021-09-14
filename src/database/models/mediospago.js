const sequelize = require('../index.js');
const { DataTypes, Model } = require('sequelize');



class mediosPagoModel extends Model { }
mediosPagoModel.init({
  nombre: DataTypes.STRING,
}, { sequelize, modelName: 'mediospago', underscored: true 
});



module.exports = mediosPagoModel;