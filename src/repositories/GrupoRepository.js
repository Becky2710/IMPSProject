const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos los grupos
    obtenerTodosLosGrupos: async() => {
      console.log('Hizo la consulta');
        try {
            const result = await pool.query('SELECT a.idgrupo, a.num_grupo,a.anio,a.ciclo,b.materia,c.nombre FROM grupos a,materias b,profesores c WHERE a.idmateria = b.idmateria and a.idprofesor = c.idprofesor;');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de grupos: ', error);
        }
    },
               

     // Insertar grupo
     insertarGrupo: async(nuevoGrupo) => {
      try {
          const result = await pool.query('INSERT INTO grupos SET ?', nuevoGrupo);
          return result.insertId;
      } catch (error) {
          console.error('Ocurrio un problema al insertar grupo ', error);
      }
  },

     // Actualiar grupo
     actualizarGrupo: async(idgrupo, datosModificados) => {
      try{
        const result = await pool.query('UPDATE grupos SET ? WHERE idgrupo = ?', [datosModificados,idgrupo]);
        return result.affectedRows > 0;
      }catch(error){
        console.error('Error al actualizar el registro', error);
      }
  },

  

     // Obtener grupo por ID
     obtenerGrupoPorid: async (idgrupo) =>{
      try {
          const[grupo] = await pool.query('SELECT * FROM grupos  WHERE idgrupo = ?',[idgrupo]);
          return grupo;
      } catch (error) {
         console.log('Error para obtener el registro');
      }
     },

   // Eliminar grupo
    eliminarGrupo: async(idgrupo) => {
        try{
          const result = await pool.query('DELETE FROM grupos WHERE idgrupo = ?', [idgrupo]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar grupo', error);
        }
    },

     // Asignar grupo
     asignarGrupo: async(asignacion) => {
      try {
        const result = await pool.query("INSERT INTO grupo_estudiantes SET ? ", asignacion);
        console.log('resultado: ', result)
        return result;

      } catch (error) {
        console.log('Ocurrio un problema al asignar el grupo', error);
      }
    }
}

