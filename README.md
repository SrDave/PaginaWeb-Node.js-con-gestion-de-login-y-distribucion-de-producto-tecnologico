# RamDom Web

Aplicación web desarrollada como complemento de una herramienta de **separación musical mediante IA**.  
Permite la **gestión básica de usuarios**, ofrece información sobre el producto y actúa como portal de acceso al sistema desde el navegador.

---

## Descripción general

El proyecto está construido con **HTML, CSS, JavaScript** y un backend en **Node.js**, proporcionando:
- Registro e inicio de sesión de usuarios.
- Gestión de sesiones básicas desde el navegador.
- Navegación entre páginas informativas (producto, contacto, equipo).
- Diseño **responsive** y efectos visuales dinámicos.
- Servidor Express.js para el manejo de peticiones y almacenamiento de usuarios en un archivo `users.txt`.

---

## Estructura del proyecto

📁 ProyectoWeb/

│

├── 📁 Extra/

│ ├── RamDomWeb.html → Página principal (landing page)

│ ├── DiseñoWeb.css → Hoja de estilos CSS (diseño responsive)

│ ├── Funciones.js → Lógica de interacción (frontend)

│ ├── ContactUs.html → Formulario de contacto

│ ├── login.html → Página de inicio de sesión

│ ├── NewAccount.html → Página de registro

│ ├── Product.html → Página de descarga del producto

│ ├── WhoWeAre.html → Información sobre el equipo

│ └── Server.js → Backend con Node.js y Express

│
└── 📄 users.txt → Archivo de texto para almacenar usuarios registrados


---

## Diseño y características visuales

- **CSS Animations (@keyframes):** efectos `glow` y `glow-red` tipo neón.  
- **Flexbox:** para maquetación adaptable y centrado de elementos.  
- **Variables CSS:** colores, fuentes y tamaños coherentes.  
- **Responsive Design:** compatible con escritorio y móviles.  
- **Degradados y sombras:** para un acabado moderno y atractivo.

---

## Lógica de autenticación

- Ventanas modales de **login y registro** con validación de datos.  
- Almacenamiento de sesión en `localStorage`.  
- Comunicación entre ventanas mediante `postMessage`.  
- Actualización dinámica del menú según estado de sesión.  

---

## Backend en Node.js

El archivo `Server.js` implementa:
- Registro y autenticación de usuarios.  
- Almacenamiento simple en `users.txt` (formato JSON por línea).  
- Enrutamiento con **Express.js**.  
- Servidor de archivos estáticos (HTML, CSS, JS).  
- Control simbólico de acceso a la descarga del producto.

---

## Tecnologías utilizadas

- **Frontend:** HTML5, CSS3, JavaScript  
- **Backend:** Node.js + Express  
- **Almacenamiento:** users.txt (texto plano)  
- **Diseño:** Flexbox, variables CSS, animaciones  
- **Control de versiones:** Git & GitHub  

---

## Autor

Desarrollado por **David Ramos Domingo**  
Grado en **Tecnología Digital y Multimedia** – UPV  
GitHub: [https://github.com/SrDave](https://github.com/SrDave)

---

🧩 *Proyecto académico: desarrollo de un entorno web para complementar la herramienta de separación musical “RamDom Music”.*
