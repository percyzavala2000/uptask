import{Router} from 'express';
import {
  formCrearCuenta,
  crearCuenta,
  formIniciarSesion,
  confirmarCuenta,
} from "../controllers/controller.usuarios.js";
import {
  autenticarUsuario,
  cerrarSesion,
  formularioRestablecerPass,
  enviarToken,
  validarToken,
  actualizarPassword,
} from "../controllers/controller.auth.js";



const rutas=Router();

const rutasUsuarios=()=>{
  //crear nueva cuenta
    rutas.get("/usuarios", formCrearCuenta);
    rutas.post("/usuarios", crearCuenta);
    rutas.get('/confirmar/:correo',confirmarCuenta);
    //iniciar sesion
    rutas.get("/iniciar-sesion", formIniciarSesion);
    rutas.post("/iniciar-sesion", autenticarUsuario);
    //cerrar sesion
    rutas.get('/cerrar-sesion',cerrarSesion);
    //restablecer contraseña
    rutas.get('/restablecer',formularioRestablecerPass);
    rutas.post('/restablecer', enviarToken);
    rutas.get("/restablecer/:token", validarToken);
    rutas.post("/restablecer/:token", actualizarPassword);


return rutas;
};

export default rutasUsuarios;