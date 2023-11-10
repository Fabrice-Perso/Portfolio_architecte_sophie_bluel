// auth.js
import { createEditModeDiv, removeEditModeDiv } from "./events.js";
import { createEditModeProjet, removeEditModeProjet } from "./ui.js";

// auth.js ou login.js selon votre structure de projet

export async function handleLoginFormSubmit(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error("Response not OK:", response);
      throw new Error("Les informations d'identification sont incorrectes.");
    }

    const data = await response.json();
    console.log("Login successful, received data:", data); // Pour le débogage

    if (data.token) {
      console.log("Token is present, updating local storage"); // Pour le débogage
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");

      // Mise à jour de la navigation et modification de l'UI sans appeler
      updateNavigation();
      console.log("Redirecting to home page"); // Pour le débogage
      window.location.href = "index.html"; // Redirigez vers la page principale
    } else {
      console.error("Token is missing in the response");
      throw new Error("Token manquant dans la réponse.");
    }
  } catch (error) {
    console.error("Erreur de connexion :", error);
    alert(error.message); // Utilisez message pour une alerte plus spécifique
  }
}

export function checkLoginState() {
  console.log("fonction checkLoginState lue");
  updateNavigation();
  if (localStorage.getItem("isLoggedIn") === "true") {
    console.log("connecté");
    createEditModeDiv();
    createEditModeProjet();
  } else {
    console.log("non connecté");
    removeEditModeDiv();
    removeEditModeProjet();
  }
}

function updateNavigation() {
  console.log("fonction updateNavigation lue");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginLink = document.getElementById("login-link");
  loginLink.textContent = isLoggedIn ? "Log Out" : "Log In";
}

// Gestion de la déconnexion
function handleLogout() {
  localStorage.removeItem("token");
  localStorage.setItem("isLoggedIn", "false");
  const loginLink = document.getElementById("login-link");
  loginLink.textContent = "Log In";
  removeEditModeDiv();
  removeEditModeProjet();
}

// Ceci pourrait être dans votre fonction d'initialisation ou chargé après que le DOM est prêt
export function setupLoginLink() {
  const loginLink = document.getElementById("login-link");

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      handleLogout(); // Si l'utilisateur est connecté, déconnectez-le
    } else {
      window.location.href = "login.html"; // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    }
  });
}
