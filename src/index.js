const { config } = require('dotenv');
const { connect } = require('./database/index');
const { initialize } = require('./config/db');
const { makeServer } = require('./server');

async function main() {
    config();
    const PORT = process.env.PORT || 5000;
     const {
         DB_USERNAME,
         DB_PASSWORD,
         DB_NAME,
         DB_PORT,
         DB_HOST
     } = process.env;
     const isDBok = await connect(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME);
    initialize();
    const server = makeServer();
    if (isDBok) {
        server.listen(PORT, () => {
            console.log('Servidor DB funcionando...');
        });
    } else {
        console.log('Problemas al cargar servidor DB')
    }
}

main();