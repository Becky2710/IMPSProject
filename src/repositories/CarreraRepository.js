const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos las carreras
    obtenerTodosLasCarreras: async() => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    },

     // Actualizar un estudiante por ID
     actualizarCarrera: async (nuevosDatosCarrera) => {
        try {
        // Debes proporcionar los valores que deseas actualizar en la consulta SQL.
        const result = await pool.query(
          'UPDATE carreras SET carrera = ? WHERE idcarrera = ?',
          [nuevosDatosCarrera.carrera, nuevosDatosCarrera.idcarrera]          
        );
    
        
        return result.affectedRows > 0;
        } catch (error) {
        console.error('Error al actualizar el registro', error);
        // Puedes manejar el error de otra manera si lo deseas, como lanzar una excepción.
        throw error;
        }
  }, 

    // Eliminar un estudiante
    /*eliminarEstudiante: async(idestudiante) => {
        try{
          const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar el registro', error);
        }
    }*/
}

