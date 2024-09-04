const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const modeloUsuarios = require('./backend/models/user.models');
const emailService = require('./backend/utils/email_service');
const router = require('./backend/router/router');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de sesión
app.use(session({
    secret: 'mi_secreto', // Cambia esto por una cadena secreta
    resave: false,
    saveUninitialized: true
}));

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

app.post('/carrito/añadir', async (req, res) => {
    const { id, cantidad } = req.body;
    const productos = [
        { referencia: 1, nombre: 'ropa', precio: 10000, descripcion: 'prueba', stock: 50, imagen: '/images/ropa.png', habilitado: true },
        { referencia: 2, nombre: 'ropa', precio: 20000, descripcion: 'prueba', stock: 50, imagen: '/images/ropa.png', habilitado: true }
    ];

    const producto = await productos.find(p => p.referencia == id);
    if (!producto) {
        return res.status(404).send('Producto no encontrado');
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

    res.redirect('/carrito');
});

app.listen(process.env.PORT)
