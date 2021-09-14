const sequelize = require('./database/index.js');

const morgan = require('morgan');

require('dotenv').config();

// Info gestionada en MySQL
const usuarioRouter = require('./routes/usuarios.js');
const mediosPagoRouter = require('./routes/mediospago.js')

// Info de asociaciones
/* asociaciones = require('./models/associations');  */

// Importaciones adicionales
/* const cors = require('cors');

const helmet = require('helmet'); */
const express = require('express');
const app = express();

// Settings
/* app.use(helmet({
    contentSecurityPolicy: true,
})); */

app.use(express.json());
app.use(morgan('combined'));
// Gestión de cors
/* app.use(cors());
app.options('*', cors());
 */

/* app.use('/televisores', televisoresRouter);

app.use('/modelos', modelosRouter); */
app.use('/registro', usuarioRouter)
app.use('/mediospago', mediosPagoRouter)

app.listen(process.env.SERVER_PORT, () => {
    console.log('Servicio iniciado en puerto ' + process.env.SERVER_PORT)
})