
import fs from 'fs';
class ProductManager {
    static products = [
        { id: 1, title: 'Ciel Noir ', description: 'Perfume de mujer', code: '001', price: 10.000 },
        { id: 2, title: 'Ciel Nuit', description: 'Perfume de mujer', code: '002', price: 12.000},
    ];

    // Almacenar producto en el array
    static crearProducto(product) {
        try {
            ProductManager.products.push(product);
        } catch (error) {
            throw new Error('Error al crear el producto');
        }
    }

    // Leer todos los productos del array
    static leerProductos() {
        try {
            return ProductManager.products;
        } catch (error) {
            throw new Error('Error al leer los productos');
        }
    }

    // Actualizar un producto por su id
    static actualizarProducto(id, updatedProduct) {
        try {
            const index = ProductManager.products.findIndex(p => p.id === id);
            if (index !== -1) {
                ProductManager.products[index] = { ...ProductManager.products[index], ...updatedProduct };
                return ProductManager.products[index];
            }
            return null;
        } catch (error) {
            throw new Error('Error al actualizar el producto');
        }
    }

    // Borrar un producto por su id
    static borrarProducto(id) {
        try {
            const index = ProductManager.products.findIndex(p => p.id === id);
            if (index !== -1) {
                const deletedProduct = ProductManager.products.splice(index, 1);
                return deletedProduct[0];
            }
            return null;
        } catch (error) {
            throw new Error('Error al borrar el producto');
        }
    }
}

export default ProductManager;