import express from 'express';
import cors from 'cors';
import sequelize from './db/database.js';
import "./model/index.js";
import  router  from './routes/api.routes.js';
import morgan from 'morgan';
//import { seedDatabase } from './seed.js';


const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use('/api',router);

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ Conexión a MySQL exitosa');
    //await seedDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

startServer();