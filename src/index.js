const express = require('express');
//Inicializaciones
const app = express();

require('dotenv').config()

// Ajustes del servidor
app.set('port', process.env.PORT || 4500);

// Configuracion de rutas
app.use(require('./routes'));
// Iniciar el servidor
app.listen(app.get('port'),()=>{
    console.log('servidor iniciado en el puerto: ', app.get('port'));
});

