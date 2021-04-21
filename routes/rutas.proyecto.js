import { request, response, Router } from "express";
import { check } from "express-validator";
import { usuarioAutenticado } from "../controllers/controller.auth.js";
import {
  getControlador,
  getFormularioProecto,
  enviarNuevoProyecto,
  proyectoPorUrl,
  formularioEditar,
  actualizarProyecto,
  eliminarProducto,
} from "../controllers/controller.proyecto.js";
import validador from "../middlewares/validador.js";
const rutas = Router();

const rutasProyectos = (req = request, res = response) => {

  rutas.get("/",usuarioAutenticado, getControlador);
  rutas.get("/nuevo-proyecto",usuarioAutenticado, getFormularioProecto);
  rutas.post(
    "/nuevo-proyecto",usuarioAutenticado,
    [
      check("nombre", "El Nombre es Obligatorio")
        .not()
        .isEmpty()
        .trim()
        .escape(),
      validador,
    ],
    enviarNuevoProyecto
  );
  //Listar Proyecto
  rutas.get('/:url',proyectoPorUrl);
  //Actualizar el proyecto
  rutas.get('/editar/:id',formularioEditar);
  rutas.post(
    "/nuevo-proyecto/:id",
    [
      check("nombre", "El Nombre es Obligatorio")
        .not()
        .isEmpty()
        .trim()
        .escape(),
      validador,
    ],
    actualizarProyecto
  );
  rutas.delete('/:url',eliminarProducto);



  return rutas;
};

export default rutasProyectos;
