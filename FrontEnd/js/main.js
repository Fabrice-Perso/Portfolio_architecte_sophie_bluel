// main.js
import { fetchWorks, fetchCategories } from "./api.js";
import { setWorksData } from "./store.js";
import { displayWorks, displayCategories } from "./ui.js";
import { setupLoginLink } from "./auth.js";
import { checkLoginState } from "./auth.js";
import { setUpEventListeners } from "./events.js";
import { setupContactLink } from "./events.js";
import { setupProjetLink } from "./events.js";

async function initializeApp() {
  try {
    refreshWorks();

    const categoriesData = await fetchCategories();
    displayCategories(categoriesData); // Mettez à jour l'UI avec les catégories récupérées

    checkLoginState(); // Vérifie l'état de connexion et met à jour l'UI en conséquence
    setupLoginLink(); // Configure le gestionnaire d'événements pour le lien de connexion/déconnexion
    setupContactLink(); // Configure le gestionnaire d'événements pour le lien de contact
    setupProjetLink(); // Configure le gestionnaire d'événements pour le lien de Projet

    setUpEventListeners();
  } catch (error) {
    console.error("Erreur lors de l'initialisation de l'application :", error);
  }
}

initializeApp();
export async function refreshWorks() {
  try {
    const works = await fetchWorks();
    setWorksData(works); // Stockez les données de works dans le store
    displayWorks(works); // Mettez à jour l'UI avec les travaux récupérés
  } catch (error) {
    console.error("Erreur lors du rafraîchissement des travaux et des catégories :", error);
  }
}

// ...

// Puis, après une opération d'ajout ou de suppression réussie, appelez :
refreshWorks();
