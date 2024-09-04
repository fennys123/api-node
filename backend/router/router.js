const express = require('express');
const router = express.Router();
const controladorproductos = require('../controller/producto.controller');
const controladorCliente = require('../controller/cliente.controller');
const controladorPedidos = require('../controller/pedidos.controller');
const controladorUsuarios = require('../controller/user.controller');

// Rutas para productos
router.get('/productos', controladorproductos.listarProductos);
router.get('/productos/:ref', controladorproductos.consultarProductos);
router.post('/productos', controladorproductos.agregarProductos);
router.put('/productos/:ref', controladorproductos.actualizarProductos);
router.delete('/productos/:precio', controladorproductos.eliminarProductos);

// Rutas para clientes
router.get('/clientes', controladorCliente.listarClientes);
router.get('/clientes/:correo', controladorCliente.consultarClientes);
router.post('/clientes', controladorCliente.agregarClientes);
router.put('/clientes/:correo', controladorCliente.actualizarClientes);
router.delete('/clientes/:correo', controladorCliente.eliminarClientes);


// Rutas para pedidos
router.get('/pedidos',controladorPedidos.listarPedidos)
router.get('/pedidos/:cliente',controladorPedidos.consultarPedidos)
router.post('/pedidos',controladorPedidos.agregarPedidos)
router.put('/pedidos/:cliente',controladorPedidos.actualizarPedidos)
router.delete('/pedidos/:cliente',controladorPedidos.eliminarPedidos)

// Rutas para usuarios
router.get('/usuarios',controladorUsuarios.listarUsuarios)
router.get('/usuarios/:correo',controladorUsuarios.consultarUsuarios)
router.post('/usuarios',controladorUsuarios.agregarUsuarios)
router.put('/usuarios/:nombre',controladorUsuarios.actualizarUsuarios)
router.delete('/usuarios/:telefono',controladorUsuarios.eliminarUsuarios)

//carrito
router.use(express.static('frontend/views/static'));


module.exports = router;


