import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';
import mongoose from 'mongoose';

class SuperHeroRepository extends IRepository {

    // funcion para proporcionar un ID valido a MongoDB
    async obtenerPorId(id){
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("ID no válido, Debe contener 24 caracteres hexadecimales.");
        }
        return await SuperHero.findById(id)
    }


    async obtenerTodos(){
        return await SuperHero.find({});
    }


    async buscarPorAtributo(atributo, valor){
        const query = { [atributo]: new RegExp(valor, 'i')};
        return await SuperHero.find(query);
    }


    async obtenerMayoresDe30(){
        return await SuperHero.find({ edad: { $gt: 30 }, planetaOrigen: 'Tierra', 
        $expr: { $gte: [{ $size: "$poderes" }, 3] }
        })
    }

      ///SPRINT 03 - TP01///

    async agregarNuevoHero(datosNuevoHeroe){

        

        try{ ///Recibe datos y los guarda en la BD
            const nuevoHeroe = new SuperHero(datosNuevoHeroe) 

            const guardarNuevoHeroe = await nuevoHeroe.save() //Usando metodo save para guardar en la BD
            
            return guardarNuevoHeroe

        } catch (error){

            console.error("Error en el repositorio al agregar el superhéroe:", error);
            throw new Error("Error al guardar el superhéroe en la base de datos.");
        }


    }

    async editarSuperhero(id, newData){
        try{ 
            //Solicitud a la capa de servicio para actualizar el superheroe
            const superheroeEditado = await SuperHero.findByIdAndUpdate(
                id, 
                newData,
                { new: true }
            )  
    
            return superheroeEditado 

        } catch(error){    
            //Manejando si hay errores y enviando respuesta de error
            res.status(500).send({ mensaje: 'Error al actualizar el superheroe (repository)', error: error.message})
        }
    }

    async eliminarSuperhero(id){
        try{
            
            const superheroeEliminado = await SuperHero.findByIdAndDelete(id) //el metodo de mongoose findByIdAndDelete para encontrar al superheroe y eliminarlo
            return superheroeEliminado
        
        }catch(error){
            
            throw new Error("Error al eliminar el superhéroe de la base de datos.(repository)");
        
        }
    }

    async eliminarSuperHeroPorNombre(nombre){
        try {
            const superheroeEliminadoPornombre = await SuperHero.findOneAndDelete({nombreSuperheroe: nombre}) //Mongoogse con su metodo "findOneAndDelete" encuentra al superheroe y lo elimina
            return superheroeEliminadoPornombre

        } catch (error) {
            throw new Error("Error al eliminar el superhéroe de la base de datos.(repository)");
        }
    }


}

export default new SuperHeroRepository();