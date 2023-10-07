const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();

     response.render('estudiantes/listado', {estudiantes}); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async(request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    // Renderizamos el formulario
    response.render('estudiantes/agregar', {lstCarreras});
});

// Endpoint para agregar un estudiante
router.post('/agregar', async(request, response) => {
    // Falta agregar logica
    const { idestudiante, nombre,apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const resultado = await queries.insertarEstudiante(nuevoEstudiante);

    response.redirect('/estudiantes');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});

// Endpoint para mostrar el formulario de edición
router.get('/editar/:idestudiante', async (request, response) => {
      const { idestudiante } = request.params;
      const estudiante = await queries.obtenerEstudiantePorid(idestudiante);

      if (estudiante) {
        const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
        response.render('estudiantes/editar',{estudiante,lstCarreras});
      }else{
        response.redirect('/estudiantes');
      }

    });

// Endpoint que permite editar un estudiante
router.post('/editar/:idestudiante', async (request, response) => {
  const { idestudiante } = request.params;
  const {nombre,apellido,email,idcarrera,usuario} = request.body;
  const datosModificados = {nombre,apellido,email,idcarrera,usuario};

  const resultado = await queries.actualizarEstudiante(idestudiante, datosModificados);

  if(resultado){
    console.log('Estudiante modificado con exito');
    response.redirect('/estudiantes');
  }else{
    console.log('Error al modificar estudiante');
    response.redirect('/estudiantes/editar/'+ idestudiante);
  }
});


module.exports = router;
