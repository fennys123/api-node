const conexion = require('../config/connection');
const { default: mongoose } = require('mongoose');

// Define el esquema del pedido
const pedidoSchema = new conexion.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente',
        required: [true, 'El cliente es obligatorio']
    },
    carrito: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productos',
            required: [true, 'El producto es obligatorio']
        },
        nombre: {
            type: mongoose.Schema.Types.String,
            required: [true, 'El nombre es obligatorio']
        },
        cantidad: {
            type: Number,
            required: [true, 'La cantidad es obligatoria']
        }
    }],
    subtotal: {
        type: Number,
        required: [true, 'El subtotal es obligatorio']
    },
    impuesto: {
        type: Number,
        required: [true, 'El impuesto es obligatorio']
    },
    total: {
        type: Number,
        required: [true, 'El total es obligatorio']
    },
    estado: {
        type: String,
        enum: ['creado', 'pagado', 'enviado', 'recibido', 'cancelado', 'finalizado'],
        default: 'creado'
    },
    
},{ versionKey: false } );

// Usa `mongoose.models` para evitar sobrescribir el modelo
const pedidoModel = conexion.model('pedidos', pedidoSchema);

module.exports = pedidoModel;
