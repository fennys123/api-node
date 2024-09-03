const conexion = require('../config/connection');
const { default: mongoose, version } = require('mongoose');

const productoSchema = new mongoose.Schema({
    referencia:{
        type:String,
        require: [true,'la referencia es obligatoria']
    },
    nombre: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    precio: {
        type: Number,
        default: 0,
        min: [0,'el precio minimo  es cero']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0,'el stock por defecto es cero']
    },
    imagen: 
        {
            type: String,
            required: [true, 'Las imágenes son obligatorias']
    },
    habilitado:{
        type:Boolean,
        default:true
    },
    
});

const producto = mongoose.model('productos', productoSchema);

module.exports = producto;
