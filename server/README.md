# TodoApp API

## Configuración

1. **MongoDB**: Necesitas una base de datos MongoDB.
   - **Opción A - Atlas (cloud, gratis)**: [mongodb.com/atlas](https://www.mongodb.com/atlas) → crea cluster → conecta → copia URI
   - **Opción B - Local**: Instala MongoDB e usa `mongodb://localhost:27017/todoapp`

2. **Variables de entorno**:
   ```
   copy .env.example .env
   ```
   Edita `.env` y pone tu `MONGODB_URI`.

## Ejecutar

```bash
cd server
npm run dev
```

La API estará en http://localhost:5000

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/tasks | Listar tareas |
| POST | /api/tasks | Crear tarea `{ "text": "...", "completed": false }` |
| PUT | /api/tasks/:id | Actualizar tarea |
| DELETE | /api/tasks/:id | Eliminar tarea |
