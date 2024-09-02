const modeloCliente = require('../models/cliente.models')

exports.listarClientes = async(req,res)=>{
    try {
        const clientes = await modeloCliente.find({});
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.consultarClientes = async(req,res)=>{
    try {
        const cliente = await modeloCliente.findOne({ correo: req.params.correo });
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

exports.agregarClientes = async(req,res)=>{
    try {
        const nuevoCliente = new modeloCliente(req.body);
        const cliente = await nuevoCliente.save();
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.actualizarClientes = async(req,res)=>{
    try {
        const cliente = await modeloCliente.findOneAndUpdate(
            { correo: req.params.correo },
            req.body,
            { new: true }  // Devuelve el documento modificado en lugar del original
        );
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

exports.eliminarClientes = async(req,res)=>{
    try {
        const cliente = await modeloCliente.findOneAndDelete({ correo: req.params.correo });
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}