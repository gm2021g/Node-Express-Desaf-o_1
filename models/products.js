const { promises: fs } = require('fs');

module.exports = class Products {

    //1. constructor
    constructor(ruta) {
        this.ruta = ruta;
    }

    //2. guardar objeto
    async add(obj) {

        const objs = await this.getAll()

        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newObj = { id: newId, ...obj }
        objs.push(newObj)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    //3. Obtener objeto por id

    async get(id) {
        const objs = await this.getAll()
        const buscado = objs.find(o => o.id === +(id))
        return buscado
    }
    /*
        async get(id) {
            const producto = productos.find(producto => producto.id === +id);
            return producto;
        }
    */
    //4. Obtener todos los objetos
    async getAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            // console.log(JSON.parse(objs));
            return JSON.parse(objs)

        } catch (error) {
            return []
        }
    }

    //5. Borrar objeto por ID
    async delete(id) {
        const objs = await this.getAll();

        console.log(id);
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        objs.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {

            throw new Error(`Error al borrar: ${error}`)
        }
    }

    //6. Borrar todos los objetos
    async deleteAll() {
        await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
    }

    //7. Actualizar producto
    async update(objActualizado) {

        //obtengo el rreglo de objetos
        const objs = await this.getAll()

        //busco el indice del objeto a actualizar
        const index = objs.findIndex(o => o.id == objActualizado.idProducto)

        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${objActualizado.idProducto}`)
        }

        //nvo producto
        const nuevoProducto = {
            ...objs[index],
            nombre: objActualizado.nombre,
            descripcion: objActualizado.descripcion,
            codigo: objActualizado.codigo,
            foto: objActualizado.foto,
            precio: objActualizado.precio
        };

        objs[index] = nuevoProducto;

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }

    }
}
