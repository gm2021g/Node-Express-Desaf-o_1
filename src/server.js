const express = require('express')
var Contenedor = require('./Contenedor.js')

const app = express()

const products = new Contenedor('./products.txt')
const carts = new Contenedor('./carts.txt')
/*
app.get('/productos', async (req, res) => {
    console.log("ejecuta productos")
    const prods = await products.getAll()
    res.send(prods)
})


app.get('/carritos', async (req, res) => {
    const carts = await carts.getAll()
    res.send(carts)
})*/

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
