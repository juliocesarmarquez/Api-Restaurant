const Sequelize = require("sequelize");
const { creaModelUsuario } = require("./models/usuario.js");
/* const { creaModelMarcas} = require("./models/marcas");
const { creaModelMod } = require("./models/modelos"); */


const models = {};

async function connect(host, port, username, password, database) {
    
    const sequelize = new Sequelize({
        database,
        username,
        password,
        host,
        port,
        dialect: 'mariadb',
    });
    
    models.Usuarios = creaModelUsuario(sequelize);
/*     models.Marcas = creaModelMarcas(sequelize);
    models.Modelos = creaModelMod(sequelize);
     */
    /* models.Televisores.hasMany(models.Marcas);
    models.Marcas.belongsTo(models.Televisores); 
 */
/*     models.Marcas.hasMany(models.Televisores);
    models.Televisores.belongsTo(models.Marcas); 

    models.Marcas.hasMany(models.Modelos);
    models.Modelos.belongsTo(models.Marcas);

    models.Televisores.hasMany(models.Modelos);
    models.Modelos.belongsTo(models.Televisores);
 */
    


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
