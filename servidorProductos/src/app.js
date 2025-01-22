import express from 'express';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';

const app = express();

//Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Inicializar mi servidor
app.listen(8080, () => {
    console.log("El servidor se encuentra escuchando");
});

//router
app.use('/api/products', productRouter ); //Agrupo los métodos relacionados a inicio y informativos
app.use('/api/carts', cartRouter)



