import SuperHero from "../models/SuperHero.mjs";
import superHeroRepository from "../repositories/SuperHeroRepository.mjs";
import mongoose from 'mongoose';

export async function obtenerSuperheroPorId(id){
    return await superHeroRepository.obtenerPorId(id)
}

export async function obtenerTodosLosSuperheroes(){
    return await superHeroRepository.obtenerTodos();
}
export async function buscarSuperheroesPorAtributo(atributo, valor){
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30(){
    return await superHeroRepository.obtenerMayoresDe30();
}

///SPRINT 03 - TP01

    export async function agregarNuevoSuperheroe(nuevoSuperheroeData){
        try{

            return await superHeroRepository.agregarNuevoHero(nuevoSuperheroeData)

        } catch(error){
            console.error("Error en el servicio al agregar el superhéroe:", error);
        throw error;
        }
        
    }

    //ACTUALIZAR SUPERHEROE
    export async function editarSuperheroe(id, newData){

        try{           
            const superheroEditado = await superHeroRepository.editarSuperhero(id, newData)
            return superheroEditado
        } catch (error) {
            
            throw new Error("Superheroe no encontrado o no se pudo actualizar");
        }       
    }

    export async function eliminarSuperheroe(id){

        try{
            const superheroeEliminado = await superHeroRepository.eliminarSuperhero(id)
            //console.log("Desde el servicio", superheroeEliminado);
            
            return superheroeEliminado
        }catch(error){
            throw new Error("Superheroe no encontrado o no se pudo actualizar");
        }

    }

    export async function eliminarSuperheroePornombre(nombre){

        try{
            const superheroeEliminadoPornombre = await superHeroRepository.eliminarSuperHeroPorNombre(nombre) //consulta a la base de datos
            return superheroeEliminadoPornombre

        }catch(error){
            throw new Error("Superheroe no encontrado o no se pudo actualizar (service)");
        }
    }