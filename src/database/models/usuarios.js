const { DataTypes } = require('sequelize');



function usuarioModel (connection) {
  const Usuarios = connection.define('Usuarios', {
    nombreUsuario: {
      type: DataTypes.STRING
    },
    nombreApellido: {
      type: DataTypes.STRING
    },
    direccion: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    telefono: {
      type: DataTypes.STRING
    },
    contrasena: {
      type: DataTypes.STRING
    },
    admin: {
      type: DataTypes.BOOLEAN
    },
    suspendido: {
      type: DataTypes.BOOLEAN
    }
  })
  return Usuarios;
}



module.exports = {
  usuarioModel
};