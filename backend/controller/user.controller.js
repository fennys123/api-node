const modeloUsuarios = require('../models/user.models')


exports.listarUsuarios = async(req,res)=>{
    let listadoProducto = await modeloUsuarios.find({});
    if (listadoProducto)
        res.render('pages/listarProductos', { listadoProducto })
    else
        res.render('pages/listarProductos')

}

exports.consultarUsuarios = async(req,res)=>{
    try {
        // Buscar el producto por el campo `precio`
        const producto = await modeloUsuarios.findOne({ price: req.params.precio });
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.agregarUsuarios = async(req,res)=>{
    try {
        const nuevoProducto = new modeloUsuarios(req.body);
        const producto = await nuevoProducto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ message: 'No se pudo registrar el producto: ' + error.message });
    }
}

exports.actualizarUsuarios = async(req,res)=>{
    try {
        const producto = await modeloUsuarios.findOneAndUpdate(
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

exports.eliminarUsuarios = async(req,res)=>{
    try {
        const producto = await modeloUsuarios.findOneAndDelete({ title: req.params.title });

        if (producto) {
            res.status(200).json({ message: 'Producto eliminado correctamente', producto });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}