require('dotenv').config();
const { Sequelize } = require('sequelize');

// TODO: Externalizar las options
const sequelize = new Sequelize(process.env.MARIADB_NAME, process.env.MARIADB_USER, process.env.MARIADB_PASSWORD, {
    host: 'localhost',
    dialect: 'mariadb',
    logging: true,
    logging: console.log,
    logging: (...msg) => console.log(msg)

});

async function authenticate_mariadb() {
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

module.exports = sequelize;