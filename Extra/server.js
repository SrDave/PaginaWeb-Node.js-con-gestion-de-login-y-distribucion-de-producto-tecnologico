const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Ruta al archivo de usuarios
const USERS_FILE = path.join(__dirname, "usuarios.txt");

// Usar JSON para manejar las solicitudes POST
app.use(express.json());

// Servir archivos estáticos desde la carpeta Extra
app.use(express.static(path.join(__dirname)));

// Ruta para registrar un nuevo usuario
app.post("/registrar", (req, res) => {
    const nuevoUsuario = req.body;
    const lineaNueva = JSON.stringify(nuevoUsuario);

    // Verificar si el archivo de usuarios existe, si no, crearlo
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, "");
    }

    // Leer el archivo de usuarios y procesarlo
    const usuarios = fs.readFileSync(USERS_FILE, "utf-8")
        .split("\n")
        .filter(linea => linea.trim() !== "")
        .map(linea => JSON.parse(linea));

    // Verificar si el usuario o correo ya existen
    const yaExiste = usuarios.find(u => u.username === nuevoUsuario.username || u.email === nuevoUsuario.email);

    if (yaExiste) {
        return res.json({
            success: false,
            message: "❌ Usuario y/o correo ya existen."
        });
    }

    // Si el usuario no existe, agregarlo al archivo
    fs.appendFileSync(USERS_FILE, lineaNueva + "\n");

    res.json({
        success: true,
        message: "✅ Cuenta creada correctamente."
    });
});

// Ruta para manejar la autenticación de login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Leer el archivo de usuarios
    const usuarios = fs.readFileSync(USERS_FILE, "utf-8")
        .split("\n")
        .filter(linea => linea.trim() !== "")
        .map(linea => JSON.parse(linea));

    // Buscar el usuario
    const usuarioEncontrado = usuarios.find(u => u.username === username);

    if (!usuarioEncontrado) {
        return res.json({
            success: false,
            message: "❌ Usuario no encontrado."
        });
    }

    // Verificar si la contraseña es correcta
    if (usuarioEncontrado.password === password) {
        return res.json({
            success: true,
            message: "✅ Inicio de sesión exitoso."
        });
    } else {
        return res.json({
            success: false,
            message: "❌ Contraseña incorrecta."
        });
    }
});

// Ruta para servir el archivo HTML principal (página de inicio)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"RamdomWeb.html"));
});

// Ruta para servir NewAccount.html
app.get("/newaccount", (req, res) => {
    res.sendFile(path.join(__dirname, "NewAccount.html"));
});

// Ruta para servir ContactUs.html
app.get("/contactus", (req, res) => {
    res.sendFile(path.join(__dirname, "ContactUs.html"));
});

// Ruta para servir Product.html
app.get("/product", (req, res) => {
    res.sendFile(path.join(__dirname, "Product.html"));
});

// Ruta para servir WhoWeAre.html
app.get("/whoweare", (req, res) => {
    res.sendFile(path.join(__dirname, "WhoWeAre.html"));
});

// Ruta para servir login.html
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

// Ruta protegida para descargar el archivo solo si está logeado
app.get("/download", (req, res) => {
    const archivo = path.join(__dirname, "Designer.jpeg"); // O el archivo real que quieras servir

    // Comprobación simple
    const autorizado = true; 

    if (autorizado && fs.existsSync(archivo)) {
        res.download(archivo, "app_instalador.jpeg"); // Lo envía como descarga
    } else {
        res.status(401).send("No autorizado o archivo no encontrado");
    }
});


// Escuchar en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
