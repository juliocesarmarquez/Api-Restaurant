const { formaPago} = require('../info/basedatos');

function midCrearPago(req, res, next) {
    if (req.body.detalle === null || req.body.detalle === undefined || req.body.detalle === "" ) {
        res.status(401).json(`Ingrese nombre de medio de pago`);
    } else {
        return next();
    }
}


module.exports = { midCrearPago }
