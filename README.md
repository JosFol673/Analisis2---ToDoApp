
Este proyecto corresponde al Sprint 1 del desarrollo de una aplicación de lista de tareas utilizando React y Vite.  
El objetivo principal de esta etapa es implementar una versión mínima funcional que permita **crear y listar tareas**, asegurando su **persistencia local mediante localStorage**.

Requisitos:

Antes de ejecutar el proyecto, asegúrese de tener instalado:

- Node.js versión 20 o superior  
- npm versión 9 o superior  
- Un navegador web moderno (Google Chrome, Microsoft Edge, Firefox)

Puede verificar su versión de Node.js ejecutando en la terminal:

node -v

Para ejecutar el proyecto en modo desarrollo se utiliza el comando:
npm run dev
Pero antes se debe colocar en la carpeta del proyecto, estando en Analisis2P, cd Proyecto, cd todo-react
Después de iniciarse el servidor de desarrollo, la terminal mostrará la dirección local del proyecto, generalmente http://localhost:5173
. Esa dirección debe abrirse en el navegador para visualizar la aplicación.

La estructura principal del proyecto es la siguiente:
todo-react/
├─ public/
├─ src/
│ ├─ components/
│ │ ├─ TaskForm.jsx (Formulario para crear tareas)
│ │ └─ TaskList.jsx (Muestra las tareas )
│ ├─ App.jsx (Lógica principal del proyecto y persistencia)
│ ├─ main.jsx (Punto de entrada de React)
│ └─ index.css (Estilos del proyecto con tema tipo terminal)
├─ package.json
├─ vite.config.js
└─ README.md

El proyecto utiliza la API localStorage del navegador para mantener las tareas guardadas incluso al cerrar o recargar la página. Todas las tareas se almacenan en formato JSON bajo la clave “todo-react.tasks.v1”. Ejemplo de valor almacenado:
[
{
"id": 1760153051042,
"title": "Prueba",
"done": false,
"priority": "Media",
"createdAt": "2025-10-10T02:45:00.000Z"
}
]


