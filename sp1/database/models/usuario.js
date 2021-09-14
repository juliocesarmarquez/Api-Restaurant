const { DataTypes } = require('sequelize');

function creaModelUsuario(connection) {
  const Usuarios = connection.define('Usuarios', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nombreUsuario: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    nombreApellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    login: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    suspendido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },


})
return Usuarios;
}

module.exports = {
creaModelUsuario
}

