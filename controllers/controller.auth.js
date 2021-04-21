import passport from "passport";
import Usuarios from "../models/Usuarios.js";
import flash from "connect-flash";
import crypto from "crypto";
import Sequelize from "sequelize";
import bcrypt from 'bcrypt';
import {enviar} from "../handlers/email.js";



// autenticar el usuario
const autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

//funcion para revisar si el usuario esta logueado o no
const usuarioAutenticado = (req, res, next) => {
  // si el usuario est autenticado adelante
  if (req.isAuthenticated()) {
    return next();
  }

  // si no esta autenticado, redirigir al formulario
  return res.redirect("/iniciar-sesion");
};

const cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/iniciar-sesion"); // al cerrar sesion nos lleva al login
  });
};

const formularioRestablecerPass = (req, res) => {
  res.render("restablecer", {
    nombrePagina: "Restablecer tu Contraseña",
  });
};

const enviarToken = async (req, res,next) => {

 
  
  //verificar que el usuario eiste
  const { email } = req.body;
  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {
    req.flash("error", "No existe la cuenta");
    res.render("restablecer", {
      nombrePagina: "Restablecer tu contraseña",
      mensaje: req.flash(),
    });
  }
  

  //usuario existente
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiracion = Date.now() + 3600000;

  //guardar en la base de datoss
  await usuario.save();

  //url reset
  const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;

  //enviar el correo con el token
  enviar({
   usuario,
   subject: "Password Reset",
   resetUrl,
   archivo: "restablecer-password",
 }); 

 //terminar
 req.flash('correcto','Se envio un mensaje a tu correo');
 res.redirect('/iniciar-sesion');


};

const validarToken = async (req, res) => {

  const usuario = await Usuarios.findOne({
    where: { token: req.params.token },
  });

  // si no encuentra el usuario
  if (!usuario) {
    req.flash("error", "No valido");
    res.redirect("/restablecer");
  };

  //Formulario para generar el usuario
  res.render('reset-pasword',{
    nombrePagina:'Restablecer contraseña'
  })


};

const actualizarPassword=async (req,res)=>{
  //verifica el token valido pero tambien la fecha de expiracion
  const {Op}=Sequelize
  const usuario = await Usuarios.findOne({
    where: { token: req.params.token,
    expiracion:{
      [Op.gte]:Date.now()
    } }
  });

  //SI EL USUSARIO EXISTE
  if(!usuario){
    req.flash('error','no valido');
    res.redirect('/restablecer');
  }

  //hashear el nuevo password
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token=null;
  usuario.expiracion=null;

  //guardar el nuevo  pasword
  await usuario.save();

  req.flash('correcto','Tu password se ah modifiado correctamente');
  res.redirect('/iniciar-sesion');
}

export {
  autenticarUsuario,
  usuarioAutenticado,
  cerrarSesion,
  formularioRestablecerPass,
  enviarToken,
  validarToken,
  actualizarPassword,
};
