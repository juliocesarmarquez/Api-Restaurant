const sequelize = require('./index.js');

const mediosPago = require ('./models/mediospago');
const pedidos = require ('./models/pedidos');
const usuarios = require ('./models/usuarios');
const productos = require ('./models/productos');
const estados = require ('./models/estados');

//uno a uno 
// has one belongsTo

// uno a muchos
// en la tabla de muchos referencia a usuarios

//muchos a muchos
/* 
pedidos.belongsToMany(productos, { through: "pedido_productos"});
productos.belongsToMany(pedidos, { through: "pedido_productos"});  */