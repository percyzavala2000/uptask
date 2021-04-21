import Swal from "sweetalert2";
import axios from "axios";

//variables
const btnEliminiar = document.querySelector("#eliminar-proyecto");

if (btnEliminiar) {
  btnEliminiar.addEventListener("click", (e) => {

   const urlProyecto=e.target.dataset.proyectoUrl
   
   

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
          const url=`${location.origin}/${urlProyecto}`;

          axios.delete(url,{params:{urlProyecto}})
          .then(resp=>{
              console.log(resp);
              Swal.fire(
                "Proyecto Eliminado!",
                "El proyecto se elimino correctamente.",
                "success"
              );
              // redireccionar al inicio
              setTimeout(() => {
                window.location.href = "/";
              }, 3000);
          })
          .catch(()=>{
              Swal.fire({
                  type:'error',
                  title:'Hubo un Error',
                  text : 'No se pudo eliminar el proyecto'
              })
          })

        
          
        
      }
    });
  });
}
