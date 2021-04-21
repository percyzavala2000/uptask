import Sequelize from "sequelize";
import sequelize from "../config/db.js";
import Proyectos from "./Proyectos.js";
import bcrypt from 'bcrypt';

const { DataTypes } = Sequelize;

const Usuarios = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Agrega un Correo Valido",
        },
        notEmpty: {
          msg: "No puede ir vacio el correo",
        },
      },
      unique: {
        args: true,
        msg: "Usuario ya registrado",
      },
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede ir vacio la contraseña",
        },
      },
    },
    activo:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    token:DataTypes.STRING,
    expiracion:DataTypes.DATE
  },
  {
    hooks: {
      beforeCreate(usuario) {
        console.log('que hay aqui',usuario);
        
        usuario.password = bcrypt.hashSync(
          usuario.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);
//insertar un metodo personalizado prototaipe
Usuarios.prototype.verificarPassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};
//HasMany pueden tenr multiples proyectos
Usuarios.hasMany(Proyectos);

//para crear automaticamente la tabla Tareas
(async () => {
  await sequelize.sync();
})();

export default Usuarios;
