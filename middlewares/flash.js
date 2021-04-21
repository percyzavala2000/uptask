
import flash from "connect-flash";

const localFlash= (req, res, next)=> {

    res.locals.mensajes=req.flash();
    res.locals.usuario={...req.user} || null;

    
    

  
  next();
};

export default localFlash;