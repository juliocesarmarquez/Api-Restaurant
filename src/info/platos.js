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

    } res.status(406).json(`El producto no existe`);
};




function eliminarPlato(req, res) {
    for (let plato of platos) {
        if (plato.id === Number(req.params.platoId)) {
            let platoIndex = platos.indexOf(plato);
            platos.splice(platoIndex, 1);
            res.status(200).json(`El producto ${plato.detalle} ha sido eliminado.`);
        }
    } res.status(406).json(`El producto no existe`);
};

/* function agregarCarrito(req, res) {
    for (let usuario of listadoUsuarios) {
        if (usuario.id === Number(req.headers.userid)) {
            for (let pedido of listadoPedidos) {
                if (pedido.id === Number(req.params.idPedido) && pedido.usuarioId === usuario.id) {
                    for (let plato of platos) {
                        if (plato.id === Number(req.params.idPlato)) {
                            pedido.detalle.push(plato);
                            res.status(200).json(`El producto ${plato.detalle} ha sido agregado al pedido ${pedido.id}`);
                        }
                    }
                }
            }
            res.status(401).json(`El pedido ${req.params.idPedido} no corresponde al usuario ${req.headers.userid}`);
        }
    }
}

function quitarCarrito(req, res) {
    for (let usuario of listadoUsuarios) {
        if (usuario.id === Number(req.headers.userid)) {
            for (let pedido of listadoPedidos) {
                if (pedido.id === Number(req.params.idPedido) && pedido.usuarioId === usuario.id) {
                    for (let plato of pedido.detalle) {
                        if (plato.id === Number(req.params.idPlato)) {
                            let platoIndex = pedido.detalle.indexOf(plato);
                            pedido.detalle.splice(platoIndex, 1);
                            res.status(200).json(`El producto ${plato.detalle} ha sido quitado del pedido`);
                        }
                    }
                    res.status(200).json(`El producto ${req.params.idPlato} no corresponde al pedido ${pedido.id}`);
                }
            }
            res.status(401).json(`El pedido ${req.params.idPedido} no corresponde al usuario ${req.headers.userid}`);
        }
    }
} */

module.exports = { Plato, listarPlatos, crearPlato, modificarPlato, eliminarPlato }
