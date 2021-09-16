const { DataTypes } = require('sequelize');


function productoModel (connection){
  const Productos = connection.define ('Productos', {
    precio: {
      type: DataTypes.DECIMAL
    },
    nombre: {
      type: DataTypes.STRING
    },
    descripcion: {
      type: DataTypes.STRING
    }
  })
  return Productos;
}


module.exports = {
  productoModel
};