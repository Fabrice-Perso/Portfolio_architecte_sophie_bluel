// auth.js
import { createEditModeDiv, removeEditModeDiv } from "./events.js";
import { createEditModeProjet, removeEditModeProjet } from "./ui.js";

function updateNavigation() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginLink = document.getElementById("login-link");
  loginLink.textContent = isLoggedIn ? "Log Out" : "Log In";
}

export function checkLoginState() {
  updateNavigation();
  if (localStorage.getItem("isLoggedIn") === "true") {
    createEditModeDiv();
    createEditModeProjet();
  } else {
    removeEditModeDiv();
    removeEditModeProjet();
  }
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
