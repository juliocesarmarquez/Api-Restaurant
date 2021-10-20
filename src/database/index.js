const Sequelize = require('sequelize');
const { creaProductoModel } = require('./models/producto');
const { creaPagosModel } = require('./models/pagos');
const { creaUsuariosModel } = require('./models/usuarios');
const { creaPedidoModel } = require('./models/pedido');
const { creaEstadosModel } = require('./models/estado');
const { creaProductoPedidoModel } = require('./models/productoPedido');

const models = {};
let connectionS = '';
async function connect(host, port, username, password, database) {

  const connection = new Sequelize({
    host,
    port,
    username,
    password,
    database,
    dialect: 'mariadb'
  });

  models.Usuarios = creaUsuariosModel(connection);
  models.Productos = creaProductoModel(connection);
  models.Pagos = creaPagosModel(connection);
  models.Pedidos = creaPedidoModel(connection);
  models.Estados = creaEstadosModel(connection);
  models.ProductoPedidos = creaProductoPedidoModel(connection, models.Productos, models.Pedidos);
  
  
  ///Asociaciones
  
  models.Usuarios.hasMany(models.Pedidos);
  models.Pedidos.belongsTo(models.Usuarios);

  models.Pagos.hasOne(models.Pedidos);
  models.Pedidos.belongsTo(models.Pagos);

  models.Productos.belongsToMany(models.Pedidos, { through: models.ProductoPedidos });
  models.Pedidos.belongsToMany(models.Productos, { through: models.ProductoPedidos });

  models.Estados.hasOne(models.Pedidos);
  models.Pedidos.belongsTo(models.Estados);

  models.Estados.sync();
  models.Usuarios.sync();
  models.Productos.sync();
  models.Pagos.sync();
  models.Pedidos.sync();
  models.ProductoPedidos.sync();
  try {
    await connection.authenticate();
    await connection.sync();
    connectionS = connection;
    console.log('connection has been established successfully');
    return true;
  } catch (error) {
    console.error('unable to connect to the database: ', error);
    return false;
  }
}
function getConnection(){
  return connectionS;
}
function getModel(name) {
  console.log(models)
  if (models[name]) {
    return models[name];
  } else {
   // console.error('Model does not exist');
    return null
  }
}

module.exports = {
  connect, getModel, getConnection
};
