
const stripe = require("stripe")(process.env.STRIPEKEY);

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
router.put('/productos/:ref', controladorproductos.actualizarProducto);
router.delete('/productos/:ref', controladorproductos.eliminarProductos);


// Rutas para clientes
router.get('/clientes', controladorCliente.listarClientes);
router.get('/clientes/:correo', controladorCliente.consultarClientes);
router.post('/clientes', controladorCliente.agregarClientes);
router.put('/clientes/:correo', controladorCliente.actualizarClientes);
router.delete('/clientes/:correo', controladorCliente.eliminarClientes);


// Rutas para pedidos
router.get('/pedidos', controladorPedidos.listarPedidos)
router.get('/pedidos/:cliente', controladorPedidos.consultarPedidos)
router.post('/pedidos', controladorPedidos.agregarPedidos)
router.put('/pedidos/:cliente', controladorPedidos.actualizarPedidos)
router.delete('/pedidos/:cliente', controladorPedidos.eliminarPedidos)

// Rutas para usuarios
router.get('/usuarios', controladorUsuarios.listarUsuarios)
router.get('/usuarios/:correo', controladorUsuarios.consultarUsuarios)
router.post('/usuarios', controladorUsuarios.agregarUsuarios)
router.put('/usuarios/:ref', controladorUsuarios.actualizarUsuarios)
router.delete('/usuarios/:ref', controladorUsuarios.eliminarUsuarios)


//pagos
const calculateOrderAmount = (items) => {
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    let total = 0;
    items.forEach((item) => {
        total += (item.precio * item.cantidad);
    });
    return total;
};

router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
      // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  });

router.get('/checkout', async (req, res) => {
    res.render('./pages/producto/checkout')
});

module.exports = router;


