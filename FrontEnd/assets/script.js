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
console.log("worksData", worksData);

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

// Fonction pour créer la modale
function createModal() {
  // Créez un nouvel élément DIV pour la modale
  var modal = document.createElement("div");
  modal.setAttribute("id", "myModal");
  modal.classList.add("modal");

  // Créez le contenu de la modale
  var modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Ajoutez un élément span pour pouvoir fermer la modale
  var closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  modalContent.appendChild(closeBtn); // Le bouton de fermeture est ajouté à modalBody

  // Créez la div intermédiaire qui contiendra tout le corps de la modale
  var modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  // Ajoutez un titre à la modale
  var modalTitle = document.createElement("h2");
  modalTitle.textContent = "Galerie photo";
  modalTitle.classList.add("modal-title"); // Ajoutez une classe pour le style du titre
  modalBody.appendChild(modalTitle); // Ajoutez le titre au modalBody

  // Ajoutez une div pour contenir les images
  var imagesContainer = document.createElement("div");
  imagesContainer.classList.add("images-container");

  // Vérifiez si worksData contient des données
  if (worksData) {
    // Bouclez sur chaque travail et créez une image pour l'ajouter au conteneur
    worksData.forEach((work) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("modal-image-wrapper");

      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      img.classList.add("modal-image"); // Ajoutez une classe pour le style des images

      // Ajoute un conteneur pour l'icône de corbeille
      const deleteIconContainer = document.createElement("div");
      deleteIconContainer.classList.add("delete-icon-container");

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-regular", "fa-trash-can");
      deleteIcon.setAttribute("data-id", work.id); // Attachez l'id du travail à l'icône

      // Ajoutez un écouteur d'événement sur l'icône pour gérer la suppression
      deleteIcon.addEventListener("click", function () {
        deleteWork(this.getAttribute("data-id")); // Gérer la suppression du travail
      });

      // Place l'icône dans le conteneur
      deleteIconContainer.appendChild(deleteIcon);

      // Ajoute le conteneur de l'icône au wrapper de l'image
      imageWrapper.appendChild(img);
      imageWrapper.appendChild(deleteIconContainer);

      // Ajoutez l'image wrapper à la div des images
      imagesContainer.appendChild(imageWrapper);
    });
  }

  // Ajoutez la div pour contenir les images au modalBody
  modalBody.appendChild(imagesContainer);

  // Ajoutez une div pour centrer le bouton d'ajout de photo
  var buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // Créez le bouton pour ajouter une photo
  var addButton = document.createElement("button");
  addButton.textContent = "Ajouter une photo";
  addButton.classList.add("add-button");

  // Ajoutez le bouton à son conteneur
  buttonContainer.appendChild(addButton);

  // Ajoutez le conteneur de boutons au modalBody
  modalBody.appendChild(buttonContainer);

  // Ajoutez le modalBody au contenu de la modale
  modalContent.appendChild(modalBody);

  // Ajoutez le contenu de la modale à la modale
  modal.appendChild(modalContent);

  // Ajoutez la modale au corps du document
  document.body.appendChild(modal);

  // Gestion des clics sur le bouton de fermeture
  closeBtn.onclick = function () {
    modal.parentNode.removeChild(modal);
  };

  // Gestion des clics en dehors de la modale
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.parentNode.removeChild(modal);
    }
  };
}

// Fonction pour créer la modale
function createModal_Add() {
  // Créez un nouvel élément DIV pour la modale
  var modal = document.createElement("div");
  modal.setAttribute("id", "myModal");
  modal.classList.add("modal");

  // Créez le contenu de la modale
  var modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Ajoutez un élément span pour pouvoir fermer la modale
  var closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  modalContent.appendChild(closeBtn); // Le bouton de fermeture est ajouté à modalBody

  // Créez la div intermédiaire qui contiendra tout le corps de la modale
  var modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  // Ajoutez un titre à la modale
  var modalTitle = document.createElement("h2");
  modalTitle.textContent = "Galerie photo";
  modalTitle.classList.add("modal-title"); // Ajoutez une classe pour le style du titre
  modalBody.appendChild(modalTitle); // Ajoutez le titre au modalBody

  // Ajoutez une div pour contenir les images
  var imagesContainer = document.createElement("div");
  imagesContainer.classList.add("images-container");

  // Vérifiez si worksData contient des données
  if (worksData) {
    // Bouclez sur chaque travail et créez une image pour l'ajouter au conteneur
    worksData.forEach((work) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("modal-image-wrapper");

      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      img.classList.add("modal-image"); // Ajoutez une classe pour le style des images

      // Ajoute un conteneur pour l'icône de corbeille
      const deleteIconContainer = document.createElement("div");
      deleteIconContainer.classList.add("delete-icon-container");

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-regular", "fa-trash-can");
      deleteIcon.setAttribute("data-id", work.id); // Attachez l'id du travail à l'icône

      // Ajoutez un écouteur d'événement sur l'icône pour gérer la suppression
      deleteIcon.addEventListener("click", function () {
        deleteWork(this.getAttribute("data-id")); // Gérer la suppression du travail
      });

      // Place l'icône dans le conteneur
      deleteIconContainer.appendChild(deleteIcon);

      // Ajoute le conteneur de l'icône au wrapper de l'image
      imageWrapper.appendChild(img);
      imageWrapper.appendChild(deleteIconContainer);

      // Ajoutez l'image wrapper à la div des images
      imagesContainer.appendChild(imageWrapper);
    });
  }

  // Ajoutez la div pour contenir les images au modalBody
  modalBody.appendChild(imagesContainer);

  // Ajoutez une div pour centrer le bouton d'ajout de photo
  var buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // Créez le bouton pour ajouter une photo
  var addButton = document.createElement("button");
  addButton.textContent = "Ajouter une photo";
  addButton.classList.add("add-button");

  // Ajoutez le bouton à son conteneur
  buttonContainer.appendChild(addButton);

  // Ajoutez le conteneur de boutons au modalBody
  modalBody.appendChild(buttonContainer);

  // Ajoutez le modalBody au contenu de la modale
  modalContent.appendChild(modalBody);

  // Ajoutez le contenu de la modale à la modale
  modal.appendChild(modalContent);

  // Ajoutez la modale au corps du document
  document.body.appendChild(modal);

  // Gestion des clics sur le bouton de fermeture
  closeBtn.onclick = function () {
    modal.parentNode.removeChild(modal);
  };

  // Gestion des clics en dehors de la modale
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.parentNode.removeChild(modal);
    }
  };
}

// Fonction pour afficher la modale
function showModal() {
  var modal = document.getElementById("myModal") || createModal();
  modal.style.display = "block";
}

// Lorsque l'utilisateur clique sur le bouton, appelez showModal()
document.getElementById("update_projet").onclick = function () {
  console.log("action sur update_projet");
  createModal();
  showModal();
};

// Fonction pour gérer la suppression d'un travail
function deleteWork(workId) {
  // Ici, tu pourrais appeler l'API pour supprimer le travail en utilisant workId
  console.log("Supprimer le travail avec l'ID :", workId);
  // Ajoute la logique d'appel API ici...
}
