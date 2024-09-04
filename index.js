const exp = require("express");
const mongoose = require('mongoose');
const logger = require("morgan");
require('dotenv').config();
const router = require('./backend/router/router')
const express = require('express');
const bodyParser = require('body-parser');
const modeloUsuarios = require('./backend/models/user.models')



const app = exp();
app.use('/v1',router)

app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());
app.use(logger("dev"));
app.use(express.static('frontend/views/static'));
app.use(express.static('frontend/views/static/css'));
app.use(express.static('frontend/views/static/js'));
app.use(express.static('frontend/views/static/images'));



//el inicio de la pagina
app.get('/', async (req, res) => {
    res.render('pages/index');
});





const path = require('path')
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/frontend/views'));


//Rutas para el modelo usuario
app.get('/mostrar', async (req, res) => {
    const consulta = await modeloUsuarios.find({});

    res.render('pages/index2', {
        usuarios: consulta,

    });
});

app.get("/insertarUsuario", async (req, res) => {
    const usu={
    correo:"pts@hotmail.com",
    pass:"12345",
    rol:"cliente",
    habilitado:true
    }
    let usuarioTemporal = await modeloUsuario(usu).save();
    
    console.log(usuarioTemporal._id)

    const clien = {
        nombre:"prueba",
        telefono:"123456789",
        direccion:"calle 123 # 45 69",
        habilitado:true,
        usuario: usuarioTemporal._id
    }
    await clienteModel(clien).save(); 
});

const emailService = require('./backend/utils/email_service');
app.get('/enviarCorreo', async (req, res) => {
    await emailService.sendEmail(
        "deivy273@gmail.com",
        "Confirmación de Registro",
        "Bienvenido a la tienda en línea más top de todo el mundo",
    );
})

app.get('/menu', (req, res) => {
    // Ejemplo de productos
    const productos = [
        { id: 1, nombre: 'carro', precio: 10 },
        { id: 2, nombre: 'avion', precio: 20 }
    ];
    res.render('pages/catalogo', { productos });
});

app.get('/carrito', (req, res) => {
    // Ejemplo de productos en el carrito
    const carrito = [
        { id: 1, nombre: 'Producto 1', precio: 10, cantidad: 2 },
        { id: 2, nombre: 'Producto 2', precio: 20, cantidad: 1 }
    ];
    res.render('pages/carrito', { carrito });
});




app.listen(process.env.PORT)