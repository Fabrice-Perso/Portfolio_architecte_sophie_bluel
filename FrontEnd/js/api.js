// api.js

export function fetchWorks() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Réponse réseau incorrecte : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Vous pouvez ici mettre à jour votre état global avec les données reçues
      return data; // Retourne les données pour une utilisation ultérieure
    })
    .catch((error) => {
      // Gérez les erreurs de façon appropriée
      console.error("Erreur lors de la récupération des travaux :", error);
    });
}

export function fetchCategories() {
  return fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Réponse réseau incorrecte : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Vous pouvez ici mettre à jour votre état global avec les données reçues
      return data; // Retourne les données pour une utilisation ultérieure
    })
    .catch((error) => {
      // Gérez les erreurs de façon appropriée
      console.error("Erreur lors de la récupération des catégories :", error);
    });
}
