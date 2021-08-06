let listadoUsuarios = [
    {
        "id": 1,
        "noUsuario": "admin",
        "noApellido": "Julio César Márquez",
        "mail": "julio@hotmail.com",
        "telefono": 15552855,
        "direccion": "De los ñires 123",
        "contrasena": "acamica",
        "login": true,
        "esAdmin": true,
    }
];

const platos = [{ 
    "id": 1, 
    "detalle": "Pollo Teriyaki", 
    "precio": 730 
},
{    "id": 2, 
     "detalle": "Wok de Arroz", 
     "precio": 550 
},
{    "id": 3, 
     "detalle": "Curry Kare", 
     "precio": 485 
},
{    "id": 4, 
     "detalle": "Tofu Tokan", 
     "precio": 695 
},
{    "id": 5, 
     "detalle": "Niu Rou Mien", 
     "precio": 625 
}];

let formaPago = [
    { "id": 1, "detalle": "tarjeta de credito" },
    { "id": 2, "detalle": "efectivo" },
    { "id": 3, "detalle": "cryptomonedas" }
];

let estadoPedidos = [
    { "id": 1, "estado": "Pendiente" },
    { "id": 2, "estado": "Confirmado" },
    { "id": 3, "estado": "En preparación" },
    { "id": 4, "estado": "Enviado" },
    { "id": 5, "estado": "Entregado" }
];

let listadoPedidos = [];
let historialPedidos = [];

module.exports = { listadoUsuarios, platos, formaPago, estadoPedidos, listadoPedidos, historialPedidos }
