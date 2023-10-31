let worksData; // Variable globale pour stocker les données

function fetchWorks() {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Réponse réseau incorrecte : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      worksData = data; // Stockez les données dans la variable globale
      displayWorks(data);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la récupération des données :", error);
    });
}

function displayWorks(works) {
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

const categoryButtons = document.querySelector("#category-buttons");

function fetchCategories() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Réponse réseau incorrecte : ${response.status}`);
      }
      return response.json();
    })
    .then((categories) => {
      displayCategories(categories);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la récupération des catégories :", error);
    });
}

function displayCategories(categories) {
  // Créez un bouton "Tous" pour afficher tous les travaux
  const allButton = document.createElement("button");
  allButton.id = "btn-all";
  allButton.textContent = "Tous";

  // Ajoutez le bouton "Tous" au conteneur des boutons de catégorie
  categoryButtons.appendChild(allButton);

  // Ajoutez un gestionnaire d'événements pour afficher tous les travaux lorsque le bouton "Tous" est cliqué
  allButton.addEventListener("click", function () {
    displayWorks(worksData); // Afficher tous les travaux
  });

  // Générez les boutons de catégorie comme vous l'avez fait précédemment
  categories.forEach((category) => {
    const button = document.createElement("button");
    const categoryId = `btn-${category.name.replace(/&/g, "").replace(/\s+/g, "-").toLowerCase()}`;
    button.id = categoryId;
    button.textContent = category.name;

    // Ajoutez un gestionnaire d'événements click pour chaque bouton de filtre
    button.addEventListener("click", function () {
      const filteredWorks = worksData.filter((work) => work.category.name === category.name);
      displayWorks(filteredWorks);
    });

    categoryButtons.appendChild(button);
  });
}

// Appelez la fonction fetchWorks pour récupérer les données
fetchWorks();

// Appelez la fonction fetchCategories pour obtenir les catégories
fetchCategories();

// Ajoutez un gestionnaire d'événements click pour chaque bouton de filtre
const btnObjets = document.getElementById("btn-objets");
if (btnObjets) {
  document.getElementById("btn-objets").addEventListener("click", function () {
    // Filtre les travaux par catégorie "Objets"
    const filteredWorks = worksData.filter((work) => work.category.name === "Objets");
    displayWorks(filteredWorks);
  });
}
const btnAppart = document.getElementById("btn-appartements");
if (btnAppart) {
  document.getElementById("btn-appartements").addEventListener("click", function () {
    // Filtre les travaux par catégorie "Appartements"
    const filteredWorks = worksData.filter((work) => work.category.name === "Appartements");
    displayWorks(filteredWorks);
  });
}
const btnHotelRestau = document.getElementById("btn-hotels-restaurants");
if (btnHotelRestau) {
  document.getElementById("btn-hotels-restaurants").addEventListener("click", function () {
    // Filtre les travaux par catégorie "Hotels & restaurants"
    const filteredWorks = worksData.filter((work) => work.category.name === "Hotels & restaurants");
    displayWorks(filteredWorks);
  });
}
