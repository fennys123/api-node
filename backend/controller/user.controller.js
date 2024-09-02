const modeloUsuarios = require('../models/user.models')


exports.listarUsuarios = async(req,res)=>{
    let listadoProducto = await modeloUsuarios.find({});
    if (listadoProducto)
        res.render('pages/listarProductos', { listadoProducto })
    else
        res.render('pages/listarProductos')

}

exports.consultarUsuarios = async(req,res)=>{
    const busqueda = await modeloUsuario.findOne({ correo: req.params.correo });
    if (busqueda) {
        res.status(200).json(busqueda);
    }
    else {
        res.status(404).json("No hay usuarios");
    }

}

exports.agregarUsuarios = async(req,res)=>{
    console.log(req.body)
    const nuevo = {
        correo: req.body.correo,
        pass: req.body.pass,
        rol: req.body.rol,
        habilitado: true,
    };
    let consulta = await modeloUsuario.create(nuevo);
    if (consulta) {
        res.status(200).json("Usuario creado");
    }
    else {
        res.status(404).json("No se pudo crear el usuario");
    }
}

exports.actualizarUsuarios = async(req,res)=>{
    const nombreUser = req.body.nombreuser;
    const usuarioEditado = {
        nombre: nombreUser,
        correo: req.body.correouser,
        pasword: req.body.passworduser,
        rol: req.body.roluser,
        habilitado: true,
    };
    let actualizado = await modeloUsuario.findOneAndUpdate({ nombre: nombreUser }, usuarioEditado);
    if (actualizado) {
        res.json(actualizado);
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }

}

exports.eliminarUsuarios = async(req,res)=>{
    console.log(req.body.correo, req.body.correouser)
    let eliminacion = await modeloUsuario.findOneAndDelete({ correo: req.body.correo });
    if (eliminacion) {
        res.json(eliminacion);
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }

}