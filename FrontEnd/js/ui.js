import { getWorksData } from "./store.js";
import { createButtonContainer, createImagesContainer } from "./utils.js";
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

// Fonction pour créer la modale
export function createModal(worksData) {
  var modal = document.createElement("div");
  modal.setAttribute("id", "myModal");
  modal.classList.add("modal");

  var modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Créez un conteneur pour l'en-tête de la modale
  var modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  // Créez l'icône de retour et ajoutez-la au conteneur d'en-tête (elle est cachée par défaut)
  var backIcon = document.createElement("i");
  backIcon.classList.add("fa-solid", "fa-arrow-left", "back-icon");
  backIcon.classList.remove("visible");
  backIcon.onclick = function () {
    // Logique pour revenir en arrière (à implémenter)
    // Masquez le corps actuel de la modale
    const currentModalBody = document.querySelector(".modal-delete");
    const oldModalBody = document.querySelector(".modal-addpicture");
    const backIcon = document.querySelector(".back-icon");
    oldModalBody.style.display = "none";
    currentModalBody.style.display = "flex";
    // Rendez l'icône de retour visible
    backIcon.classList.remove("visible");
  };
  modalHeader.appendChild(backIcon);

  // Créez le bouton de fermeture et ajoutez-le au conteneur d'en-tête
  var closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  modalHeader.appendChild(closeBtn);

  // Ajoutez le conteneur d'en-tête au début de la modal-content
  modalContent.appendChild(modalHeader);

  // Continuez avec le corps de la modale comme avant
  var modalBody = createModalBody(worksData);
  modalContent.appendChild(modalBody);

  // Ajoutez le modal-content au modal
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Logique pour fermer la modale lors d'un clic à l'extérieur
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Fonction pour créer le corps de la modale
function createModalBody(worksData) {
  var modalBody = document.createElement("div");
  modalBody.classList.add("modal-delete");

  // Ajoutez un titre à la modale
  var modalTitle = document.createElement("h2");
  modalTitle.textContent = "Galerie photo";
  modalTitle.classList.add("modal-title");
  modalBody.appendChild(modalTitle);

  // Ajoutez la div pour contenir les images
  var imagesContainer = createImagesContainer(worksData);
  modalBody.appendChild(imagesContainer);

  // Ajoutez une div pour centrer le bouton d'ajout de photo
  var addButtonContainer = createButtonContainer("Ajouter une photo", "add-button", createAddImageForm);
  modalBody.appendChild(addButtonContainer);

  return modalBody;
}

// Fonction pour créer le formulaire d'ajout d'image
async function createAddImageForm() {
  // Masquez le corps actuel de la modale
  const currentModalBody = document.querySelector(".modal-delete");
  currentModalBody.style.display = "none";

  // Rendez l'icône de retour visible
  const backIcon = document.querySelector(".back-icon");
  backIcon.classList.add("visible");

  // Créez le nouveau corps de la modale pour le formulaire d'ajout
  const addImageModalBody = document.createElement("div");
  addImageModalBody.classList.add("modal-addpicture");
  addImageModalBody.style.display = "flex"; // Utilisez flex pour les éléments internes

  // Ajoutez un titre à la modale d'ajout de photo
  var modalTitle = document.createElement("h2");
  modalTitle.textContent = "Ajout photo";
  modalTitle.classList.add("modal-title");
  addImageModalBody.appendChild(modalTitle);

  // Conteneur pour le téléchargement de fichier
  const fileUploadContainer = document.createElement("div");
  fileUploadContainer.classList.add("file-upload-container");

  const fileUploadLabel = document.createElement("label");
  fileUploadLabel.classList.add("file-upload-label");

  const fileIcon = document.createElement("i");
  fileIcon.classList.add("fa-regular", "fa-image"); // Assurez-vous d'avoir FontAwesome chargé ou remplacez par une image

  const uploadText = document.createElement("span");
  uploadText.classList.add("upload-text");
  uploadText.textContent = "+ Ajouter photo";

  const fileFormat = document.createElement("span");
  fileFormat.classList.add("file-format");
  fileFormat.textContent = "jpg, png · 4mo max";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "file-upload";
  fileInput.classList.add("file-upload-input");
  fileInput.style.opacity = "0"; // Rendre l'input de type file transparent

  // Créez un élément où la prévisualisation de l'image sera affichée
  const imagePreviewContainer = document.createElement("div");
  imagePreviewContainer.classList.add("image-preview-container");

  // Ajoutez un événement 'change' à l'input de type file
  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      // Assurez-vous que c'est une image
      const reader = new FileReader();
      reader.onload = function (e) {
        // Créez un élément d'image pour la prévisualisation
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("image-preview");

        // Nettoyez la prévisualisation précédente, s'il y en a
        imagePreviewContainer.innerHTML = "";

        // Ajoutez l'image à la prévisualisation
        imagePreviewContainer.appendChild(img);

        // Changez les propriétés CSS pour affichage
        fileUploadLabel.style.display = "none"; // Masquez le label de téléchargement de fichier
        imagePreviewContainer.style.display = "flex"; // Affichez le conteneur de prévisualisation
      };
      reader.readAsDataURL(file);
    } else {
      // Si aucun fichier n'est sélectionné, réinitialisez l'affichage
      fileUploadLabel.style.display = "flex"; // Affichez le label de téléchargement de fichier
      imagePreviewContainer.style.display = "none"; // Masquez le conteneur de prévisualisation
    }
  });

  // Ajoutez les éléments au label
  fileUploadLabel.appendChild(fileIcon);
  fileUploadLabel.appendChild(uploadText);
  fileUploadLabel.appendChild(fileInput);
  fileUploadLabel.appendChild(fileFormat);
  fileUploadContainer.appendChild(imagePreviewContainer); // Ajoutez le conteneur de prévisualisation après l'input file

  // Ajoutez le label au conteneur de téléchargement de fichier
  fileUploadContainer.appendChild(fileUploadLabel);

  // Ajoutez le conteneur de téléchargement de fichier au corps de la modale
  addImageModalBody.appendChild(fileUploadContainer);

  // Créez le champ de saisie pour le titre
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Titre";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.classList.add("form-control"); // Assurez-vous que cette classe correspond à votre CSS pour les champs de texte
  titleInput.placeholder = "Entrez le titre de l'image";

  // Créez la liste déroulante pour les catégories
  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Catégorie";
  const categorySelect = document.createElement("select");
  categorySelect.id = "category-select"; // Ajoutez un ID pour la référence
  categorySelect.classList.add("form-control");

  // Ajoutez le label et la liste déroulante au corps de la modale
  addImageModalBody.appendChild(categoryLabel);
  addImageModalBody.appendChild(categorySelect);

  // Ajoutez le nouveau corps de la modale au contenu de la modale
  const modalContent = document.querySelector(".modal-content");
  modalContent.appendChild(addImageModalBody);

  try {
    const categorySelect = document.getElementById("category-select");
    const categories = await fetchCategories();

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }

  // Création du bouton de soumission "Valider"
  var validateButtonContainer = createButtonContainer(
    "Valider",
    ["btn-valider"], // Passez les classes comme un tableau
    null, // Aucun gestionnaire d'événement click spécifique si le bouton fait partie d'un formulaire
    "submit" // Type de bouton
  );

  // Ajoutez les champs de formulaire et le bouton au corps de la modale
  addImageModalBody.appendChild(titleLabel);
  addImageModalBody.appendChild(titleInput);
  addImageModalBody.appendChild(categoryLabel);
  addImageModalBody.appendChild(categorySelect);
  // Ajoutez ce bouton de soumission au corps de la modale ou au formulaire comme nécessaire
  addImageModalBody.appendChild(validateButtonContainer);
}

// Fonction pour afficher la modale
export function showModal() {
  var modal = document.getElementById("myModal") || createModal();
  modal.style.display = "flex";
}
