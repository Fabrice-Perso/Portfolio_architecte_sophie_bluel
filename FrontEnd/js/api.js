// api.js

export async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(`Réponse réseau incorrecte : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Gérez les erreurs de façon appropriée
    console.error("Erreur lors de la récupération des travaux :", error);
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
      throw new Error(`Réponse réseau incorrecte : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Gérez les erreurs de façon appropriée
    console.error("Erreur lors de la récupération des catégories :", error);
  }
}
