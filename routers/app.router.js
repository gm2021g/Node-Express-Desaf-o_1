const express = require('express');
const rutasProductos = require('./products/products.routes')
const rutasCarrito = require('./cart/cart.routes')

const router = express.Router();

//Definición de rutas
router.use('/productos', rutasProductos);
router.use('/carrito', rutasCarrito);

module.exports = router;
