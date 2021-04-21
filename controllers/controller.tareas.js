
import Proyectos from "../models/Proyectos.js";
import Tareas from "../models/Tareas.js";

const postTareas=async (req,res, next)=>{
   const proyecto= await Proyectos.findOne({where:{url:req.params.url}});
   //leer el valor de input
   const {tarea} =req.body;
   
      if (!proyecto) {
        return next();
      }

   //estado 0 =incompleto y ID de proyecto
   const estado=0;
   const ProyectoId=proyecto.id;

   //Insertar en la base de datos
   const resultado=await Tareas.create({tarea,estado,ProyectoId});

   if(!resultado){ return next() }
    
//redireccionar
res.redirect(`/${req.params.url}`);


};

const cambiarEstadoTarea=async (req,res,next)=>{
   const {id}=req.params;
   const tarea=await Tareas.findOne({where:{id}});
   //cambiar estado
   let estado=0;
   if(tarea.estado===estado){
      estado=1;
   }
      tarea.estado=estado
   
   const resultado=await tarea.save();
   if(!resultado){return next()}
   
   res.status(200).send('Cambiado de estado')

};

const eliminarTarea=async (req,res,next)=>{
   const {id}= req.params;
   const tarea=await Tareas.findOne({where:{id}});
   

   const eliminado=await tarea.destroy();
   if(!eliminado){return next()}
   res.send('Eliminado')

 
   
   
   
   

}


export { postTareas, cambiarEstadoTarea, eliminarTarea };