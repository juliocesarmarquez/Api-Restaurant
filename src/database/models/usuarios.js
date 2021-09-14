const sequelize = require('../index.js');
const { DataTypes, Model } = require('sequelize');



class usuarioModel extends Model { }
usuarioModel.init({
  nombreUsuario: DataTypes.STRING,
  nombreApellido: DataTypes.STRING,
  direccion: DataTypes.STRING,
  email: DataTypes.STRING,
  telefono: DataTypes.STRING,
  contrasena: DataTypes.STRING,
  admin: DataTypes.BOOLEAN, 
  suspendido: DataTypes.BOOLEAN, 
}, { sequelize, modelName: 'usuarios', underscored: true 
});



module.exports = usuarioModel;