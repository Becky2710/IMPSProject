const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');
const { isLoggedIn } = require('../lib/auth');


// Endpoint para mostrar todos los profesores
router.get('/',isLoggedIn, async (request, response) => {
  console.log('Entro aqui');
    const profesores = await queries.obtenerTodosLosProfesores();

     response.render('profesores/listado', {profesores}); // Mostramos el listado de profesores
});

// Endpoint que permite mostrar el formulario para agregar un nuevo profesor
router.get('/agregar',isLoggedIn, async(request, response) => {

    // Renderizamos el formulario
    response.render('profesores/agregar');
});

// Endpoint para agregar un profesor
router.post('/agregar',isLoggedIn, async(request, response) => {
    
    const { idprofesor, nombre,apellido,fecha_nacimiento, profesion, genero, email } = request.body;
    const nuevoProfesor = { idprofesor, nombre, apellido, fecha_nacimiento,profesion,genero,email };

    const resultado = await queries.insertarProfesor(nuevoProfesor);

    if(resultado){
      request.flash('success', 'Registro insertado con exito');
   } else {
      request.flash('error', 'Ocurrio un problema al guardar el registro');
   }
   
   response.redirect('/profesores');
});

// Endpoint que permite eliminar un profesor
router.get('/eliminar/:idprofesor',isLoggedIn, async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idprofesor
    const { idprofesor } = request.params;
    const resultado = await queries.eliminarProfesor(idprofesor);
    if(resultado > 0){
      request.flash('success', 'Eliminacion correcta');
      } else {
      request.flash('error', 'Error al eliminar');
      }
      response.redirect('/profesores');
      
});

// Endpoint para mostrar el formulario de edición
router.get('/editar/:idprofesor',isLoggedIn, async (request, response) => {
    
    
        const { idprofesor } = request.params;
        const profesor = await queries.obtenerProfesorPorid(idprofesor);

        if (profesor) {
          response.render('profesores/editar', { idprofesor, profesor });
        }else{
          response.redirect('/profesores')
        }
        
  

});

// Endpoint que permite editar un profesor
router.post('/editar/:id',isLoggedIn, async (request, response) => {
  const { id } = request.params;
  const {idprofesor,nombre,apellido,fecha_nacimiento,profesion,genero,email} = request.body;
  const datosModificados = {idprofesor,nombre,apellido,fecha_nacimiento,profesion,genero,email};

  const resultado = await queries.actualizarProfesor(id, datosModificados);

  if(resultado){
    request.flash('success','profesor modificado con exito');
  }else{
    request.flash('error','Error al modificar profesor');
  }
  response.redirect('/profesores');
});


module.exports = router;
