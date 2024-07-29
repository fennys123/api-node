const exp = require("express");
const modeloUsuario = require("./backend/models/user.models");
const logger = require("morgan");
require('dotenv').config();

const app = exp();
app.use(exp.urlencoded({ extended: false }));
app.use(exp.json());
app.use(logger("dev"));


const path = require('path')
app.set("view engine", "ejs");
app.set('views', path.join(__dirname,'/frontend/views'));

app.get('/mostrar', async(req, res) => {
    const consulta = await modeloUsuario.find({});

    res.render('pages/index', {
        usuarios: consulta,
     
    });})







app.get("/usuarios", async (req, res) => { // es una promesa que cuando queramos hacer una funcion el await dice que hay que esperar que este caido o no entonces es una promesa
    const consulta = await modeloUsuario.find({});
    if (consulta) {
        res.status(200).json(consulta);
    }
    else {
        res.status(404).json("No hay usuarios");
    }
});

app.get("/usuarios/:correo", async (req, res) => {
    const busqueda = await modeloUsuario.findOne({ correo: req.params.correo });
    if (busqueda) {
        res.status(200).json(busqueda);
    }
    else {
        res.status(404).json("No hay usuarios");
    }
});

app.post("/usuarios", async (req, res) => {
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
});


app.put("/usuarios/:correo", async (req, res) => {
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
});


app.delete("/usuarios/:correo", async (req, res) => {
console.log(req.body.correo,req.body.correouser)
let eliminacion= await modeloUsuario.findOneAndDelete({ correo: req.body.correo });
    if (eliminacion) {
        res.json(eliminacion);
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});


app.listen(process.env.PORT)