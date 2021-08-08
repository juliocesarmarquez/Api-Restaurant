const express = require('express');
const config = require('./config');
const app = express();

//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Mi primera API',
            version: '1.0.0'
        }
    },
    apis: ['./src/app/app.js'],
    tags: [
        {
            name: 'auth',
            description: 'Operaciones sobre autorización'
        },
        {
            name: 'usuarios',
            description: 'Operaciones sobre usuarios'
        },
        {
            name: 'pedidos',
            description: 'Operaciones sobre pedidos'
        },
        {
            name: 'productos',
            description: 'Operaciones sobre productos'
        },
        {
            name: 'formas de pago',
            description: 'Operaciones sobre formas de pago'
        },
    ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());


/////////////////////importar archivos particulares//

const { verUsuarios, eliminarUsuario/* , modificarUsuario */ } = require('../info/usuarios');
const { registraUsuario, loginUsuario } = require('../info/validacion');
const { validAdmin, validaRegistro, validaLogin } =  require('../middlewares/validaciones');
const { midModificarPedido, midIdPedido } = require('../middlewares/pedidos');
const { midMetodoPago, midCrearPago, midIdPago } = require('../middlewares/formapago');
const { crearPedido, confirmarPedido, modificarPedido, eliminarPedido, listarPedidos, verHistorial } = require('../info/pedidos');
const { crearPlato, listarPlatos, modificarPlato, eliminarPlato } = require('../info/platos');
const { crearPago, eliminarFormaPago, modificaFormaPago, verFormaPago } = require('../info/formapago');




/////////////////////validaciones

/**
 * @swagger
 * /registro:
 *  post:
 *    tags: [auth]
 *    summary: usuarios.
 *    description : Listado de usuarios.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: usuario
 *        description: usuario  a crear
 *        schema:
 *          type: object
 *          required:
 *            - noUsuario
 *            - noApellido
 *            - mail
 *            - telefono
 *            - direccion
 *            - contrasena
 *          properties:
 *            noUsuario:
 *              description: Nombre del usuario
 *              type: string
 *              example: manuginobili
 *            noApellido:
 *              description: Nombre y Apellido del usuario
 *              type: string
 *              example: Manuel Ginobili
 *            mail:
 *              description: Correo electrónico del usuario 
 *              type: email
 *              example: manu@ginobili.com
 *            telefono:
 *              description: Telefono del usuario 
 *              type: string
 *              example: 2901543514
 *            direccion:
 *              description: Dirección de envio 
 *              type: email
 *              example: Ushuaia, de los Ñires #3515
 *            contrasena:
 *              description: Contraseña del usuario
 *              type: password
 *              example: La Plata, Calle 7 # 1234
 *    responses:
 *      200:
 *       description: Usuario registrado
 *      401:
 *       description: Usuario no registrado
 *      
 */
app.post('/registro', validaRegistro, registraUsuario);

/**
 * @swagger
 * /login:
 *  post:
 *    tags: [auth]
 *    summary: Login de usuario.
 *    description : Login de usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: datos
 *        description: Nombre y contraseña de usuario a loguearse
 *        schema:
 *          type: object
 *          required:
 *            - username
 *          properties:
 *            username:
 *              description: Nombre de usuario a loguearse.
 *              type: string
 *              example: admin
 *            contrasena:
 *              description: Contraseña de usuario a loguearse 
 *              type: string
 *              example: acamica
 *    responses:
 *      200:
 *       description: Login de usuario satisfactorio. 
 *      401:
 *       description: Usuario no encontrado (email y/o contraseña incorrecta)
 */

app.post('/login', validaLogin, loginUsuario);




//////////////////////usuarios

/**
 * @swagger
 * /usuarios:
 *  get:
 *    summary: Listado de usuarios.
 *    description: Se visualizan los usuarios.
 *    parameters:
 *      - name: userid
 *        in: header
 *        required: true
 *        description: Id del Usuario.
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    responses:
 *       '200':
 *        description: OK
 *       '405':
 *        description: Invalido
 */
app.get('/usuarios', validAdmin, verUsuarios );


//////////////////////platos
/**
 * @swagger
 * /productos:
 *  get:
 *    summary: Listado de los platos.
 *    description: Se visualizan los platos disponibles.
 *    parameters:
 *      - name: userid
 *        in: header
 *        required: true
 *        description: Id del Usuario.
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    responses:
 *       '200':
 *        description: OK
 *       '405':
 *        description: Invalido
 */
app.get("/productos", listarPlatos); 

/**
 * @swagger
 * /productos:
 *  post:
 *    summary: Crear los platos
 *    description: Se crean los platos
 *    parameters:
 *      - name: userid
 *        in: header
 *        required: true
 *        description: Id del Usuario
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              precio: 
 *                type: integer
 *                format: int64
 *                minimum: 1
 *              detalle:
 *                type: string
 *    responses:
 *       '200':
 *        description: OK
 *       '405':
 *        description: Invalido
 */

app.post("/productos", validAdmin, crearPlato); 


app.put("/productos/:platoId", validAdmin, modificarPlato); 



app.delete("/productos/:platoId", validAdmin, eliminarPlato);


//////////////////////pedidos

app.post("/pedidos/:platoId", validaLogin, crearPedido); 

app.get("/pedidos", validAdmin, listarPedidos);

app.post("/pedidos/confirma/:idFormaPago", confirmarPedido);

app.get("/pedidos/historial", verHistorial);

app.put("/pedidos/modifica/:pedidoId", validAdmin,modificarPedido); 





app.delete("/pedidos/:idPedido", validAdmin, midIdPedido, eliminarPedido); 

app.post("/productos/:idPedido/:idProducto",midIdPedido );

app.delete("/productos/:idPedido/:idProducto", midIdPedido);

//////////////////////forma de pago

app.get("/mediosdepago", validAdmin, verFormaPago);

app.post("/mediosdepago", validAdmin, crearPago); 

app.delete("/mediosdepago/:idFormaPago", validAdmin, eliminarFormaPago); 


app.put("/mediosdepago/:idFormaPago", validAdmin, modificaFormaPago);



app.listen(config.port, function () {
    console.log(`Escuchando el puerto ${config.port}!`);
});

