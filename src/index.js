const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

// Settings
// Toma el puerto del servicio de la nube o si no el que le indicamos
app.set('port', process.env.PORT || 3000);

// Middlewares - son funciones que se ejecutan antes que las rutas, por tanto se tienen que ejecutar
app.use(morgan('dev'));
// Cada vez que llegue un dato a nuestro servidor va a ser procesado por esta función, permitiéndonos acceder a estos datos si están en formato json. Antes se tenía que instalar aparte con 'bodyParser', pero ahora ya viene incluido en Express
app.use(express.json());

// Routes
// Ruta para desarrollar la API que gestiona las tasks
app.use('/api/tasks', require('./routes/task.routes'));

// Static files
// path.join adapta el formato de la ruta a cada plataforma ( Unix, Windows, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
