import { getWorksData } from "./store.js";
import { fetchCategories } from "./api.js";

// Fonction pour afficher les travaux
export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Réinitialisez la galerie à chaque appel

  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });

  console.log("Données récupérées et affichées avec succès :", works);
}

// Fonction pour afficher les catégories
export function displayCategories(categories) {
  console.log("function displayCategories Lue");
  const categoryButtons = document.querySelector("#category-buttons");

  // Créez un bouton "Tous" pour afficher tous les travaux
  const allButton = document.createElement("button");
  allButton.id = "btn-all";
  allButton.textContent = "Tous";
  allButton.classList.add("button-filtre", "active"); // Ajoutez les classes "button-filtre" et "active"

  // Ajoutez le bouton "Tous" au conteneur des boutons de catégorie
  categoryButtons.appendChild(allButton);

  // Générez les boutons de catégorie comme vous l'avez fait précédemment
  categories.forEach((category) => {
    const button = document.createElement("button");
    const categoryId = `btn-${category.name.replace(/&/g, "").replace(/\s+/g, "-").toLowerCase()}`;
    button.id = categoryId;
    button.textContent = category.name;
    button.classList.add("button-filtre"); // Ajoutez la classe "button-filtre" aux autres boutons

    categoryButtons.appendChild(button);
  });

  // Sélectionnez l'élément contenant les boutons de filtre (categoryButtons)
  categoryButtons.addEventListener("click", function (event) {
    // Vérifiez si l'élément cliqué (event.target) est un bouton avec la classe "button-filtre"
    if (event.target.classList.contains("button-filtre")) {
      // Supprimez la classe "active" de tous les boutons de filtre
      document.querySelectorAll(".button-filtre").forEach(function (btn) {
        btn.classList.remove("active");
      });
      // Ajoutez la classe "active" au bouton cliqué
      event.target.classList.add("active");

      // Récupérez la catégorie correspondante à partir de l'ID du bouton
      const buttonId = event.target.id;
      const category = categories.find((cat) => `btn-${cat.name.replace(/&/g, "").replace(/\s+/g, "-").toLowerCase()}` === buttonId);

      const works = getWorksData(); // Récupérez worksData depuis le store
      // Si une catégorie correspondante est trouvée
      if (category) {
        // Filtrez les travaux par la catégorie correspondante
        const filteredWorks = works.filter((work) => work.category.name === category.name);
        // Appelez la fonction displayWorks pour afficher les travaux filtrés
        displayWorks(filteredWorks);
      } else if (buttonId === "btn-all") {
        // Si le bouton "Tous" est cliqué, affichez tous les travaux
        displayWorks(works);
      }
    }
  });
}

// Fonction pour créer le mode édition projet
export function createEditModeProjet() {
  // Sélectionnez le titre h2
  const title = document.querySelector("#portfolio h2");

  // Créez un conteneur pour le titre, l'icône et le texte
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");

  // Créez le texte "Modifier" avec le style approprié
  const editText = document.createElement("span");
  editText.id = "update_projet"; // Ajoutez l'attribut id

  // Créez l'icône Font Awesome avec le style approprié
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");

  // Ajoutez d'abord l'icône au span
  editText.appendChild(editIcon);

  // Ensuite, définissez le texte du span. Cela gardera l'icône avant le texte.
  editText.append(" modifier"); // Utilisez append pour ajouter du texte après l'icône

  // Retirez le titre h2 de son emplacement actuel
  title.remove();

  // Ajoutez le titre, et le conteneur (qui inclut maintenant l'icône et le texte) à titleContainer
  titleContainer.appendChild(title);
  titleContainer.appendChild(editText);

  // Sélectionnez la section #portfolio
  const portfolioSection = document.querySelector("#portfolio");

  // Ajoutez le conteneur au début de la section
  portfolioSection.insertBefore(titleContainer, portfolioSection.firstChild);
}

// Fonction pour supprimer le mode édition projet
export function removeEditModeProjet() {
  // Sélectionnez le titre en mode édition
  const titleContainer = document.querySelector("#portfolio .title-container");

  // Supprimez le titre en mode édition s'il existe
  if (titleContainer) {
    titleContainer.remove();
  }
}

// Fonction pour afficher la modale
export function showModal() {
  var modal = document.getElementById("myModal") || createModal();
  modal.style.display = "flex";
}
