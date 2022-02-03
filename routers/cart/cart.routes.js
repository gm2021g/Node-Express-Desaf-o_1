const express = require('express');
const router = express.Router();
const {
    createCartController,
    deleteCartController,
    getCartController,
    addProductController,
    removeProductController,
} = require('../../controllers/cart.controller');
router.post('/', createCartController); // ok 
router.delete('/:id', deleteCartController); // 
router.get('/:id/productos', getCartController); // 
router.post('/:id/productos/:productId', addProductController); //
router.delete('/:id/productos/:id_prod', removeProductController); // 
module.exports = router;