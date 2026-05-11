import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('CineRosCity', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

export default sequelize;