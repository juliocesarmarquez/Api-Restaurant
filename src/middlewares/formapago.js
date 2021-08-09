const { formaPago} = require('../info/basedatos');

function midCrearPago(req, res, next) {
    if (req.body.detalle === null || req.body.detalle === undefined || req.body.detalle === "" ) {
        res.status(401).json("Ingrese nombre de medio de pago");
    } else {
        return next();
    }
}

function midFormaPago(req, res, next) {
    if (Number(req.body.formaPago) < 1 || Number(req.body.formaPago) > formaPago.length) {
        res.status(406).json("forma de pago inválido");
    } else if (req.body.formaPago === null || req.body.formaPago === undefined) {
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
    midFormaPago,
    midIdPago
}
