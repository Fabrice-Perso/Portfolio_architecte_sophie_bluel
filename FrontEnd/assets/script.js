let worksData; // Variable globale pour stocker les données
let categories; // Variable globale pour stocker les catégories

// Fonction pour récupérer les travaux via l'API
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

// Fonction pour afficher les travaux
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

// Fonction pour afficher les catégories
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

// Fonction pour créer la div en mode édition
function createEditModeDiv() {
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
function removeEditModeDiv() {
  const editModeDiv = document.querySelector(".edit-mode-div");
  if (editModeDiv) {
    editModeDiv.remove();
  }
}

// Fonction pour créer le mode édition projet
function createEditModeProjet() {
  // Sélectionnez le titre h2
  const title = document.querySelector("#portfolio h2");

  // Créez un conteneur pour le titre, l'icône et le texte
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");

  // Créez le texte "Modifier" avec le style approprié
  const editText = document.createElement("span");
  editText.textContent = "modifier";
  editText.id = "update_projet"; // Ajoutez l'attribut id

  // Créez l'icône Font Awesome avec le style approprié
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");

  // Retirez le titre h2 de son emplacement actuel
  title.remove();

  // Ajoutez le titre, l'icône et le texte au conteneur
  titleContainer.appendChild(title);
  titleContainer.appendChild(editIcon);
  titleContainer.appendChild(editText);

  // Sélectionnez la section #portfolio
  const portfolioSection = document.querySelector("#portfolio");

  // Ajoutez le conteneur au début de la section
  portfolioSection.insertBefore(titleContainer, portfolioSection.firstChild);
}

// Fonction pour supprimer le mode édition projet
function removeEditModeProjet() {
  // Sélectionnez le titre en mode édition
  const titleContainer = document.querySelector("#portfolio .title-container");

  // Supprimez le titre en mode édition s'il existe
  if (titleContainer) {
    titleContainer.remove();
  }
}

// Gestion de la déconnexion
function handleLogout() {
  localStorage.removeItem("token");
  localStorage.setItem("isLoggedIn", "false");
  loginLink.textContent = "Log In";
  removeEditModeDiv();
  removeEditModeProjet();
}

// Vérifiez si l'utilisateur est connecté lors du chargement initial
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
  document.getElementById("login-link").textContent = "Log Out";
  createEditModeDiv();
  createEditModeProjet();
} else {
  document.getElementById("login-link").textContent = "Log In";
  removeEditModeDiv();
  removeEditModeProjet();
}

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

function updateNavigation() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  loginLink.textContent = isLoggedIn ? "Log Out" : "Log In";
}

updateNavigation();
