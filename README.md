# 📝 TODO List - Aplicación de Gestión de Tareas

Aplicación web completa para gestionar tareas diarias con una API RESTful en Node.js/Express y un frontend en HTML/CSS/JavaScript.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Autor](#autor)

## ✨ Características

- ✅ Crear, leer, actualizar y eliminar tareas (CRUD completo)
- ✅ Marcar tareas como completadas
- ✅ Asignar prioridades (Alta, Media, Baja)
- ✅ Filtrar tareas por estado y prioridad
- ✅ Estadísticas en tiempo real
- ✅ Diseño responsive (Bootstrap 5)
- ✅ Interfaz intuitiva y moderna
- ✅ Notificaciones de acciones

## 🚀 Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB / Mongoose
- CORS
- dotenv

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cuenta gratuita)
- Un editor de código (VS Code recomendado)
- Git

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/AndreinaC18/todo-app.git
cd todo-app
```

### 2. Instalar dependencies del backend

```bash
cd backend
npm install
```

### 3. Configurar MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo cluster (opción gratuita)
3. Crea un usuario de base de datos
4. Obtén tu connection string
5. Añade tu IP a la lista blanca (o permite acceso desde cualquier IP: 0.0.0.0/0)

### 4. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:

```env
PORT=5000
MONGO_URI=mongodb+srv://tu_usuario:tu_password@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
```

**Important:** Reemplaza `tu_usuario`, `tu_password` y la URL con tus credenciales de MongoDB Atlas.

## ▶️ Uso

### Iniciar el Backend

```bash
cd backend
npm run dev
```

El servidor se ejecutará en `http://localhost:5000`

### Iniciar el Frontend

Opción 1: Usando Live Server de VS Code
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

Opción 2: Abrir directamente
- Abre el archivo `frontend/index.html` en tu navegador

**Nota:** El frontend se conecta por defecto a `http://localhost:5000/api`

## 🌐 API Endpoints

### Base URL: `http://localhost:5000/api`

| Método | Endpoint | Descripción | Códigos de Estado |
|--------|----------|-------------|-------------------|
| GET | `/tasks` | Obtener todas las tareas | 200, 500 |
| GET | `/tasks/:id` | Obtener una tarea específica | 200, 400, 404 |
| POST | `/tasks` | Crear una nueva tarea | 201, 400 |
| PUT | `/tasks/:id` | Actualizar una tarea | 200, 400, 404 |
| DELETE | `/tasks/:id` | Eliminar una tarea | 200, 400, 404 |

### Ejemplo de Body para POST/PUT:

```json
{
  "title": "Estudiar para el examen",
  "description": "Repasar las unidades 1-3",
  "priority": "alta",
  "completed": false
}
```

### Ejemplo de Respuesta:

```json
{
  "success": true,
  "message": "Tarea creada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Estudiar para el examen",
    "description": "Repasar las unidades 1-3",
    "priority": "alta",
    "completed": false,
    "createdAt": "2025-11-25T10:30:00.000Z"
  }
}
```

## 📁 Estructura del Proyecto

```
todo-app/
│
├── backend/
│   ├── config/
│   │   └── database.js          # Configuración de MongoDB
│   ├── controllers/
│   │   └── taskController.js    # Lógica de negocio
│   ├── models/
│   │   └── Task.js              # Modelo de datos
│   ├── routes/
│   │   └── taskRoutes.js        # Definición de rutas
│   ├── .env                     # Variables de entorno
│   ├── server.js                # Punto de entrada del servidor
│   └── package.json             # Dependencies del backend
│
├── frontend/
│   ├── index.html               # Estructura HTML
│   ├── style.css                # Estilos personalizados
│   └── app.js                   # Lógica del cliente
│
└── README.md                    # Documentación del proyecto
```

## 🧪 Probando la API

Puedes probar la API usando herramientas como:

- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) (extensión de VS Code)
- [cURL](https://curl.se/)

### Ejemplo con cURL:

```bash
# Obtener todas las tareas
curl http://localhost:5000/api/tasks

# Crear una nueva tarea
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primera tarea",
    "description": "Descripción de la tarea",
    "priority": "media"
  }'
```

## 🐛 Solución de Problems Comunes

### Error: "Cannot connect to MongoDB"
- Verifica que tu connection string en `.env` sea correcto
- Asegúrate de que tu IP esté en la lista blanca de MongoDB Atlas
- Verifica que el usuario y contraseña sean correctos

### Error: "CORS policy"
- Asegúrate de que el backend esté corriendo en el puerto 5000
- Verifica que CORS esté configurado correctamente en `server.js`

### El frontend no carga las tareas
- Verifica que el backend esté corriendo
- Abre la consola del navegador (F12) para ver errores
- Confirma que la URL de la API en `app.js` sea correcta

## 📝 Notas Adicionales

- Este proyecto fue desarrollado como examen parcial para el curso de Desarrollo Web
- La aplicación utiliza async/await para todas las operaciones asíncronas
- El diseño es completamente responsive gracias a Bootstrap 5
- Se implementan códigos de estado HTTP apropiados en todas las respuestas

## 👤 Autor

**[Tu Nombre Completo]**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu.email@ejemplo.com

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

---

**Desarrollado con ❤️ para el curso de Desarrollo Web**