import Swal from "sweetalert2";

const actualizarAvance=()=>{
    //selecionar las tareas existentes
    const tareas=document.querySelectorAll('li.tarea');
    if(tareas.length){
      //selecionar las tareas completadas
      const tareasCompletas=document.querySelectorAll('i.completo');

      //calcular el avance
      const avance=Math.round((tareasCompletas.length / tareas.length) * 100);

      //mostrar avance
      const porcentaje=document.querySelector('#porcentaje');
      porcentaje.style.width=avance + '%';

      if(avance===100){
          Swal.fire(
              'Completaste el proycto',
              'Felicidades, has terminado tus tareas',
              'success'

          )
      }



    }


    
    

   

}


export { actualizarAvance };