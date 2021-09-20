// Importación de modelos
const { getModel } = require("../database/index.js");


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
exports.Update = async function (req, res, next) {
    try {
        const Estado = getModel('Medios_Pago')
        const est = {
            nombre: req.body.nombre
        };
        
        const resultado = await Estado.update(est, { where: { id: req.params.id } });
        res.json({ status: resultado.toJSON });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
}

exports.Delete = async function (req, res, next) {
    try {
        const Estado = getModel('Estado')
        const resultado = await Estado.destroy({
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
