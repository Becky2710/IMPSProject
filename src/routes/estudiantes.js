const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
  console.log('Entro aqui');
    const estudiantes = await queries.obtenerTodosLosEstudiantes();

     response.render('estudiantes/listado', {estudiantes}); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async(request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodasLasCarreras();
    // Renderizamos el formulario
    response.render('estudiantes/agregar', {lstCarreras});
});

// Endpoint para agregar un estudiante
router.post('/agregar', async(request, response) => {
    // Falta agregar logica
    const { idestudiante, nombre,apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const resultado = await queries.insertarEstudiante(nuevoEstudiante);

    if(resultado){
      request.flash('success', 'Registro insertado con exito');
   } else {
      request.flash('error', 'Ocurrio un problema al guardar el registro');
   }
   
   response.redirect('/estudiantes');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if(resultado > 0){
      request.flash('success', 'Eliminacion correcta');
      } else {
      request.flash('error', 'Error al eliminar');
      }
      response.redirect('/estudiantes');
      
});

// Endpoint para mostrar el formulario de edición
router.get('/editar/:idestudiante', async (request, response) => {
      const { idestudiante } = request.params;
      const estudiante = await queries.obtenerEstudiantePorid(idestudiante);

      if (estudiante) {
        const lstCarreras = await carrerasQuery.obtenerTodasLasCarreras();
        response.render('estudiantes/editar',{lstCarreras,idestudiante,estudiante});
      }else{
        response.redirect('/estudiantes');
      }
      

    });

// Endpoint que permite editar un estudiante
router.post('/editar/:id', async (request, response) => {
  const { id } = request.params;
  const {idestudiante,nombre,apellido,email,idcarrera,usuario} = request.body;
  const datosModificados = {idestudiante,nombre,apellido,email,idcarrera,usuario};

  const resultado = await queries.actualizarEstudiante(id, datosModificados);

  if(resultado){
    request.flash('success','Estudiante modificado con exito');
  }else{
    request.flash('error','Error al modificar estudiante');
  }
  response.redirect('/estudiantes');
});


module.exports = router;
