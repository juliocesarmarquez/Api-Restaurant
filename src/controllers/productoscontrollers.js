// Conecta la base de datos
const sequelize = require('../database/index');

// Importación de modelos
const { getModel } = require("../database/index.js");

exports.List = async function (req, res, next) {
    try {
        const todos = await productoModel.findAll();
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
        prod = {
            precio:req.body.precio,
            nombre:req.body.nombre,
            descripcion:req.body.descripcion

                    };
        console.log(req.body, prod);
        const resultado = await productoModel.create(prod);
        res.json(resultado.toJSON);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};

exports.Update = async function (req, res, next) {
    try {
        prod = {
            precio:req.body.precio,
            nombre:req.body.nombre,
            descripcion:req.body.descripcion
        };
        console.log(req.body, prod);
        const resultado = await productoModel.update(prod, { where: { id: req.params.id } });
        res.json({ status: resultado.toJSON });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
}

exports.Delete = async function (req, res, next) {
    try {
        const resultado = await productoModel.destroy({
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