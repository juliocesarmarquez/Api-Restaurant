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
const estadosRouter = require('./routes/estados.js');
const loginRouter = require('./routes/login.js');

// Middlewares
const { authRegistro } = require('./middlewares/auth');


// Info de asociaciones
/* const asociaciones = require('../src/database/asociaciones.js'); */

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
        app.use('/registro',authRegistro, registroRouter );
        app.use('/usuarios', usuarioRouter);     
        app.use('/login', loginRouter);
        app.use('/mediospago', mediosPagoRouter);
        app.use('/productos', productosRouter);
        app.use('/pedidos', pedidosRouter ); 
        app.use('/estados', estadosRouter);

        app.listen(SERVER_PORT, () => {
            console.log('Server is running...');
        })
    } catch (error) {
        console.log("No pudo cargar la base de datos", error);
    }

}

main();