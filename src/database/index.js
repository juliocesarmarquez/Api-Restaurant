require('dotenv').config();
const  Sequelize  = require('sequelize');
const { estadoModel } = require ('../database/models/estados')
const { pedidoModel } = require ('../database/models/pedidos')
const { mediosPagoModel } = require ('../database/models/mediospago')
const { productoModel } = require ('../database/models/productos')
const { usuarioModel } = require ('../database/models/usuarios')
const { pedidoProductoModel } = require ('../database/models/pedido_producto')



const models = {};

async function connect(host, port, username, password, database) {
    
    const sequelize = new Sequelize({
        database,
        username,
        password,
        host,
        port,
        dialect: process.env.DIALECT_DB,
    });

    models.Estados = estadoModel(sequelize);
    models.Pedidos = pedidoModel(sequelize);
    models.mediosPago = mediosPagoModel(sequelize);
    models.Productos = productoModel(sequelize);
    models.Usuarios = usuarioModel(sequelize);
    models.pedidoProducto = pedidoProductoModel(sequelize);

    //require through options, pass either a string or a model
    
    models.Usuarios.hasMany(models.Pedidos);
    models.Pedidos.belongsTo(models.Usuarios);

    models.Productos.hasMany(models.Pedidos);
    models.Pedidos.belongsTo(models.Productos);

    models.Estados.hasMany(models.Pedidos);
    models.Pedidos.belongsTo(models.Estados);

    models.mediosPago.hasMany(models.Pedidos);
    models.Pedidos.belongsTo(models.mediosPago);

    


    //relacion con tabla intermedia
    models.Pedidos.belongsToMany(models.Productos, {through: models.pedidoProducto});
    models.Productos.belongsToMany(models.Pedidos, {through: models.pedidoProducto});



    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

function getModel(name) {
    if (models[name]) {
        return models[name];
    } else {
        console.error(`Model ${name} does not exists.`);
        return null;
    }
}

module.exports = {
    connect,
    getModel
};





// TODO: Externalizar las options
/* const sequelize = new Sequelize(process.env.MARIADB_NAME, process.env.MARIADB_USER, process.env.MARIADB_PASSWORD, {
    host: process.env.MARIADB_HOST,
    dialect: process.env.DIALECT_DB,
    logging: true,
    logging: console.log,
    logging: (...msg) => console.log(msg)

});

async function authenticate_mariadb() { */
    

/*     models.pedidos = pedidoModel(sequelize);
    models.productos = productoModel(sequelize);

    models.pedidos.belongsToMany(models.productos);
    models.productos.belongsToMany(models.pedidos); */
/*     
    try {
        await sequelize.authenticate();
        console.log('Conectado a base de datos MariaDB.');
        await sequelize.sync({ force: false });
        console.log('Sincronización de base de datos satisfactoria');
    } catch (error) {
        console.error('Error en conexión a base de datos MariaDB:', error);
    }
};

authenticate_mariadb();

module.exports = sequelize; */