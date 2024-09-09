const modeloProducto = require('../models/productos.models');

exports.listarProductos = async (req, res) => {
    try {
        const listadoProducto = await modeloProducto.find({});
        if (listadoProducto.length > 0) {
            res.render('pages/producto/listarProductos', { listadoProducto });
        } else {
            res.render('pages/producto/listarProductos', { mensaje: "No hay productos disponibles" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error al listar los productos" });
    }
};

exports.consultarProductos = async (req, res) => {
    try {
        const producto = await modeloProducto.findOne({ referencia: req.params.ref }); // Cambiado a referencia
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
    try {
        console.log('Data received:', req.body); // Log incoming data

        const nuevoProducto = {
            referencia: req.body.referenciaProducto,
            nombre: req.body.nombreProducto,
            descripcion: req.body.descripcionProducto,
            precio: req.body.precioProducto,
            stock: req.body.stockProducto,
            imagen: req.body.imagenProducto,
            habilitado: true,
        };

        console.log('Nuevo Producto:', nuevoProducto); // Log product to be created

        await modeloProducto.create(nuevoProducto);
        res.redirect('/v1/productos'); // Asegúrate de redirigir a la ruta correcta
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: "Error al agregar el producto" });
    }
};

exports.actualizarProducto = async (req, res) => {
    try {
        const { ref } = req.params;
        const { nombre, descripcion, precio, stock, imagen } = req.body;

        const productoActualizado = await modeloProducto.findOneAndUpdate(
            { referencia: ref },
            { nombre, descripcion, precio, stock, imagen },
            { new: true, runValidators: true }
        );

        if (!productoActualizado) {
            return res.status(404).send('Producto no encontrado');
        }

        res.redirect('/v1/productos'); // Asegúrate de redirigir a la ruta correcta
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};

exports.eliminarProductos = async (req, res) => {
    try {
        console.log('Producto referencia a eliminar:', req.params.ref); // Log reference

        let eliminacion = await modeloProducto.findOneAndDelete({ referencia: req.params.ref });
        if (eliminacion) {
            res.redirect('/v1/productos'); // Asegúrate de redirigir a la ruta correcta
        } else {
            res.status(404).json({ mensaje: "Producto no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: error.message });
    }
};
