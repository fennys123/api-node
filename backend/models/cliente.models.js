const { default: mongoose, version } = require('mongoose');
const conexion = require('../config/connection');

const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        minLength: [9, 'el telefono ingresado es muy corto'],
        maxLength: [14, 'el telefono es muy extenso']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
        trim: true,
        minLength: [9, 'la direcion ingresada es muy corta'],
    },

    habilitado: {
        type: Boolean,
        default: true
    },

    usuario: {
        type: conexion.SchemaTypes.ObjectId,
        ref: 'user',
    }
}, { versionKey: false }
);

const clienteModel = mongoose.model('clientes', clienteSchema);

module.exports = clienteModel;
