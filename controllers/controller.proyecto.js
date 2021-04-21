import Proyectos from "../models/Proyectos.js";
import Tareas from "../models/Tareas.js";

const getControlador = async (req, res) => {
  console.log(res.locals.usuario);

  const UsuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { UsuarioId } });

  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos,
  });
};

const getFormularioProecto = async (req, res) => {

  const UsuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { UsuarioId } });

  res.render("nuevo-proyecto", {
    nombrePagina: "Nuevo Proyecto",
    proyectos
  });
};
const enviarNuevoProyecto = async (req, res) => {

  const UsuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { UsuarioId } });

  const { nombre } = req.body;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agregar un Nombre al proyecto" });
  }

  if (errores.length > 0) {
    res.render("nuevo-proyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos
    });
  } else {
    const UsuarioId = res.locals.usuario.id;
    await Proyectos.create({ nombre, UsuarioId });
    res.redirect("/");
  }
};

const proyectoPorUrl = async (req, res, next) => {
  
  const UsuarioId = res.locals.usuario.id;

  if(!UsuarioId){return next()}

  const proyectosPromise = Proyectos.findAll({ where:  {UsuarioId:UsuarioId} });
  const proyectoPromise = Proyectos.findOne({
    where: { url: req.params.url, UsuarioId },
  });
  //aplicar promise
   const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]); 

  if (!proyecto) {
    return next();
  }

  // consultar tareas del proyecto actual
  const tareas = await Tareas.findAll({
    where: {
      ProyectoId: proyecto.id,
    },
    /* include:[
     {
       model:Proyecto
     }
   ] */
  });

  res.render("tareas", {
    nombrePagina: "Tareas del Proyecto",
    proyecto,
    proyectos,
    tareas,
  });
};

const formularioEditar = async (req, res) => {

  const UsuarioId = res.locals.usuario.id;
  const proyectosPromise = Proyectos.findAll({ where: { UsuarioId } });
  const proyectoPromise = Proyectos.findOne({
    where: { id: req.params.id, UsuarioId },
  });
  //aplicar promise
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  //render a la vista
  res.render("nuevo-proyecto", {
    nombrePagina: "Editar Proyecto",
    proyecto,
    proyectos,
  });
};
const actualizarProyecto = async (req, res) => {
  const UsuarioId = res.locals.usuario.id;

  const proyectos = await Proyectos.findAll({ where: { UsuarioId } });
  const { nombre } = req.body;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agregar un Nombre al proyecto" });
  }

  if (errores.length > 0) {
    res.render("nuevo-proyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos
    });
  } else {
    const producto = await Proyectos.update(
      { nombre: nombre },
      { where: { id: req.params.id } }
    );
    res.redirect("/");
  }
};
const eliminarProducto = async (req, res, next) => {
  const { urlProyecto } = req.query;
  const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });
  if (!resultado) {
    return next();
  }
  res.send("proyecto Eliminado correctamente");
};

export {
  getControlador,
  getFormularioProecto,
  enviarNuevoProyecto,
  proyectoPorUrl,
  formularioEditar,
  actualizarProyecto,
  eliminarProducto,
};
