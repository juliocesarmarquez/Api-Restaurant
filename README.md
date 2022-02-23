# Sprint Project 3 - My App Live

#### Detalle

En el marco del Sprint Project 3 del Curso de Desarrollo Web Backend de ACAMICA se trabajo con la API realizada en el Sprint 2 logrando desplegarla a través de la nube de AWS.

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

#### Servicios y software utilizados en Amazon Web Services

* EC2
* RDS
* Load Balancer
* Auto Scaling
* ElastiCache
* S3
* Route53
* CI
* CloudFront
* NGINX
* PM2

#### Instrucciones de instalación:

1. Crear carpeta para su instalación
2. Ingresar a la carpeta creada y desde la consola ejecutar:
    `git clone https://github.com/juliocesarmarquez/dwbe-sprint1-MyApp.git`
3. Ingresar a la carpeta dwbe-sprint1-MyApp 
4. Ejecutar `npm install`
5. Iniciar el servidor ejecutando `npm run start`

#### Ingreso a la consola de AWS:
1. En la carpeta .ZIP se encuentran las credenciales del usuario para el tech reviewer.
2. Iniciar la instancia:
* Conectar la instancia
* Se debe copiar/pegar el comando de ssh para conectarse desde una consola, se deberá utilizar el archivo instance1key.pem para poder acceder.
* En la consola con modo root "#" debe inicializar NGINX con el comando nginx
* Debe salir del modo root 
 ctrl + D
* En el modo User "$" debe dar inicio a la aplicación dirigiendose a la carpeta /App
 cd App/
* Una vez en la carpeta debe iniciar PM2
 pm2 start ecosystem.config.js --env dev
* Luego de esto podrá comprobar funcionamiento en el dominio https://www.juliomarquez.com.ar/ 
* Tambien podrá probar el endpoint https://www.juliomarquez.com.ar/api/productos o testearlo a través de Postman.

#### Continuous Integration
* La integracion continua del proyecto se realiza a través del bucket de S3 cuyo nombre es 'juliobucket'.

* Repositorio: https://gitlab.com/

#### Documentación con SWAGGER:
* Ingresar a la URL http://localhost:3000/api-docs/ o abrir el archivo spec.yml y copiar el contenido en https://editor.swagger.io/

---
*Autor: Julio Cesar Márquez*