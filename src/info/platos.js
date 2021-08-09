const { listadoUsuarios, platos, listadoPedidos } = require('./basedatos');

class Plato {
    constructor(id, detalle, precio) {
        this.id = id;
        this.detalle = detalle;
        this.precio = precio;
    }
}

function listarPlatos(req, res) {
    res.status(200).json(platos);
}

function crearPlato(req, res) {
    let nuevoPlato = new Plato();
    if (platos.length === 0) {
        nuevoPlato.id = 1;
    } else {
        nuevoPlato.id = platos[platos.length - 1].id + 1;
    }
    nuevoPlato.detalle = req.body.detalle;
    nuevoPlato.precio = req.body.precio;

    platos.push(nuevoPlato);
    res.status(200).json(`El producto ${nuevoPlato.detalle} ha sido creado con éxito.`);
}

function modificarPlato(req, res) {
    const platoId = Number(req.params.platoId)
    for (let plato of platos) {
        if (plato.id === platoId) {
            const pla = platos.indexOf(plato);
            platos[pla].detalle = req.body.detalle;
            platos[pla].precio = req.body.precio;

            res.status(200).json(`El producto ${plato.detalle} ha sido modificado con éxito.`);
        }

    } res.status(401).json(`El producto no existe`);
};

function eliminarPlato(req, res) {
    for (let plato of platos) {
        if (plato.id === Number(req.params.platoId)) {
            let platoIndex = platos.indexOf(plato);
            platos.splice(platoIndex, 1);
            res.status(200).json(`El producto ${plato.detalle} ha sido eliminado.`);
        }
    } res.status(401).json(`El producto no existe`);
};

module.exports = { Plato, listarPlatos, crearPlato, modificarPlato, eliminarPlato }
