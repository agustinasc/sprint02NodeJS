import superHeroRepository from "../repositories/SuperHeroRepository.mjs";

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

export async function agregarNuevoSuperheroe(){
    return await superHeroRepository.agregarNuevoHero(req, res)
}