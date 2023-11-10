// login.js
import { handleLoginFormSubmit } from "./auth.js"; // Assurez-vous que le chemin est correct
import { checkLoginState } from "./auth.js";
import { setupContactLink } from "./events.js";
import { setupProjetLink } from "./events.js";

// Fonction pour initialiser le formulaire de connexion
async function initLoginForm() {
  const loginForm = document.querySelector("form");

  // Assurez-vous que le formulaire existe avant d'ajouter un gestionnaire d'événements
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginFormSubmit);
  }
}

// Exécutez la fonction initLoginForm directement
initLoginForm();
// Fonction pour vérifier l'état de connexion lors du chargement de la page
checkLoginState();
setupContactLink(); // Configure le gestionnaire d'événements pour le lien de contact
setupProjetLink(); // Configure le gestionnaire d'événements pour le lien de Projet
