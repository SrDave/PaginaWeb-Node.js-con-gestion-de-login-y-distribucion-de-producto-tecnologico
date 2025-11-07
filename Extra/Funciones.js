// Abre ventana de login y espera a que se cierre
function openLogin() {
    const loginWindow = window.open('login.html', '_blank', 'width=400,height=550');
  
    const checkInterval = setInterval(() => {
      if (loginWindow.closed) {
        clearInterval(checkInterval);
  
        if (localStorage.getItem("loggedIn") === "true") {
          const loginLink = document.getElementById("login-link");
          const logoutLink = document.getElementById("logout-link");
  
          if (loginLink && logoutLink) {
            loginLink.style.display = "none";
            logoutLink.style.display = "block";
          }
        }
      }
    }, 500);
  }
  
  // Cierra sesión y actualiza el nav
  function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
  
    const loginLink = document.getElementById("login-link");
    const logoutLink = document.getElementById("logout-link");
  
    if (loginLink && logoutLink) {
      loginLink.style.display = "block";
      logoutLink.style.display = "none";
    }
    // Restaurar texto por defecto
    const profileAnchor = document.querySelector(".profile a");
    if (profileAnchor) {
        profileAnchor.innerHTML = "Your Profile ▾";
    }
  }
  
  // Detecta si ya hay sesión iniciada al cargar la página
  document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.getElementById("login-link");
    const logoutLink = document.getElementById("logout-link");
  
    if (localStorage.getItem("loggedIn") === "true") {
        loginLink.style.display = "none";
        logoutLink.style.display = "block";
        // Añadir nombre de usuario al lado de "Your Profile"
        const username = localStorage.getItem("username");
        const profileAnchor = document.querySelector(".profile a");
        if (username && profileAnchor) {
            profileAnchor.innerHTML = `👤 ${username} ▾`;
        } else {
            loginLink.style.display = "block";
            logoutLink.style.display = "none";
            if (profileAnchor) {
                profileAnchor.innerHTML = "Your Profile ▾";
            }
        }
    }
  });
  
// Función para manejar el login
function handleLogin(event) {
    event.preventDefault();  // Evitar que el formulario se envíe de manera tradicional

    // Obtener los valores de usuario y contraseña
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Enviar los datos al servidor para verificar si el usuario existe
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        // Si el login es exitoso
        if (data.success) {
            alert(data.message);
            localStorage.setItem("username", username); // <-- GUARDAMOS EL NOMBRE
            localStorage.setItem("loggedIn", "true");
            // Notificar a la ventana principal
            if (window.opener && !window.opener.closed) {
                window.opener.postMessage({ type: "login-success" }, "*");
            }         
            window.close(); // Cierra la ventana de login
        } else {
            alert(data.message);  // Si el login falla
        }
    })
    .catch(error => {
        console.error("Error en el login:", error);
        alert("Hubo un error al procesar la solicitud. Inténtalo de nuevo.");
    });
    
}
  

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch("/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        alert(result.message);

        if (result.success) {
            form.reset();
        }
    });
});

 // Función reutilizable para actualizar el nav
function actualizarNav() {
    const loginLink = document.getElementById("login-link");
    const logoutLink = document.getElementById("logout-link");
    const profileAnchor = document.querySelector(".profile a");
    const username = localStorage.getItem("username");

    if (localStorage.getItem("loggedIn") === "true" && username) {
        if (loginLink) loginLink.style.display = "none";
        if (logoutLink) logoutLink.style.display = "block";
        if (profileAnchor) profileAnchor.innerHTML = `👤 ${username} ▾`;
    } else {
        if (loginLink) loginLink.style.display = "block";
        if (logoutLink) logoutLink.style.display = "none";
        if (profileAnchor) profileAnchor.innerHTML = "Your Profile ▾";
    }
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    actualizarNav();
});

// Al recibir el mensaje desde la ventana de login
window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "login-success") {
        actualizarNav(); // actualiza el navbar sin recargar
    }
});
 