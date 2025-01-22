import {Router} from 'express';
const router = Router();

let carts = [];

import ProductManager from '../fileManager/productManagerMemory.js'; // Importación de ProductManager
let products = ProductManager.leerProductos();

// Función para generar IDs únicos
const generateId = (array) => {
    return array.length ? Math.max(...array.map(item => item.id)) + 1 : 1;
};
// Ruta para crear un nuevo carrito
router.post('/carts/1', (req, res) => {
    const newCart = {
        id: generateId(carts),
        products: []
    };

    carts.push(newCart);
    res.status(201).json(newCart);
});

// Ruta para listar los productos de un carrito por su id
router.get('/api/carts/:cid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = carts.find(c => c.id === cid);

    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

// Ruta para agregar un producto a un carrito
router.post('/api/carts/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const cart = carts.find(c => c.id === cid);
    const product = products.find(p => p.id === pid);

    if (cart && product) {
        const cartProduct = cart.products.find(p => p.product === pid);

        if (cartProduct) {
            cartProduct.quantity += 1; // Incrementar la cantidad del producto existente
        } else {
            cart.products.push({ product: pid, quantity: 1 }); // Agregar nuevo producto con cantidad 1
        }

        res.status(201).json(cart);
    } else {
        res.status(404).send('Carrito o producto no encontrado');

    }
});



export default router;