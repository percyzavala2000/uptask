import express from 'express';
import {resolve} from 'path';
import sequelize from '../config/db.js';
import rutasProyectos from "../routes/rutas.proyecto.js";
import rutasTareas from '../routes/rutas.tareas.js';
import rutasUsuarios from '../routes/rutas.usuarios.js';
import flash from 'connect-flash';
import localFlash from '../middlewares/flash.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from '../config/passport.js';
import '../handlers/email.js';


class Servidor {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.host=process.env.HOST || '0.0.0.0';
    this.conectarDB();
    this.middlewares();
    this.vistasPug();
    this.configure();
    
    this.app.use(localFlash);
    
    this.rutas();
  }
  async conectarDB() {
    try {
      await sequelize.authenticate();
      console.log("db conexion exitosa");
    } catch (error) {
      console.log("Fallo en conectar base de datos", error);
    }
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(express.urlencoded({ extended: true }));
    
  }
  configure() {
  this.app.use(flash());
  this.app.use(cookieParser('keyboard cat'));
  this.app.use(session({ secret:'supersecreto',resave:false,saveUninitialized:false }));
  this.passport();

};
passport(){
  this.app.use(passport.initialize());
  this.app.use(passport.session());
}



  vistasPug() {
    //habilitar pug
    this.app.set("view engine", "pug");
    //añadir carpeta de la vista
    this.app.set("views", resolve("./views"));
  }

  rutas() {
    this.app.use("/", rutasProyectos());
    this.app.use("/", rutasTareas());
    this.app.use("/", rutasUsuarios());
  }

  listen() {
    this.app.listen(this.port,this.host, () => {
      console.log("Esta conectado en el puerto", this.port);
    });
  }
};

export default Servidor;