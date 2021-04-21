import {Router} from 'express';
import { usuarioAutenticado } from '../controllers/controller.auth.js';
import {
  postTareas,
  cambiarEstadoTarea,
  eliminarTarea,
} from "../controllers/controller.tareas.js";
const rutas=Router();

const rutasTareas=()=>{
    //crear tareas
    rutas.post('/:url',postTareas);

    //cambiar estado de tarea
    rutas.patch("/tareas/:id",usuarioAutenticado, cambiarEstadoTarea);
    //elimiar tarea
    rutas.delete("/tareas/:id",usuarioAutenticado, eliminarTarea);





return rutas;
}

export default rutasTareas;
