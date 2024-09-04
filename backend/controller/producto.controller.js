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

exports.listarProductos = async (req, res) => {
    try {
        const listadoProducto = await modeloProducto.find({});
        if (listadoProducto) {
            res.render('pages/listarProductos', { listadoProducto });
        } else {
            res.render('pages/listarProductos', { mensaje: "No hay productos disponibles" });
        }
    } catch (error) {
        res.status(500).send({ error: "Error al listar los productos" });
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


// Controlador para actualizar producto
exports.actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, imagen } = req.body;

        // Buscar y actualizar el producto
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { nombre, descripcion, precio, stock, imagen },
            { new: true, runValidators: true }
        );

        if (!productoActualizado) {
            return res.status(404).send('Producto no encontrado');
        }

        res.redirect('/productos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};



exports.eliminarProductos = async (req, res) => {
    try {
        let eliminacion = await modeloProducto.findOneAndDelete({ referencia: req.params.ref });
        if (eliminacion) {
            res.status(200).json({ "mensaje": "eliminación exitosa" });
        } else {
            res.status(404).json({ "mensaje": "producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ "mensaje": error.message });
    }
};



// Configuración de método-override para soportar PUT y DELETE en formularios HTML
const methodOverride = require('method-override');



