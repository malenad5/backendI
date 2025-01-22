
import { Router } from 'express';
import ProductManager from '../fileManager/productManagerMemory.js'; // Importación de ProductManager
const router = Router();
let products = ProductManager.leerProductos();
//let products = new ProductManager(); // Creación de una instancia de ProductManager

// Función para generar IDs únicos
const generateId = (array) => {
    return array.length ? Math.max(...array.map(item => item.id)) + 1 : 1;
};


// Ruta para listar todos los productos con limitación ?limit
router.get('/products', (req, res) => {
    const allProducts = ProductManager.leerProductos(); // Lee los productos iniciales
    const limit = req.query.limit ? parseInt(req.query.limit) : allProducts.length;
    res.json(allProducts.slice(0, limit));
});

// Ruta para obtener un producto por su id
router.get('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = ProductManager.leerProductos().find(p => p.id === pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price } = req.body;
    if (!title || !description || !code || !price) {
        return res.status(400).send('Todos los campos son requeridos');
    }
    const allProducts = ProductManager.leerProductos();
    const newProduct = {
        id: generateId(allProducts),
        title,
        description,
        code,
        price 
    };
    ProductManager.crearProducto(newProduct);
    res.status(201).json(newProduct); 
});

// Ruta para actualizar un producto por su id
router.put('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const { title, description, code, price } = req.body;
    const allProducts = ProductManager.leerProductos();
    const productIndex = allProducts.findIndex(p => p.id === pid);
    if (productIndex !== -1) {
        // Actualizar los campos del producto sin modificar el ID
        if (title) allProducts[productIndex].title = title;
        if (description) allProducts[productIndex].description = description;
        if (code) allProducts[productIndex].code = code;
        if (price) allProducts[productIndex].price = price;
        res.json(allProducts[productIndex]);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Ruta para eliminar un producto por su id
router.delete('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const allProducts = ProductManager.leerProductos();
    const productIndex = allProducts.findIndex(p => p.id === pid);
    if (productIndex !== -1) {
        allProducts.splice(productIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

export default router;













