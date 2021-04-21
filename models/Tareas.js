import Sequelize from 'sequelize';
import sequelize from "../config/db.js";
import Proyectos from '../models/Proyectos.js';
const {DataTypes} =Sequelize;

const Tareas= sequelize.define('Tarea',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    tarea:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.INTEGER
    }

});
//belongsto una tarea solo puede pertenecer a un proyecto conexion de uno a uno
Tareas.belongsTo(Proyectos);
//esto iria en el otro modelo
//Proyectos.hasMany(Tareas)


//para crear automaticamente la tabla Tareas
(async () => {
  await sequelize.sync();
  
})();

export default Tareas;