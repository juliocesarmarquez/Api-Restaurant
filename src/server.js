const express = require('express');
const passport = require('passport');
const session = require('express-session');


//routers importados
const { router } = require('./routers/auth');
const { creaUsuariosRouter } = require('./routers/usuarios');
const { creaProductosRouter } = require('./routers/productos');
const { creaPagosRouter } = require('./routers/pagos');
const { creaPedidosRouter } = require('./routers/pedido');
const { creaEstadosRouter } = require('./routers/estados');

const helmet = require('helmet');

//swagger
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const { makeRouter: makeUsersRouter } = require('../test/testUsuario');
function loadSwaggerinfo(server) {
    try {
        const doc = yaml.load(fs.readFileSync('./src/spec.yml', 'utf8'));
        server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
    } catch (e) {
        console.log(e);
    }
};
function makeServer() {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(session({secret:'pass'}))
    server.use(passport.initialize())
    server.use(passport.session())
    server.use(helmet());
    server.use('/api', creaProductosRouter());
    server.use('/api', creaUsuariosRouter());
    server.use('/api', creaPagosRouter());
    server.use('/api', creaPedidosRouter());
    server.use('/api', creaEstadosRouter());
    server.use('/api/testusuario', makeUsersRouter());
    server.use('/api', router);
    loadSwaggerinfo(server);
    return server;
}
module.exports = {
    makeServer,
};