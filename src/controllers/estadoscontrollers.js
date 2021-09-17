
const { getModel } = require("../database/index.js");

// Importación de modelos
const estadosModel = require('../database/models/estados');
/* const tableName = 'estados'; */ 

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
        const Estado = getModel ('Estados');
        const est = new Estado ({

            nombre:req.body.nombre

                    });
        const resultado = await est.save();
        res.json(resultado.toJSON);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};
