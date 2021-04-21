
import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice';
import htmlToText from 'html-to-text';
import util from 'util';
import emailConfig from '../config/email.js';
import { resolve } from "path";



// create reusable transporter object using the default SMTP transport
  let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.pass, // generated ethereal password
    },
  });
  //generar Html
const generarHTML=(archivo, opciones={})=>{
    const html=pug.renderFile(resolve("./views/emails/"+archivo+".pug"),opciones);
    return juice(html)
}

const enviar=async (opciones)=>{
  const html=generarHTML(opciones.archivo, opciones);
  const text=htmlToText.fromString(html);
  // send mail with defined transport object
   const opcionesEmail= {
     from: "uptask <no-reply@uptask.com>", // sender address
     to: opciones.usuario.email, // list of receivers
     subject: opciones.subject, // Subject line
     text, // plain text body
     html // html body
   };

   const enviarEmail=util.promisify(transport.sendMail,transport);
   return enviarEmail.call(transport,opcionesEmail)

  }

   export  {enviar}