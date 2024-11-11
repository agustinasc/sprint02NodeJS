import mongoose from 'mongoose';

export async function connectDB(){
    try {
        await mongoose.connect(
            'mongodb+srv://Grupo-13:grupo13@cluster0.mongodb.net/PracticaSuperHeroes', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log('Conexion exitosa a MongoDB');      
    } catch (error){
        console.error('Error al conectar a MongoDB', error);      
        process.exit(1)
    }
}
