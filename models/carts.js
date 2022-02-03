const fs = require('fs/promises');

var Products = require('../models/Products');
var products = new Products('./data/products.txt');

const filePath = './data/';
const fileName = 'carts.txt'

class Cart {
    async getFileData() {
        try {
            const data = await fs.readFile(`${filePath}${fileName}`, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('getFileData() error:', error.message);
            return error;
        }
    }
    async saveFileData(data) {
        try {
            await fs.writeFile(`${filePath}${fileName}`, JSON.stringify(data, null, 2));
            return data;
        } catch (error) {
            console.error('saveFileData() error:', error.message);
            return error;
        }
    }
    async createCart() {
        const data = await this.getFileData();
        const timestamp = Date.now();

        const newId = data[data.length - 1].id + 1;

        const cart = { id: newId, timestamp, products: [] };
        data.push(cart);
        await this.saveFileData(data);
        return cart.id;
    }
    async deleteCart(id) {
        const data = await this.getFileData();
        const index = data.findIndex(cart => cart.id === parseInt(id));
        if (index < 0) return { error: `Cart with id ${id} not found` };
        data.splice(index, 1);
        return await this.saveFileData(data);
    }
    async getCart(id) {
        const data = await this.getFileData();
        const cart = data.find(cart => cart.id === parseInt(id));
        if (cart) return cart;
        return { error: `Cart with id ${id} not found` };
    }
    async addProduct(cartId, productId) {
        const data = await this.getFileData();
        const cart = data.find(cart => cart.id === parseInt(cartId));

        if (!cart) return { error: `Cart with id ${cartId} not found` }
        //   const products = new Products('./data/products.txt');
        const product = await products.get(productId);
        // if (product.error) return { error: `Product with id ${productId} not found` }

        cart.products.push(product);
        await this.saveFileData(data);
        return cart;
    }
    async removeProduct(cartId, productId) {
        const data = await this.getFileData();
        const cart = data.find(cart => cart.id === parseInt(cartId));
        if (!cart) return { error: `Cart with id ${cartId} not found` };
        const productIndex = cart.products.findIndex(product => product.id === parseInt(productId));
        cart.products.splice(productIndex, 1);
        await this.saveFileData(data);
        return cart;
    }
}
module.exports = Cart;