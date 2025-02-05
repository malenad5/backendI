import express from 'express';
import handlebars from "express-handlebars";
import {createServer} from 'http';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';


const app = express();


const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views' );
app.set('view engine', 'handlebars');



//Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(__dirname + 'public'));

//Inicializar mi servidor
httpServer.listen(8080, () => {
    console.log("El servidor se encuentra escuchando");
});

//router
app.use('/api/products', productRouter ); 
app.use('/api/carts', cartRouter);




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

