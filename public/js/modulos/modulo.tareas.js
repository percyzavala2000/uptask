import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from '../functions/avance.js';

const tareas = document.querySelector(".listado-pendientes");

if (tareas) {
  tareas.addEventListener("click", (e) => {
    // cambia estado  icono toggle
    if (e.target.classList.contains("fa-check-circle")) {
      const idTarea = e.target.parentElement.parentElement.dataset.tarea;
      //reques hacia /tareas/:id
      const url = `${location.origin}/tareas/${idTarea}`;

      axios.patch(url, { idTarea }).then((resultado) => {
        console.log(resultado);
        if (resultado.status === 200) {
          e.target.classList.toggle("completo");
          actualizarAvance();

        }
      });
    }
    //eliminar tarea
    if (e.target.classList.contains("fa-trash")) {
      const tareaHtml=e.target.parentElement.parentElement;  

      const idTarea = e.target.parentElement.parentElement.dataset.tarea;

      Swal.fire({
        title: "Deseas borrar este proyecto?",
        text: "Un proyecto eliminado no se puede recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borrar!",
        cancelButtonText: "No, Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          //enviar peticion axios
          //reques hacia /tareas/:id
          const url = `${location.origin}/tareas/${idTarea}`;

          axios
            .delete(url, {  idTarea })
            .then((resp) => {
              console.log(resp);
              if(resp.status===200){
                  //Eliminar el nodo
                  tareaHtml.parentElement.removeChild(tareaHtml);
                  actualizarAvance();

                  Swal.fire(
                    "Tarea Eliminado!",
                    "El Tarea se elimino correctamente.",
                    "success"
                  );
                
              }
              
              
            })
            .catch(() => {
              Swal.fire({
                type: "error",
                title: "Hubo un Error",
                text: "No se pudo eliminar el Tarea",
              });
            });
        }
      });
      
    }
  });
}

export { tareas };
