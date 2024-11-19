import { obtenerSuperheroPorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, agregarNuevoSuperheroe, editarSuperheroe, eliminarSuperheroe } from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes, renderizarMensaje } from '../views/responseView.mjs';
import mongoose from 'mongoose';


export async function obtenerTodosLosSuperheroesController(req, res){
    const superheroes = await obtenerTodosLosSuperheroes();
    res.send(renderizarListaSuperheroes(superheroes))
}


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


///SPRINT 03 - TP 01

export async function agregarNuevoSuperheroeController(req, res){
    
    try {
        //Obtener datos del body
        const nuevoSuperheroeData = req.body;

        const nuevoSuperheroe = await agregarNuevoSuperheroe(nuevoSuperheroeData) 
     
         // Respuesta al cliente
        res.status(201).send({
            mensaje: "Nuevo superhéroe creado con éxito",
            superheroe: nuevoSuperheroe})       

    } catch (error) {
        // Manejo de errores si algo sale mal con la consulta o el servidor
        console.error("Error al AGREGAR el superhéroe:", error);
        res.status(500).send({ mensaje: "Hubo un problema al procesar la solicitud." });
    }

}

export async function editarSuperheroeController(req, res){

    try {
        //Obtenengo los datos de la solicitud de la URL 
        const { id } = req.params; // Obtener el ID del parámetro de la URL
        const newData = req.body;  // Obtener los nuevos datos del body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ mensaje: 'ID de superhéroe no válido.'});
        }

        //Llamo al servicio para editar el superheroe
        const superheroeEditado = await editarSuperheroe(id, newData);

        //Si no lo encontro devuelve lo siguiente:
        if (!superheroeEditado) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        // Si lo encontro devuelve lo siguiente:
        res.status(200).send({ mensaje: 'Superhéroe actualizado exitosamente', superheroe: superheroeEditado});

    } catch (error) {
        // Si hay errores
        console.error(error);
        res.status(500).send({
            mensaje: 'Error al actualizar el superhéroe (controller)',
            error: error.message
        });
    }
    
    
}
///ELIMINAR SUPERHEROE

export async function eliminarSuperheroeController() {

    try {
        //Obtenengo los datos de la solicitud de la URL 
        const { id } = req.params; // Obtener el ID del parámetro de la URL

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ mensaje: 'ID de superhéroe no válido.'});
        }

         //Llamo al servicio para editar el superheroe
         const superheroeEliminado = await eliminarSuperheroe(id);
    } catch(error){

    }
}