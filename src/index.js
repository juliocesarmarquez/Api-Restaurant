const express = require("express");
const {connect} = require('./database/index.js');
const morgan = require('morgan');
const dotenv = require("dotenv");


// Info gestionada en MySQL
const usuarioRouter = require ('./routes/usuarios.js')
const registroRouter = require('./routes/registro.js');
const mediosPagoRouter = require('./routes/mediospago.js');
const productosRouter = require('./routes/productos.js');
const pedidosRouter = require('./routes/pedidos.js');
const pedidosRouterAdm = require('./routes/pedidosAdmin.js')
const estadosRouter = require('./routes/estados.js');
const loginRouter = require('./routes/login.js');

// Middlewares
const { authRegistro, authLogin, midSuspendido, authAdmin, authUsuario, verificaToken } = require('./middlewares/auth');

//swaggerUI
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

function loadSwaggerinfo(app) {
    try {
        const doc = yaml.load(fs.readFileSync('./src/spec.yaml', 'utf8'));
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
    } catch (e) {
        console.log(e);
    }
};

// Info de asociaciones

const { makeRouter: makeUsersRouter } = require('../src/test/uTest');


// Importaciones adicionales
/* const cors = require('cors');

const helmet = require('helmet'); */
/* const express = require('express');
const app = express(); */

// Settings
/* app.use(helmet({
    contentSecurityPolicy: true,
})); */



async function main() {
    
    dotenv.config();
    const app = express();
    app.use(express.json());
    app.use(morgan('combined'));

    const SERVER_PORT = process.env.SERVER_PORT;
    const MARIADB_PORT = process.env.MARIADB_PORT;
    const MARIADB_USER = process.env.MARIADB_USER;
    const MARIADB_PASSWORD = process.env.MARIADB_PASSWORD;
    const MARIADB_HOST = process.env.MARIADB_HOST;
    const MARIADB_NAME = process.env.MARIADB_NAME;

    try {
        await connect(MARIADB_HOST, MARIADB_PORT, MARIADB_USER, MARIADB_PASSWORD, MARIADB_NAME);
        app.use('/api/registro',authRegistro, registroRouter );
        app.use('/api/login', authLogin, /* midSuspendido, */loginRouter);
        app.use('/api/productos', authUsuario/* authAdmin */, productosRouter);
        app.use('/api/mediospago', authAdmin,mediosPagoRouter);
        app.use('/api/admin/pedidos', authAdmin, pedidosRouterAdm );
        app.use('/api/pedidos',authLogin, pedidosRouter ); 
        app.use('/api/historial',authLogin, pedidosRouter );
        app.use('/api/usuarios',  authAdmin, usuarioRouter);     
        app.use('/api/estados', authAdmin, estadosRouter);
        app.use('/api/usuariotest', makeUsersRouter());
        loadSwaggerinfo(app);

        app.listen(SERVER_PORT, () => {
            console.log('Server is running...');
        })
    } catch (error) {
        console.log("No pudo cargar la base de datos", error);
    }

}

main();

module.exports = {main}; 