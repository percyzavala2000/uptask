import Usuarios from "../models/Usuarios.js";
import flash from "connect-flash";
import { enviar } from "../handlers/email.js";

//formulario crear cueta get
const formCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear Cuenta en Uptask",
  });
};
//formulario iniciar sesion get
const formIniciarSesion = (req, res) => { 
const { error } = res.locals.mensajes;
  
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar Sesion en Uptask",
    error:error
  });
};

//crear cuenta post
const crearCuenta = async (req, res) => {
  //leer los datos
  const { email, password } = req.body;

  try {
    /* const usuario = Usuarios.build({ email, password });

      //incriptar contraseña
      const saltoRondas = 10;
      const pass = password;
      const salt = bcrypt.genSaltSync(saltoRondas);
      const hash = bcrypt.hashSync(pass, salt);//
      usuario.password = hash;
 */
    //crear el usuario
    await Usuarios.create({ email, password });
    //  await usuario.save();

    //crear una URL de confirmar
    const consfirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

    //crear el objeto de usuario
    const usuario = { email };

    //enviar email
    enviar({
      usuario,
      subject: "Confirmar tu cuenta Uptask",
      consfirmarUrl,
      archivo: "confirmar-cuenta",
    });
    //redirigir al usuario
    req.flash('correcto','Enviamos un correo, Confirmar tu cuenta');

    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    );

    res.render("crearCuenta", {
      mensajes: req.flash(),
      nombrePagina: "Crear Cuenta en Uptask",
      email,
      password,
    });
  }
};

const confirmarCuenta=async (req,res)=>{

  const usuario = await Usuarios.findOne({
    where: { email: req.params.correo },
  });
//si no existe el usuario
if(!usuario){
  req.flash('error','No valido');
  res.redirect('/crear-cuenta');
}

usuario.activo=1;
await usuario.save();
req.flash('correcto','cuenta activada correctamente');
res.redirect('/iniciar-sesion');

}



export { formCrearCuenta, crearCuenta, formIniciarSesion, confirmarCuenta };
