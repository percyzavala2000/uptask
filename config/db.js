import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NOMBRE,
  process.env.DB_USER,
  '',
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

export default sequelize;