// Conecta la base de datos
const { getModel } = require("../database/index.js");
// Importación de modelos
const mediosPagoModel = require('../database/models/mediospago');


exports.List = async function (req, res, next) {
    try {
        const todos = await mediosPagoModel.findAll();
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
        medpago = {

            nombre:req.body.nombre

                    };
        console.log(req.body, medpago);
        const resultado = await mediosPagoModel.create(medpago);
        res.json(resultado.toJSON);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};

exports.Update = async function (req, res, next) {
    try {
        medpago = {
            nombre: req.body.nombre
        };
        console.log(req.body, medpago);
        const resultado = await mediosPagoModel.update(medpago, { where: { id: req.params.id } });
        res.json({ status: resultado.toJSON });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
}

exports.Delete = async function (req, res, next) {
    try {
        const resultado = await mediosPagoModel.destroy({
            where: { id: req.params.id }
        });
        console.log(resultado)
        res.json({ resultado: resultado });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};