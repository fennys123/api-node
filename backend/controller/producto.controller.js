const modeloProducto = require('../models/productos.models')

exports.listarProductos = async (req, res) => {
    let listadoProducto = await modeloProducto.find({});
    if (listadoProducto)
        res.render('pages/listarProductos', { listadoProducto })
    else
        res.render('pages/listarProductos', { "mensaje": "no hay datos disponibles" })

}

exports.consultarProductos = async (req, res) => {
    try {
        const producto = await modeloProducto.findOne({ price: req.params.precio });
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.agregarProductos = async (req, res) => {
    console.log(req.body);
    const nuevoProducto = {
        referencia: req.body.referenciaProducto,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcionProducto,
        precio: req.body.precioProducto,
        stock: req.body.stockProducto,
        imagen: req.body.imagenProducto,
        habilitado: true,
    };

    let Insercion = await modeloProducto.create(nuevoProducto);
    if (Insercion)
        res.status(200).json({ "mensaje": "registro exitoso" })
    else
        res.status(404).json({ "mensaje": "se presento un error" })
};



exports.actualizarProductos = async (req, res) => {
    const actualizarProducto = {
        referencia: req.params.referenciaproducto,
        nombre: req.params.nombreproducto,
        descripcion: req.params.descripcionproducto,
        precio: req.params.precioproducto,
        stock: req.params.stockproducto,
        imagen: req.params.imagenproducto,
        habilitado: true,
    };

    let Actualizacion = await modeloProducto.create(actualizarProducto);
    if (Actualizacion)
        res.status(200).json({ "mensaje": "actualizado correctamente" })
    else
        res.status(404).json({ "mensaje": "se presento un error" })
};

exports.eliminarProductos = async (req, res) => {
    console.log(req.params.id, req.body.referenciaproductoModel)
    let eliminacion = await modeloProducto.findOneAndDelete({ referencia: req.params.id });
    if (eliminacion)
        res.status(200).json({ "mensaje": "eliminacion exitosa" })
    else
        res.status(404).json({ "mensaje": "se presento un error" })

};


