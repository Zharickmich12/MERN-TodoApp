# TodoApp MERN

**[Probar la app en vivo](https://mern-todo-app-omega-ebon.vercel.app)**

Aplicación web para organizar y gestionar tareas personales. Cada usuario tiene su cuenta y sus tareas guardadas en la nube.

---

## ¿Qué es?

App de tareas donde puedes:

- Crear una cuenta y guardar tus tareas de forma segura
- Añadir tareas con texto y fecha límite opcional
- Marcar como completadas o pendientes
- Filtrar para ver todas, solo pendientes o solo completadas
- Editar el texto de cualquier tarea
- Usar modo claro u oscuro
- Acceder desde cualquier dispositivo (responsive)

---

## ¿Qué resuelve?

- **Organización**: centralizar tareas en un solo lugar
- **Priorización**: ver fechas límite y tareas vencidas
- **Acceso**: usar desde cualquier dispositivo con navegador
- **Persistencia**: las tareas se guardan en base de datos, no se pierden al cerrar

---

## Tecnologías

- React, Vite, React Router (frontend)
- Node.js, Express (backend)
- MongoDB (base de datos)
- JWT para autenticación

---

## Sobre el uso de IA en este proyecto

En este proyecto, Claude se utilizó como herramienta de apoyo puntual, en un rol similar al de la documentación oficial o un foro técnico: resolución de dudas sobre buenas prácticas (por ejemplo, manejo de JWT o estructura de modelos en Mongoose), revisión de fragmentos de código, y orientación al momento de entender errores durante la integración entre frontend y backend.

Las decisiones de diseño, la lógica general del proyecto y la comprensión de cada parte del código integrado son propias la IA funcionó como un recurso de consulta dentro del proceso, no como generadora principal del proyecto.

---

## Estructura

```
MERN-TodoApp/
├── client/     → Frontend (React)
├── server/     → Backend (Node + Express) + API
└── README.md
```

---

## Cómo ejecutarlo

**Requisitos:** Node.js 18+ y MongoDB (local o Atlas)

1. Clona el repositorio.
2. En `server`: copia `.env.example` a `.env`, añade tu `MONGODB_URI` y `JWT_SECRET`, y ejecuta `npm run dev`.
3. En `client`: ejecuta `npm run dev`.
4. Abre `http://localhost:5173` en el navegador.
