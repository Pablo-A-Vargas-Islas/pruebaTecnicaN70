require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { AppDataSource } = require('./data-source');
const { Task } = require('./entities/Task');
const { authMiddleware } = require('./middlewares/auth');
const { upload } = require('./middlewares/upload');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Conectamos a la base de datos y se inicializa el servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL con TypeORM');

    const taskRepository = AppDataSource.getRepository('Task');

    //Funcion GET
    app.get('/api/tareas', async (req, res) => {
      try {
        const tareas = await taskRepository.find({
          order: { fechaCreacion: 'DESC' }
        });
        res.json(tareas);
      } catch (error) {
        res.status(500).json({ error: 'Error al consultar las tareas' });
      }
    });

    //Funcion POST
    app.post('/api/tareas', authMiddleware, upload.single('archivo'), async (req, res) => {
      try {
        const { titulo, descripcion } = req.body;

        if (!titulo) {
          return res.status(400).json({ error: 'El título es obligatorio' });
        }

        const nuevaTarea = taskRepository.create({
          titulo,
          descripcion,
          completado: false,
          archivoAdjunto: req.file ? req.file.path : null
        });

        const guardada = await taskRepository.save(nuevaTarea);
        res.status(201).json(guardada);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' });
      }
    });

    //Funcion PUT
    app.put('/api/tareas/:id', authMiddleware, async (req, res) => {
      try {
        const { id } = req.params;
        const { titulo, descripcion, completado } = req.body;

        const tarea = await taskRepository.findOneBy({ id: parseInt(id, 10) });
        if (!tarea) {
          return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        if (titulo !== undefined) tarea.titulo = titulo;
        if (descripcion !== undefined) tarea.descripcion = descripcion;
        if (completado !== undefined) tarea.completado = completado;

        const actualizada = await taskRepository.save(tarea);
        res.json(actualizada);
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
      }
    });

    //Función DELETE
    app.delete('/api/tareas/:id', authMiddleware, async (req, res) => {
      try {
        const { id } = req.params;
        const resultado = await taskRepository.delete({ id: parseInt(id, 10) });

        if (resultado.affected === 0) {
          return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ mensaje: 'Tarea eliminada correctamente' });
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });