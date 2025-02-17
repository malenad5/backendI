import express from 'express';
import handlebars from 'express-handlebars';
import methodOverride from 'method-override';
import __dirname from './utils.js'; //Import __dirname para solucionar la creación del path
import mongoose from "mongoose";
import { Server } from 'socket.io';
import {createServer} from 'http';


//Importo los routers
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/product.router.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';

/** Import dotenv  para trabajar con las variables de entorno */
import dotenv from "dotenv";
dotenv.config(); //Nos permite poder trabajar con las variables de entorno
const PORT = process.env.PORT;
const URIMongoDB = process.env.URL_MONGODB;

//Inicializo la constante app para utilizar express
const app = express();

//Configuro mi servidor para trabajar con json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const httpServer = createServer(app);
const io = new Server(httpServer);

//Inicializo mi motor de plantillas y lo configuro
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Seteo de manera estática la carpeta public
app.use(express.static(__dirname + '/public'));

httpServer.listen(8080, () => {
    console.log("El servidor se encuentra escuchando");
});

//Conexión a la base de datos
mongoose.connect(URIMongoDB)
    .then( () => console.log("Conexión realizada con éxito"))
    .catch( (error) => console.error("Error en conexión: ", error));

//Para poder reescribir e interpretar el valor del campo _method de un formulario
app.use(methodOverride('_method'));


//Implemento los routers
app.use('/api/products', productRouter ); 
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter); //Voy a tener todas las vistas, es decir, devuelvo con res.render()
app.use('/product', productsRouter); //Voy a tener las operaciones CRUD pero renderizamos




let productos = [];

app.get('/', (req, res) => {
res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
res.render('realTimeProducts', { productos });
});

app.post('/productos', (req, res) => {
const producto = req.body;
productos.push(producto);
io.emit('actualizarProductos', productos);
res.redirect('/');
});

app.delete('/productos/:id', (req, res) => {
const { id } = req.params;
productos = productos.filter(producto => producto.id !== id);
io.emit('actualizarProductos', productos);
res.sendStatus(204);
});

io.on('connection', (socket) => {
console.log('Nuevo cliente conectado');
});














/*
import express from 'express';
import handlebars from "express-handlebars";
import methodOverride from 'method-override';
import {createServer} from 'http';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import mongoose from "mongoose";


import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/product.router.js';

import dotenv from "dotenv";
dotenv.config();
const URIMongoDB = process.env.URL_MONGODB;
console.log('MongoDB URI:', URIMongoDB);



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views' );
app.set('view engine', 'handlebars');




app.use('/static', express.static(__dirname + 'public'));

//Inicializar mi servidor
httpServer.listen(8080, () => {
    console.log("El servidor se encuentra escuchando");
});

mongoose.connect(URIMongoDB)
.then( () => console.log("Conexión realizada con éxito"))
.catch( (error) => console.error("Error en conexión: ", error));


app.use(methodOverride('_method'));


//router


app.use('/api/products', productRouter ); 
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use('/product', productsRouter);




let productos = [];

app.get('/', (req, res) => {
res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
res.render('realTimeProducts', { productos });
});

app.post('/productos', (req, res) => {
const producto = req.body;
productos.push(producto);
io.emit('actualizarProductos', productos);
res.redirect('/');
});

app.delete('/productos/:id', (req, res) => {
const { id } = req.params;
productos = productos.filter(producto => producto.id !== id);
io.emit('actualizarProductos', productos);
res.sendStatus(204);
});

io.on('connection', (socket) => {
console.log('Nuevo cliente conectado');
});

*/