// Configuración de la API
const API_URL = 'http://localhost:5000/api';

// Variables globales
let allTasks = [];
let editingTaskId = null;

// Elementos del DOM
const taskForm = document.getElementById('taskForm');
const tasksList = document.getElementById('tasksList');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const filterStatus = document.getElementById('filterStatus');
const filterPriority = document.getElementById('filterPriority');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    taskForm.addEventListener('submit', handleSubmit);
    cancelBtn.addEventListener('click', resetForm);
    filterStatus.addEventListener('change', filterTasks);
    filterPriority.addEventListener('change', filterTasks);
}

// ============================================
// OPERACIONES CRUD CON LA API
// ============================================

// GET - Cargar todas las tareas
async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        
        if (!response.ok) {
            throw new Error('Error al cargar las tareas');
        }
        
        const result = await response.json();
        allTasks = result.data;
        
        displayTasks(allTasks);
        updateStatistics();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al cargar las tareas', 'error');
        tasksList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar las tareas. Verifica que el servidor esté corriendo.</p>
            </div>
        `;
    }
}

// POST - Crear nueva tarea
async function createTask(taskData) {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        
        if (!response.ok) {
            throw new Error('Error al crear la tarea');
        }
        
        const result = await response.json();
        showToast('✅ Tarea creada exitosamente', 'success');
        
        await loadTasks();
        resetForm();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('❌ Error al crear la tarea', 'error');
    }
}

// PUT - Actualizar tarea existente
async function updateTask(id, taskData) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar la tarea');
        }
        
        const result = await response.json();
        showToast('✅ Tarea actualizada exitosamente', 'success');
        
        await loadTasks();
        resetForm();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('❌ Error al actualizar la tarea', 'error');
    }
}

// DELETE - Eliminar tarea
async function deleteTask(id) {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
        }
        
        showToast('🗑️ Tarea eliminada exitosamente', 'success');
        await loadTasks();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('❌ Error al eliminar la tarea', 'error');
    }
}

// PUT - Cambiar estado de completado
async function toggleTaskComplete(id, currentStatus) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !currentStatus })
        });
        
        if (!response.ok) {
            throw new Error('Error al actualizar el estado');
        }
        
        await loadTasks();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('❌ Error al actualizar el estado', 'error');
    }
}

// ============================================
// MANEJO DEL FORMULARIO
// ============================================

async function handleSubmit(e) {
    e.preventDefault();
    
    const taskData = {
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        priority: document.getElementById('priority').value
    };
    
    if (!taskData.title) {
        showToast('⚠️ El título es obligatorio', 'warning');
        return;
    }
    
    if (editingTaskId) {
        await updateTask(editingTaskId, taskData);
    } else {
        await createTask(taskData);
    }
}

function resetForm() {
    taskForm.reset();
    editingTaskId = null;
    formTitle.textContent = 'Nueva Tarea';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Guardar Tarea';
    cancelBtn.classList.add('d-none');
    document.getElementById('taskId').value = '';
}

function editTask(task) {
    editingTaskId = task._id;
    
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description || '';
    document.getElementById('priority').value = task.priority;
    
    formTitle.textContent = 'Editar Tarea';
    submitBtn.innerHTML = '<i class="fas fa-edit"></i> Actualizar Tarea';
    cancelBtn.classList.remove('d-none');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// RENDERIZADO DE TAREAS
// ============================================

function displayTasks(tasks) {
    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox fa-3x"></i>
                <p>No hay tareas que mostrar</p>
                <p class="text-muted">¡Crea tu primera tarea!</p>
            </div>
        `;
        return;
    }
    
    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''} priority-${task.priority}">
            <div class="d-flex align-items-start gap-3">
                <div>
                    <input type="checkbox" 
                           class="task-checkbox" 
                           ${task.completed ? 'checked' : ''}
                           onchange="toggleTaskComplete('${task._id}', ${task.completed})">
                </div>
                
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="task-title mb-0">${escapeHtml(task.title)}</h5>
                        <span class="priority-badge priority-${task.priority}">
                            ${getPriorityIcon(task.priority)} ${task.priority.toUpperCase()}
                        </span>
                    </div>
                    
                    ${task.description ? `
                        <p class="task-description">${escapeHtml(task.description)}</p>
                    ` : ''}
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="task-meta">
                            <i class="far fa-calendar"></i> 
                            ${formatDate(task.createdAt)}
                        </small>
                        
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-primary" onclick='editTask(${JSON.stringify(task).replace(/'/g, "&apos;")})'>
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="btn btn-danger" onclick="deleteTask('${task._id}')">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// FILTROS
// ============================================

function filterTasks() {
    const statusFilter = filterStatus.value;
    const priorityFilter = filterPriority.value;
    
    let filtered = allTasks;
    
    // Filtrar por estado
    if (statusFilter === 'completed') {
        filtered = filtered.filter(task => task.completed);
    } else if (statusFilter === 'pending') {
        filtered = filtered.filter(task => !task.completed);
    }
    
    // Filtrar por prioridad
    if (priorityFilter !== 'all') {
        filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    
    displayTasks(filtered);
}

// ============================================
// ESTADÍSTICAS
// ============================================

function updateStatistics() {
    const total = allTasks.length;
    const completed = allTasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('es-ES', options);
}

function getPriorityIcon(priority) {
    const icons = {
        'alta': '🔴',
        'media': '🟡',
        'baja': '🟢'
    };
    return icons[priority] || '⚪';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'info') {
    const toast = new bootstrap.Toast(document.getElementById('toast'));
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.show();
}