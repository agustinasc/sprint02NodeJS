import express from 'express'

import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    agregarNuevoSuperheroeController,
    editarSuperheroeController,
    eliminarSuperheroeController
} from '../controllers/superheroesController.mjs';


const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores/30', obtenerSuperheroesMayoresDe30Controller);


///SPRINT 03 - TP 01

router.post('/heroes', agregarNuevoSuperheroeController)
router.put('/heroes/editar/:id', editarSuperheroeController)
router.delete('/heroes/eliminar/:id', eliminarSuperheroeController)

export default router;