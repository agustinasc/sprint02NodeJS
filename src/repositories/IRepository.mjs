class IRepository {
    obtenerPorId(id){
        throw new Error("Metodo 'obtenerPorId()' no implementado");
    }
    obtenerTodos(){
        throw new Error("Metodo 'obtenerTodos() no implementado'");
    }
    buscarPorAtributo(atributo, valor){
        throw new Error("Metodo 'buscarPorAtributo()' no implementado")
    }
    obtenerMayoresDe30(){
        throw new Error("Metodo 'ontenerMayoresDe30()' no implementado")
    }

    
     //// SPRINT 03 - TP 01

     agregarNuevoHero(){
        throw new Error("Metodo 'agregarNuevoHero()' no implementado")
    }
}
export default IRepository;