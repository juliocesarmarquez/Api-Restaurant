const { formaPago} = require('../info/basedatos');

function midCrearPago(req, res, next) {
    if (req.body.nombre === null || req.body.nombre === undefined) {
        res.status(401).json("Ingrese nombre de medio de pago");
    } else {
        return next();
    }
}

function midMetodoPago(req, res, next) {
    if (Number(req.body.metodoPago) < 1 || Number(req.body.metodoPago) > formaPago.length) {
        res.status(406).json("Metodo de pago inválido");
    } else if (req.body.metodoPago === null || req.body.metodoPago === undefined) {
        res.status(406).json("Ingrese método de pago");
    } else {
        return next();
    }
}

function midIdPago(req, res, next) {
    if (Number(req.params.idMedioPago) < 1 || Number(req.params.idMedioPago) > formaPago.length) {
        res.status(406).json("Id de medio de pago inválido");
    } else {
        return next();
    }
}

module.exports = {
    midCrearPago,
    midMetodoPago,
    midIdPago
}
