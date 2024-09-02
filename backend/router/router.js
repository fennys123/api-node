const express = require('express');
const router = express.Router();

const controladorproductos = require('../controller/producto.controller')

//modelo productos

router.get('/productos',controladorproductos.listarProductos)

router.get('/productos/:precio',controladorproductos.consultarProductos)

router.post('/productos1',controladorproductos.agregarProductos)

// router.put('/productos/:title',controladorproductos.actualizarproductos)

// router.delete('/productos/:title',controladorproductos.eliminarproductos)


//modelo cliente
//app.get('/clientes',controladorproductos.listarClientes)

// app.get('/clientes/:correo',controladorproductos.consultarClientes)

// app.post('/clientess',controladorproductos.agregarClientes)

// app.put('/clientes/:nombre',controladorproductos.actualizarClientes)

// app.delete('/clientes/:telefono',controladorproductos.eliminarClientes)

module.exports = router