var Products = require('../models/Products');
const products = new Products('./data/products.txt');

const IS_ADMIN = true;

const getProductsController = async (req, res) => {
    let response;
    const id = req.params.idProducto;
    if (id) {
        response = await products.get(id);
    } else {
        response = await products.getAll();
    }

    if (!response) return res.status(400).json({ error: `Producto con id ${id} no encontrado` })
    if (!IS_ADMIN) return res.status(400).json({ error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })

    return res.json(response);
};

const addProductController = async (req, res) => {

    if (!IS_ADMIN) return res.status(400).json({ error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })

    const { title, description, code, price, thumbnail, stock } = req.body;
    const timestamp = Date.now();

    const nuevoProducto = {
        timestamp,
        title,
        description,
        code,
        price,
        thumbnail,
        stock
    }

    let guardar = products.add(nuevoProducto);

    guardar.then((data) => {
        res.json(nuevoProducto)
    })
        .catch((err) => {
            return res.status(400).json({ error: `${err}` })
        })
}

const updateProductController = async (req, res) => {

    if (!IS_ADMIN) return res.status(401).send({ error: 401, message: `Error 401. You are not authorized to access to path: ${req.originalUrl} using method: ${req.method}.` });

    const { idProducto } = req.params;
    const { title, description, code, price, thumbnail, stock } = req.body;

    const productoActualizar = {
        title,
        description,
        code,
        price,
        thumbnail,
        stock,
        idProducto
    }

    let actualizar = products.update(productoActualizar);

    actualizar.then((data) => {
        res.json(productoActualizar)
    })
        .catch((err) => {
            return res.status(400).json({ error: `${err}` })
        })

}

const deleteProductController = async (req, res) => {

    if (!IS_ADMIN) return res.status(400).json({ error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })

    const { idProducto } = req.params;
    let borrar = products.delete(idProducto);

    borrar.then(() => {
        res.json({ mensaje: "producto eliminado" })
    })
        .catch((err) => {
            return res.status(400).json({ error: `${err}` })
        })
}

module.exports = {
    products,
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController,
    IS_ADMIN
}