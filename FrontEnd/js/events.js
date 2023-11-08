// events.js
import { getWorksData } from "./store.js";
import { createModal, showModal } from "./ui.js";
// import { worksData } from "./data.js"; // Supposons que vous ayez un fichier data.js qui exporte worksData

// Fonction pour créer la div en mode édition
export function createEditModeDiv() {
  // Créez la div en mode édition
  const editModeDiv = document.createElement("div");
  editModeDiv.classList.add("edit-mode-div"); // Ajoutez la classe CSS

  // Créez une icône Font Awesome
  const editModeIcon = document.createElement("i");
  editModeIcon.classList.add("fa-regular", "fa-pen-to-square", "edit-mode-icon"); // Ajoutez la classe CSS
  editModeDiv.appendChild(editModeIcon);

  // Créez un élément de texte
  const editModeText = document.createElement("p");
  editModeText.textContent = "Mode édition";
  editModeText.classList.add("edit-mode-text"); // Ajoutez la classe CSS
  editModeDiv.appendChild(editModeText);

  // Insérez la div en haut de la page
  document.body.insertBefore(editModeDiv, document.body.firstChild);
}

// Fonction pour supprimer la div en mode édition
export function removeEditModeDiv() {
  const editModeDiv = document.querySelector(".edit-mode-div");
  if (editModeDiv) {
    editModeDiv.remove();
  }
}

// Fonction pour gérer la suppression d'un travail
function deleteWork(workId) {
  // Ici, tu pourrais appeler l'API pour supprimer le travail en utilisant workId
  console.log("Supprimer le travail avec l'ID :", workId);
  // Ajoute la logique d'appel API ici...
}

export function setUpEventListeners() {
  const updateProjectButton = document.getElementById("update_projet");
  if (updateProjectButton) {
    updateProjectButton.onclick = function () {
      console.log("action sur update_projet");
      const worksData = getWorksData(); // Récupère les données de travaux
      createModal(worksData); // Crée une modal avec les données récupérées
      showModal(); // Affiche la modal
    };
  }
}
