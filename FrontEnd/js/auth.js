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
      throw new Error("Les informations d'identifications sont incorrectes.");
    }

    const data = await response.json();
    console.log("Login successful, received data:", data); // Pour le débogage

    if (data) {
      console.log("Token is present, updating local storage"); // Pour le débogage
      localStorage.setItem("token", data.token);
      console.log("userId à enregistrer:", data.userId); // Ajoutez cette ligne
      localStorage.setItem("userId", data.userId);
      console.log("userId enregistré dans localStorage:", localStorage.getItem("userId")); // Ajoutez cette ligne

      localStorage.setItem("isLoggedIn", "true");

      // Mise à jour de la navigation et modification de l'UI sans appeler
      updateNavigation();
      console.log("Redirecting to home page"); // Pour le débogage
      showModal("Connexion réussie.", true, "index.html"); // Afficher le modal de succès
      // window.location.href = "index.html"; // Redirigez vers la page principale
    } else {
      console.error("Token is missing in the response");
      console.error("userId is missing in the response"); // Ajoutez cette ligne
      throw new Error("Token manquant dans la réponse.");
    }
  } catch (error) {
    console.error("Erreur de connexion :", error);
    showModal("Échec de la connexion : " + error.message, false); // Afficher le modal d'échec
    //alert(error.message); // Utilisez message pour une alerte plus spécifique
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

  showModal("Déconnexion réussie.", true); // Afficher le modal de déconnexion
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

function showModal(message, isSuccess, redirectUrl) {
  // Créer les éléments du modal
  const modal = document.createElement("div");
  const modalContent = document.createElement("div");
  const closeBtn = document.createElement("span"); // La croix pour fermer le modal
  const modalText = document.createElement("p");
  const okButton = document.createElement("button");

  // Configuration des éléments
  modal.className = "modal-login";
  modalContent.className = isSuccess ? "modal-content success" : "modal-content failure";

  // Configuration du bouton de fermeture
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.setAttribute("title", "Fermer");
  closeBtn.onclick = handleModalClose;

  // Ajout de classes à modalText et okButton
  modalText.classList.add("confirmation-message");
  modalText.textContent = message;

  okButton.classList.add("confirmation-modal-button");
  okButton.textContent = "OK";
  okButton.onclick = handleModalClose;

  // Assembler le modal
  modalContent.appendChild(closeBtn); // Ajouter le bouton de fermeture au contenu du modal
  modalContent.appendChild(modalText);
  modalContent.appendChild(okButton);
  modal.appendChild(modalContent);

  // Ajouter le modal au body
  document.body.appendChild(modal);

  function handleModalClose() {
    modal.remove();
    if (redirectUrl) {
      window.location.href = redirectUrl; // Redirige vers l'URL spécifiée
    }
  }
}
