// Conecta la base de datos
const { getModel } = require("../database/index.js");
// Importación de modelos


exports.List = async function (req, res, next) {
    try {
        const todos = await getModel('Medios_Pago').findAll();
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
        const Medpago = getModel('Medios_Pago')
        const med = new Medpago ({

            nombre:req.body.nombre

                    });
        const resultado = await med.save();
        res.json(resultado.toJSON);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};

exports.Update = async function (req, res, next) {
    try {
        const Medpago = getModel('Medios_Pago')
        const med = {
            nombre: req.body.nombre
        };
        
        const resultado = await Medpago.update(med, { where: { id: req.params.id } });
        res.json({ status: resultado.toJSON });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
}

exports.Delete = async function (req, res, next) {
    try {
        const Medpago = getModel('Medios_Pago')
        const resultado = await Medpago.destroy({
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