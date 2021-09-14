const sequelize = require('../index.js');
const { DataTypes, Model } = require('sequelize');



class productoModel extends Model { }
productoModel.init({
  precio: DataTypes.NUMBER,
  nombre: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  
}, { sequelize, modelName: 'precios', underscored: true 
});



module.exports = productoModel;