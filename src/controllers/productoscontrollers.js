// Conecta la base de datos
const sequelize = require('../database/index');

// Importación de modelos
const { getModel } = require("../database/index.js");
const { storeObjectInCache, cache, invalidateCache,
} = require('../middlewares/cacheProductos')

exports.List = async function (req, res, next) {
    try {
        const todos = await getModel('Productos').findAll();
        storeObjectInCache(req, data);

        console.log(todos);
        res.status(200).json(todos);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno', texto: err.message });
    }
};


exports.Add = async function (req, res, next) {
    try {
        const Productos = getModel('Productos');
        const prod = new Productos({
            precio: req.body.precio,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion

        });
        console.log(req.body, prod);
        const resultado = await prod.save();
        if (resultado) {
            invalidateCache({
                method: 'GET',
                baseUrl: req.baseUrl,
            });
            res.status(201).json(resultado);
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};

exports.Update = async function (req, res, next) {
    try {
        const Producto = getModel('Productos');
        const prod = ({
            precio: req.body.precio,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        });
        console.log(req.body, prod);
        const resultado = await Producto.update(prod, { where: { id: req.params.id } });
        res.json({ status: resultado.toJSON });
        if (resultado) {
            invalidateCache({
                method: 'GET',
                baseUrl: req.baseUrl,
            });
            res.status(200).send('Product updated');
        } else {
            res.status(404).send(`Product with ID ${req.params.id} does not exist.`);
        }
    }


    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
}

exports.Delete = async function (req, res, next) {
    try {
        const Productos = getModel('Productos');
        const resultado = await Productos.destroy({
            where: { id: req.params.id }
        });
        if (data) {
            invalidateCache({
                method: 'GET',
                baseUrl: req.baseUrl,
            });
            res.status(200).send('Product deleted');
        } else {
            res.status(404).send(`Product with ID ${req.params.id} does not exist.`);
        }
        console.log(resultado)
        res.json({ resultado: resultado });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};