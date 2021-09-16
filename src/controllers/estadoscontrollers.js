// Conecta la base de datos
/* const sequelize = require('../database/index'); */
const { getModel } = require("../database/index.js");

// Importación de modelos
/* const estadosModel = require('../database/models/estados');
const tableName = 'estados'; */

exports.List = async function (req, res, next) {
    try {
        const todos = await getModel('Estados').findAll();
        console.log(todos);
        res.json(todos);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno', texto: err.message });
    }
};


exports.Add = async function (req, res, next) {
    try {
        const Estados = getModel ('Estados');
        const est = new Estados ({

            nombre:req.body.nombre

                    });
        const resultado = await Estados.create(est);
        res.json(resultado.toJSON);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};
