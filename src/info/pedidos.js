const { platos, listadoPedidos, listadoUsuarios, historialPedidos } = require('./basedatos');

function crearPedido(req, res) {
    const platoId = Number(req.params.platoId);
    const cantidad = req.body.cantidad;
    const fecha = new Date();

    for (let plato of platos) {
       if (plato.id === platoId) {
        const estado = "pendiente";
        const id = listadoPedidos.length + 1;
        const subtotal = plato.precio * cantidad;
        const nuevoPedido = {...req.body, plato, subtotal, fecha, estado, id};
        listadoPedidos.push (nuevoPedido);
        res.status(200).json(listadoPedidos);

        }
    } res.status(406).json(`El producto no existe`);
};









function pagarPedido(req, res) {
    let monto = 0;
    for (let usuario of listadoUsuarios) {
        if (usuario.id === Number(req.headers.userid)) {
            for (let pedido of listadoPedidos) {
                if (pedido.id === Number(req.params.idPedido)) {
                    pedido.metodoPago = req.body.metodoPago;
                    for (let plato of pedido.descripcion) {
                        monto += plato.precio;
                    }
                    pedido.montoPago = monto;
                    pedido.estado = 2;
                    res.status(200).json(`El pedido ${pedido.id} ha sido pagado`);
                }
            }
        }
    }
}

function listarPedidos(req, res) {
    res.status(200).json(listadoPedidos);
}

function verHistorial(req, res) {
    let historialUsuario = [];
    for (let pedidoEntregado of historialPedidos) {
        if (pedidoEntregado.usuarioId === Number(req.headers.userid)) {
            historialUsuario.push(pedidoEntregado);
        }
    }
    res.status(200).json(historialUsuario);
}

function modificarPedido(req, res) {
    for (let pedido of listadoPedidos) {
        if (pedido.id === Number(req.params.idPedido)) {
            pedido.estado = req.body.estado;
            if (pedido.estado === 5) {
                historialPedidos.push(pedido);
                let pedidoIndex = listadoPedidos.indexOf(pedido);
                listadoPedidos.splice(pedidoIndex, 1);
            }
            res.status(200).json(`El estado del pedido ${pedido.id} ha sido modificado a ${pedido.estado}`);
        }
    }
}

function eliminarPedido(req, res) {
    for (let pedido of listadoPedidos) {
        if (pedido.id === Number(req.params.idPedido)) {
            let pedidoIndex = listadoPedidos.indexOf(pedido);
            listadoPedidos.splice(pedidoIndex, 1);
            res.status(200).json(`El pedido ${pedido.id} ha sido eliminado.`);
        }
    }
}

module.exports = { crearPedido, pagarPedido, modificarPedido, listarPedidos, eliminarPedido, verHistorial }
