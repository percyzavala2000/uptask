import Servidor from "./server/Servidor.js";
import dotenv from 'dotenv';

dotenv.config();

const servidor=new Servidor();


servidor.listen();
