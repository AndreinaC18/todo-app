require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');

// Inicializar Express
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', taskRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API de TODO List funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tasks'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});