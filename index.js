const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const modeloUsuarios = require('./backend/models/user.models');
const emailService = require('./backend/utils/email_service');
const methodOverride = require('method-override');
const router = require('./backend/router/router');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Configuración de sesión
app.use(session({
    secret: 'mi_secreto', // Cambia esto por una cadena secreta
    resave: false,
    saveUninitialized: true
}));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());


// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/views'));

// Rutas estáticas
app.use(express.static('./frontend/views/static/'));


// Rutas
app.use('/v1', router);

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/mostrar', async (req, res) => {
    const consulta = await modeloUsuarios.find({});
    res.render('pages/index2', { usuarios: consulta });
});

app.get('/insertarUsuario', async (req, res) => {
    const usu = {
        correo: "pts@hotmail.com",
        pass: "12345",
        rol: "cliente",
        habilitado: true
    };
    let usuarioTemporal = await modeloUsuarios(usu).save();
    
    console.log(usuarioTemporal._id);

    // Asumimos que existe el modelo clienteModel
    const clien = {
        nombre: "prueba",
        telefono: "123456789",
        direccion: "calle 123 # 45 69",
        habilitado: true,
        usuario: usuarioTemporal._id
    };
    await clienteModel(clien).save();
    res.send('Usuario insertado');
});

app.get('/enviarCorreo', async (req, res) => {
    await emailService.sendEmail(
        "deivy273@gmail.com",
        "Confirmación de Registro",
        "Bienvenido a la tienda en línea más top de todo el mundo"
    );
    res.send('Correo enviado');
});


//carrito
app.get('/menu', (req, res) => {
    const productos = [
        { referencia: 1, nombre: 'ropa', precio: 10000, descripcion: 'prueba', stock: 50, imagen: '/images/ropa.png', habilitado: true },
        { referencia: 2, nombre: 'ropa', precio: 20000, descripcion: 'prueba', stock: 50, imagen: '/images/ropa.png', habilitado: true }
    ];
    res.render('pages/menu', { productos });
});

app.get('/carrito', (req, res) => {
    const carrito = req.session.carrito || [];
    res.render('pages/carrito', { carrito });
});

app.post('/carrito/agregar', async (req, res) => {
    const { id, cantidad } = req.body;
    const productos = [
        { referencia: 1, nombre: 'Camisa', precio: 10000, descripcion: 'Camisa de algodón', stock: 50, imagen: '/images/camisa.png', habilitado: true },
        { referencia: 2, nombre: 'Pantalón', precio: 20000, descripcion: 'Pantalón de mezclilla', stock: 50, imagen: '/images/pantalon.png', habilitado: true }
    ];

    const producto = productos.find(p => p.referencia == id);
    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (!req.session.carrito) {
        req.session.carrito = [];
    }

    const productoEnCarrito = req.session.carrito.find(p => p.id == id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += parseInt(cantidad, 10);
    } else {
        req.session.carrito.push({
            id: producto.referencia,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: parseInt(cantidad, 10)
        });
    }

    // Devolver el carrito actualizado como JSON
    res.json({
        carrito: req.session.carrito,
        total: req.session.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
    });
});


//pagar carrito
app.post('/carrito/pagar', (req, res) => {
    const pagoExitoso = true; 
    if (pagoExitoso) {
        req.session.carrito = []; 
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, message: 'Error en el procesamiento del pago' });
    }
});


// Eliminar un producto del carrito
app.post('/carrito/eliminar', (req, res) => {
    const { id } = req.body;
    if (!req.session.carrito) {
        return res.status(400).json({ error: 'El carrito está vacío' });
    }
    req.session.carrito = req.session.carrito.filter(item => item.id != id);
    res.json({
        carrito: req.session.carrito,
        total: req.session.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
    });
});


// Vaciar el carrito
app.post('/carrito/limpiar', (req, res) => {
    req.session.carrito = [];
    res.json({ success: true });
});


app.listen(process.env.PORT)
