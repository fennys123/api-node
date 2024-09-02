const modeloCliente = require('../models/cliente.models')

exports.listarPedidos = async(req,res)=>{
    try {
        const pedidos = await pedidoModel.find({}).populate('cliente').populate('carrito.producto');
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.consultarPedidos = async(req,res)=>{
    try {
        // Busca el pedido por el nombre del cliente
        const pedidos = await pedidoModel.find({ cliente: req.params.cliente });

        // Verifica si se encontraron pedidos
        if (pedidos.length > 0) {
            res.status(200).json(pedidos);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado para el cliente especificado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.agregarPedidos = async(req,res)=>{
    try {
        const nuevoPedido = new pedidoModel(req.body);
        const pedido = await nuevoPedido.save();
        res.status(201).json({
            message: 'Pedido creado exitosamente', pedido
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.actualizarPedidos = async(req,res)=>{
    try {
        const pedido = await pedidoModel.findOneAndUpdate(
            { cliente: req.params.cliente }, req.body,
            { new: true }
        );

        if (pedido) {
            res.status(200).json({ message: 'Pedido actualizado correctamente', pedido });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.eliminarPedidos = async(req,res)=>{
    try {
        const pedido = await pedidoModel.findOneAndDelete({ cliente: req.params.cliente });

        if (pedido) {
            res.status(200).json({ message: 'Pedido eliminado correctamente', pedido });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado para el cliente especificado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}