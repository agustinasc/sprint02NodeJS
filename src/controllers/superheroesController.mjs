import { obtenerSuperheroPorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30 } from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes, renderizarMensaje } from '../views/responseView.mjs';
import mongoose from 'mongoose';

export async function obtenerTodosLosSuperheroesController(req, res){
    const superheroes = await obtenerTodosLosSuperheroes();
    res.send(renderizarListaSuperheroes(superheroes))
}
//controlador para manejar la solicitud HTTP en la API, buscando al superheroe por su ID

/* export async function obtenerSuperheroePorIdController(req, res){
    const { id } = req.params;
    const superheroe = await obtenerSuperheroPorId(id);

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    } else {
        res.status(404).send({ mensaje: "Superheroe no encontrado" })
    }
}
 */
export async function obtenerSuperheroePorIdController(req, res) {
    

    const { id } = req.params;


    // Verifica si el ID es válido (debe ser un ObjectId de MongoDB)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ mensaje: "ID no válido. Debe ser un ObjectId válido de MongoDB." });
    }

    try {
        // Obtiene el superhéroe por ID
        const superheroe = await obtenerSuperheroPorId(id);
        
        
        // Si el superhéroe no se encuentra, devuelve un 404
        if (!superheroe) {
            res.status(404).send(renderizarMensaje(error.message));
        }
        // Si se encuentra, renderiza y envía el superhéroe
        res.send(renderizarSuperheroe(superheroe));
       
    } catch (error) {
        // Manejo de errores si algo sale mal con la consulta o el servidor
        console.error("Error al obtener el superhéroe:", error);
        res.status(500).send({ mensaje: "Hubo un problema al procesar la solicitud." });
    }
}




export  async function buscarSuperheroesPorAtributoController(req, res){
    const { atributo, valor} = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

    if (superheroes.length > 0){
        res.send(renderizarListaSuperheroes(superheroes))
    }else {
        res.status(404).send({ mensaje: "No se encontraron superheroes con ese atributo"})
    }
}


export async function obtenerSuperheroesMayoresDe30Controller(req, res){
    const superheroes = await obtenerSuperheroesMayoresDe30();
    res.send(renderizarListaSuperheroes(superheroes))
}