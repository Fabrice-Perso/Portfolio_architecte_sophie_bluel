let worksData; // Variable globale pour stocker les données
let categories; // Variable globale pour stocker les catégories

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

// Fonction pour récupérer les catégories via l'API
function fetchCategories() {
  fetch("http://localhost:5678/api/categories") // Assurez-vous que l'URL est correcte
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Réponse réseau incorrecte : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      categories = data; // Stockez les catégories dans la variable globale
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
}

// Appelez la fonction fetchWorks pour récupérer les données
fetchWorks();

// Appelez la fonction fetchCategories pour obtenir les catégories
fetchCategories();

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

    // Si une catégorie correspondante est trouvée
    if (category) {
      // Filtrez les travaux par la catégorie correspondante
      const filteredWorks = worksData.filter((work) => work.category.name === category.name);
      // Appelez la fonction displayWorks pour afficher les travaux filtrés
      displayWorks(filteredWorks);
    } else if (buttonId === "btn-all") {
      // Si le bouton "Tous" est cliqué, affichez tous les travaux
      displayWorks(worksData);
    }
  }
});
