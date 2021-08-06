const { listadoPedidos, listadoUsuarios, historialPedidos } = require('./basedatos');

class Pedido {
    constructor(id, estado, hora, descripcion, metodoPago, montoPago, usuarioId, direccion) {
        this.id = id;
        this.estado = estado;
        this.hora = hora;
        this.descripcion = descripcion;
        this.metodoPago = metodoPago;
        this.montoPago = montoPago;
        this.usuarioId = usuarioId;
        this.direccion = direccion;
    }
}

function crearPedido(req, res) {
    let nuevoPedido = new Pedido();
    if (listadoPedidos.length === 0) {
        nuevoPedido.id = 1;
    } else {
        nuevoPedido.id = listadoPedidos[listadoPedidos.length - 1].id + 1 ;
    }
    nuevoPedido.estado = 1;
    nuevoPedido.hora = new Date();
    nuevoPedido.usuarioId = Number(req.headers.userid);
    nuevoPedido.descripcion = [];
    for (let usuario of listadoUsuarios) {
        if (usuario.id === Number(req.headers.userid)) {
            nuevoPedido.direccion = usuario.direccion;
            listadoPedidos.push(nuevoPedido);
            res.status(200).json(`El pedido ${nuevoPedido.id} ha sido creado. Ya puede agregar platos al pedido.`);
        }
    }
}

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

module.exports = { crearPedido, pagarPedido, modificarPedido, listarPedidos, eliminarPedido, Pedido, verHistorial }
