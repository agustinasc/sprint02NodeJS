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
}

export default new SuperHeroRepository();