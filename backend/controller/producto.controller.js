const modeloProducto = require('../models/productos.models')


exports.listarProductos = async(req,res)=>{
    let listadoProducto = await modeloProducto.find({});
    if (listadoProducto)
        res.render('pages/listarProductos', { listadoProducto })
    else
        res.render('pages/listarProductos',{"mensaje":"no hay datos disponibles"})

}

exports.consultarProductos = async(req,res)=>{
    try {
        // Buscar el producto por el campo `precio`
        const producto = await modeloProducto.findOne({ price: req.params.precio });
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.agregarProductos = async(req,res)=>{
    try {
        const nuevoProducto = new modeloProducto(req.body);
        const producto = await nuevoProducto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ message: 'No se pudo registrar el producto: ' + error.message });
    }
}

exports.actualizarproductos = async(req,res)=>{
    try {
        const producto = await modeloProducto.findOneAndUpdate(
            { title: req.params.title }, req.body, { new: true });

        if (producto) {
            res.status(200).json({ message: 'Producto actualizado correctamente', producto });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

exports.eliminarproducto = async(req,res)=>{
    try {
        const producto = await modeloProducto.findOneAndDelete({ title: req.params.title });

        if (producto) {
            res.status(200).json({ message: 'Producto eliminado correctamente', producto });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

