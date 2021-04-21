import Sequelize from 'sequelize';
import slug from "slug";
import shortid from 'shortid'
import sequelize from '../config/db.js';
const {DataTypes}=Sequelize;

const Proyectos=sequelize.define('Proyecto',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING
    },
    url:{
        type:DataTypes.STRING
    }



},{
    hooks:{
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url=`${url}-${shortid.generate()}`;
        }
    }
});
//para crear automaticamente la tabla Proyectoss
(async () => {
  await sequelize.sync();
  
})();




export default Proyectos;

