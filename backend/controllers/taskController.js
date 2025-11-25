const Task = require('../models/task');

// GET /tasks - Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las tareas',
      error: error.message
    });
  }
};

// GET /tasks/:id - Obtener una tarea específica
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'ID inválido',
      error: error.message
    });
  }
};

// POST /tasks - Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Tarea creada exitosamente',
      data: task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la tarea',
      error: error.message
    });
  }
};

// PUT /tasks/:id - Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Tarea actualizada exitosamente',
      data: task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    });
  }
};

// DELETE /tasks/:id - Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Tarea eliminada exitosamente',
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al eliminar la tarea',
      error: error.message
    });
  }
};