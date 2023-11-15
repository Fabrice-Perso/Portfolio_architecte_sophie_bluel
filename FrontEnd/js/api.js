// api.js
import { isProduction } from "./config.js";
/**
 * Récupère les " Work "  depuis l'API du serveur.
 * Effectue une requête GET pour obtenir les données des " Work "  et les retourne.
 * @returns {Promise<Array>} Une promesse qui résout avec un tableau des " Work " .
 */
export async function fetchWorks() {
  if (!isProduction) console.log("Fonction fetchWorks");
  try {
    // Effectue la requête à l'API des " Work "
    const response = await fetch("http://localhost:5678/api/works");
    // Vérifie que la réponse du réseau est ok (statut HTTP 200-299)
    if (!response.ok) {
      throw new Error(`Réponse réseau incorrecte : ${response.status}`);
    }
    // Parse la réponse en JSON
    const data = await response.json();
    return data; // Retourne les données des " Work "
  } catch (error) {
    // Log l'erreur en console si la requête échoue
    console.error("Erreur lors de la récupération des travaux :", error);
  }
}

/**
 * Récupère les catégories depuis l'API du serveur.
 * Effectue une requête GET pour obtenir les données des catégories et les retourne.
 * @returns {Promise<Array>} Une promesse qui résout avec un tableau des catégories.
 */
export async function fetchCategories() {
  if (!isProduction) console.log("Fonction fetchCategories");
  try {
    // Effectue la requête à l'API des catégories
    const response = await fetch("http://localhost:5678/api/categories");
    // Vérifie que la réponse du réseau est ok (statut HTTP 200-299)
    if (!response.ok) {
      throw new Error(`Réponse réseau incorrecte : ${response.status}`);
    }
    // Parse la réponse en JSON
    const data = await response.json();
    return data; // Retourne les données des catégories
  } catch (error) {
    // Log l'erreur en console si la requête échoue
    console.error("Erreur lors de la récupération des catégories :", error);
  }
}
