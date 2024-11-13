import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import SuperHeroRoutes from './routes/superHeroRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;


//Middleware para JSON
app.use(express.json());

//Conexion a MongoDB
connectDB();

//Config de rutas
app.use('/api', SuperHeroRoutes);

//Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada lala"});
});

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    
})