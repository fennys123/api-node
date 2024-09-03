const conexion = require('../config/connection')
const { default: mongoose, version } = require('mongoose');

const userSchema = new mongoose.Schema({
    correo:{
        type: String,
        unique: [true, 'El correo ya existe'],
        required: true
    },
    pass:{
        type: String,
        required: [true, 'Debe registrarse una contraseña'],
        minLength: [5, 'La contraseña debe tener más de 5 caracteres'],
        maxLength: [20, 'La contraseña debe ser de menos de 20 caracteres']

    },
    rol:{
        type: String,
        default: "cliente"
    },
    habilitado:{
        type: Boolean,
        default: true
    }
},{ versionKey: false });

const userModel = mongoose.model('usuarios', userSchema);

module.exports = userModel;