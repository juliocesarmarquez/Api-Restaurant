const { formaPago } = require('./basedatos');

class pagos {
    constructor(id, detalle) {
        this.id = id;
        this.detalle = detalle;
    }
}

function crearPago(req, res) {
    let nuevoPago = new pagos();
    if (formaPago.length === 0) {
        nuevoPago.id = 1;
    } else {
        nuevoPago.id = formaPago[formaPago.length - 1].id + 1 ;
    }
    nuevoPago.detalle = req.body.detalle;
    formaPago.push(nuevoPago);
    res.status(200).json(`El medio de pago ${nuevoPago.detalle} fue creado correctamente.`);
}

function verFormaPago(req, res) {
    res.status(200).json(formaPago);
}

function eliminarFormaPago(req, res) {
    for (let medio of formaPago) {
        if (medio.id === Number(req.params.idFormaPago)) {
            let medioIndex = formaPago.indexOf(medio);
            formaPago.splice(medioIndex, 1);
            res.status(200).json(`El medio de pago ${medio.detalle} ha sido eliminado correctamente.`);
        }
    }
}

function modificaFormaPago(req, res) {
    for (let medio of formaPago) {
        if (medio.id === Number(req.params.idFormaPago)) {
            medio.detalle = req.body.detalle;
            res.status(200).json(`El medio de pago ${medio.id} ha sido modificado correctamente.`);
        }
    }
}

module.exports = { pagos, crearPago, verFormaPago, eliminarFormaPago, modificaFormaPago  }
