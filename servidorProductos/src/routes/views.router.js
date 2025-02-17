import { Router } from 'express';

const router = Router();

router.get('/', (req,res) => {
    res.render('index');
})

router.get('/crearProducto', (req,res) => {
    res.render('newProduct');
})

router.get('/products', (req,res) => {
    res.render('products');
})

router.get('/product', (req,res) => {
    res.render('product');
})

export default router;