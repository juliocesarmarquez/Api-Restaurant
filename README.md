# Sprint Project 4 - My App Full

#### Detalle

En el marco del Sprint Project 4 del Curso de Desarrollo Web Backend de ACAMICA se trabajo con el proyecto final de lo aprendido a lo largo de este curso.

#### Tecnologias utilizadas:

* Git
* NodeJS
* Express
* Moment
* JWT (Json Web Token)
* Crypto
* Helmet
* Swagger
* Dotenv
* Mariadb / Sequelize
* Redis


#### Instrucciones de instalación:

1. Crear carpeta para su instalación
2. Ingresar a la carpeta creada y desde la consola ejecutar:
    `git clone https://github.com/juliocesarmarquez/dwbe-sprint1-MyApp.git`
3. Ingresar a la carpeta dwbe-sprint1-MyApp 
4. Ejecutar `npm install`
5. #### Configurar las variables de entorno
 - Agregar las variables de entorno locales en el archivo .env.example y cambiar su nombre por .env:   
    * PORT: Puerto utilizado para iniciar servidor.
    * DB_USERNAME: Nombre de usuario de base de datos.
    * DB_PASSWORD: Contraseña de base de datos.
    * DB_NAME: Nombre de la base de datos.
    * DB_PORT: Puerto donde funciona la base de datos
    * DB_HOST: Nombre del host de la base de datos (localhost)
    * JWT_SECRET: Clave para encriptar datos de JWT
    * PAYPAL_SECRET= variables entorno Paypal
    * PAYPAL_API= variables entorno Paypal
    * PAYPAL_CLIENTID= variables entorno Paypal

 - Crear variables de entorno en el archivo .env.docker.example y cambiar su nombre por env.docker para luego levantar el contenedor con el comando `docker-compose up`
6. (Opcional) Ejecutar script sql ubicado en la carpeta sql que contiene la base de datos.
7. Iniciar el servidor ejecutando `npm run start`
8. Ejecutar el test con el comando `npm test` 


#### Documentación con SWAGGER:
* Ingresar a la URL http://localhost:3000/api-docs/ para realizar pruebas localmente.


#### Pruebas con POSTMAN:
* Ingresar a Postman, importar la colección "sprint4" que se encuentra incluido en la carpeta enviada. Las pruebas son con el dominio https://www.juliomarquez.com.ar
* Como usar API:
1. Iniciar sesión https://www.juliomarquez.com.ar/api/login/auth0 y elegir el proveedor de identidad que desee.
2. Si su inicio de sesión es satisfactorio recibira un token.
3. Para realizar un pedido debe utilizar en Authorization: Bearer (token obtenido al iniciar sesión) 
4. Realizar el pago del pedido. Se debe enviar el numero del pedido. Se recibirá una serie de links, debera elegir el que se llama "APPROVE".
5. Debera acceder a Paypal con las credenciales de prueba que se encuentran en la carpeta enviada
6. Una vez realizado el pago se podra corroborar en el usuario sandbox Paypal vendedor que tambien se encuentra en la carpeta enviada.






---
*Autor: Julio Cesar Márquez*