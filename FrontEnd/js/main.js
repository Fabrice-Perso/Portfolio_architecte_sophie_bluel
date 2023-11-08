// main.js
import { fetchWorks, fetchCategories } from "./api.js";
import { setWorksData } from "./store.js";
import { displayWorks, displayCategories } from "./ui.js";
import { setupLoginLink } from "./auth.js";
import { checkLoginState } from "./auth.js";
import { setUpEventListeners } from "./events.js";

async function initializeApp() {
  try {
    const works = await fetchWorks();
    setWorksData(works); // Stockez les données de works dans le store
    displayWorks(works); // Mettez à jour l'UI avec les travaux récupérés

    const categoriesData = await fetchCategories();
    displayCategories(categoriesData); // Mettez à jour l'UI avec les catégories récupérées

    checkLoginState(); // Vérifie l'état de connexion et met à jour l'UI en conséquence
    setupLoginLink(); // Configure le gestionnaire d'événements pour le lien de connexion/déconnexion

    setUpEventListeners();
    // ...plus d'initialisation si nécessaire...
  } catch (error) {
    console.error("Erreur lors de l'initialisation de l'application :", error);
  }
}

initializeApp();

// // main.js
// import { checkLoginState } from "./auth.js";
// import { fetchWorks, fetchCategories } from "./api.js";
// import { displayWorks, displayCategories } from "./ui.js";
// import { setUpEventListeners } from "./events.js";
// // ...plus d'imports...

// // Initialisation de l'application
// // Appelez la fonction fetchWorks pour récupérer les données
// fetchWorks();

// // Appelez la fonction fetchCategories pour obtenir les catégories
// fetchCategories();

// // Vérifier l'état de connexion au démarrage de l'application
// checkLoginState();

// // Configuration des écouteurs d'événements après le chargement de la page
// document.addEventListener("DOMContentLoaded", () => {
//   setUpEventListeners();
//   // ...autres initialisations...
// });
