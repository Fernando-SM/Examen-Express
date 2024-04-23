const express = require('express');
const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// Conexión a la base de datos
const { connectToDatabase } = require('./database');
connectToDatabase();

// Rutas
const routes = require('./routes/routes');
app.use('/', routes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});