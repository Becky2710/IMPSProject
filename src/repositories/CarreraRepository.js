const pool = require('../config/databaseController');
const express = require('express');
const router = express.Router();

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
               

     // Insertar carrera
     insertarCarrera: async(nuevaCarrera) => {
      try {
          const result = await pool.query('INSERT INTO carreras SET ?', nuevaCarrera);
          return result.insertId;
      } catch (error) {
          console.error('Ocurrio un problema al insertar carrera ', error);
      }
  },

     // Actualiar carrera
     actualizarCarrera: async(idcarrera, datosModificados) => {
      try{
        const result = await pool.query('UPDATE carreras SET ? WHERE idcarrera = ?', [datosModificados,idcarrera]);
        return result.affectedRows > 0;;
      }catch(error){
        console.error('Error al actualizar el registro', error);
      }
  },

  

     // Actualizar carrera por ID
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
    eliminarCarrera: async(idcarrera) => {
        try{
          const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Erro al eliminar carrera', error);
        }
    }
}

