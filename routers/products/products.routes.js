const express = require('express');
const router = express.Router();
const {
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController
} = require('../../controllers/products.controller');
router.get('/:idProducto?', getProductsController);
router.post('/', addProductController);
router.put('/:idProducto', updateProductController);
router.delete('/:idProducto', deleteProductController);
module.exports = router;