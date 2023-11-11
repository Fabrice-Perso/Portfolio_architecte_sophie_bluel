import { handleFormSubmit, handleFileSelect, fileDropped } from "./utils.js";
import { deleteWork } from "./utils.js";
import { fetchCategories } from "./api.js";

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
  backIcon.setAttribute("title", "Retour");
  backIcon.classList.remove("visible");
  backIcon.onclick = function () {
    // Logique pour revenir en arrière (à implémenter)
    // Masquez le corps actuel de la modale
    const currentModalBody = document.querySelector(".modal-delete");
    const oldModalBody = document.querySelector(".modal-addpicture");
    const backIcon = document.querySelector(".back-icon");
    oldModalBody.remove();
    currentModalBody.style.display = "flex";
    // Rendez l'icône de retour visible
    backIcon.classList.remove("visible");
  };
  modalHeader.appendChild(backIcon);

  // Créez le bouton de fermeture et ajoutez-le au conteneur d'en-tête
  var closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.setAttribute("title", "Fermer");
  closeBtn.onclick = function () {
    console.log("Closing modal and removing from DOM");
    modal.remove();
  };
  modalHeader.appendChild(closeBtn);

  // Ajoutez le conteneur d'en-tête au début de la modal-content
  modalContent.appendChild(modalHeader);

  // Continuez avec le corps de la modale comme avant
  var modalBody = createModalDelete(worksData);
  modalContent.appendChild(modalBody);

  // Ajoutez le modal-content au modal
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Logique pour fermer la modale lors d'un clic à l'extérieur
  window.onclick = function (event) {
    if (event.target == modal) {
      console.log("Click outside modal, removing from DOM");
      modal.remove();
    }
  };
}

// Fonction pour créer la div de suppression (Par défaut)
function createModalDelete(worksData) {
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
  //var addButtonContainer = createButtonContainer("Ajouter une photo", "btn-modal", createAddImageForm);
  var addButtonContainer = createButtonContainer("Ajouter une photo", "btn-modal", createAddImageForm_DragDrop);
  modalBody.appendChild(addButtonContainer);

  return modalBody;
}

// Fonction pour créer le conteneur d'images
function createImagesContainer(worksData) {
  var imagesContainer = document.createElement("div");
  imagesContainer.classList.add("images-container");

  if (worksData) {
    worksData.forEach((work) => {
      var imageWrapper = document.createElement("div");
      imageWrapper.classList.add("modal-image-wrapper");

      var img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      img.classList.add("modal-image");

      var deleteIconContainer = document.createElement("div");
      deleteIconContainer.classList.add("delete-icon-container");

      var deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-regular", "fa-trash-can");
      deleteIcon.setAttribute("title", "Supprimer le travail");
      deleteIcon.setAttribute("data-id", work.id);
      deleteIcon.addEventListener("click", function () {
        deleteWork(this.getAttribute("data-id"));
      });

      deleteIconContainer.appendChild(deleteIcon);
      imageWrapper.appendChild(img);
      imageWrapper.appendChild(deleteIconContainer);
      imagesContainer.appendChild(imageWrapper);
    });
  }

  return imagesContainer;
}

// Fonction pour créer le conteneur de boutons avec personnalisation
function createButtonContainer(buttonText, buttonClass, onClickFunction) {
  var buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  var button = document.createElement("button");
  button.textContent = buttonText;
  button.classList.add(buttonClass);
  button.addEventListener("click", onClickFunction); // Utilisation de la fonction de rappel fournie

  buttonContainer.appendChild(button);

  return buttonContainer;
}

// Fonction pour créer le formulaire d'ajout d'image Drag & Drop
async function createAddImageForm_DragDrop() {
  // Masquez le corps actuel de la modale
  const currentModalBody = document.querySelector(".modal-delete");
  currentModalBody.style.display = "none";

  // Rendez l'icône de retour visible
  const backIcon = document.querySelector(".back-icon");
  backIcon.classList.add("visible");

  // Créez le nouveau corps de la modale pour le formulaire d'ajout
  const addImageModalBody = document.createElement("div");
  addImageModalBody.classList.add("modal-addpicture");
  addImageModalBody.style.display = "flex";

  // Ajoutez un titre à la modale d'ajout de photo
  var modalTitle = document.createElement("h2");
  modalTitle.textContent = "Ajout photo";
  modalTitle.classList.add("modal-title");
  addImageModalBody.appendChild(modalTitle);

  // Créez un élément de formulaire
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("enctype", "multipart/form-data");
  form.id = "add-form";

  // Conteneur pour le téléchargement de fichier avec drag & drop
  const fileUploadContainer = document.createElement("div");
  fileUploadContainer.classList.add("file-upload-container");

  const fileUploadLabel = document.createElement("label");
  fileUploadLabel.classList.add("file-upload-label");

  const fileIcon = document.createElement("i");
  fileIcon.classList.add("fa-regular", "fa-image");

  const uploadText = document.createElement("span");
  uploadText.classList.add("upload-text");
  uploadText.textContent = "+ Glissez-Déposez ou Cliquez pour Sélectionner";

  const fileFormat = document.createElement("span");
  fileFormat.classList.add("file-format");
  fileFormat.textContent = "jpg, png · 4mo max";

  // Input de type file pour le bouton de téléchargement
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "file-upload";
  fileInput.name = "file-upload";
  fileInput.accept = ".jpg,.jpeg,.png";
  fileInput.classList.add("file-upload-input");
  fileInput.setAttribute("required", ""); // Ajouter l'attribut required
  fileInput.style.opacity = "0";
  fileInput.addEventListener("change", (event) => {
    handleFileSelect(event, fileInput, imagePreviewContainer, deleteImageButton, fileUploadLabel);
  });

  fileUploadLabel.appendChild(fileIcon);
  fileUploadLabel.appendChild(uploadText);
  fileUploadLabel.appendChild(fileInput);
  fileUploadLabel.appendChild(fileFormat);

  fileUploadContainer.appendChild(fileUploadLabel);

  // Créez un élément où la prévisualisation de l'image sera affichée
  const imagePreviewContainer = document.createElement("div");
  imagePreviewContainer.classList.add("image-preview-container");
  fileUploadContainer.appendChild(imagePreviewContainer);

  form.appendChild(fileUploadContainer);

  // Ajoutez une croix pour supprimer l'image prévisualisée
  const deleteImageButton = document.createElement("button");
  deleteImageButton.innerHTML = "&times;"; // Utilisez une entité HTML pour la croix ou vous pouvez utiliser une icône
  deleteImageButton.classList.add("delete-image-button");
  deleteImageButton.setAttribute("title", "Supprimer l'image");
  deleteImageButton.onclick = function () {
    // Effacez l'image prévisualisée et réinitialisez le formulaire
    imagePreviewContainer.innerHTML = "";
    fileUploadLabel.style.display = "flex";
    fileInput.value = ""; // Important pour pouvoir supprimer une image et en sélectionner une autre
    imagePreviewContainer.style.display = "none";
  };

  // Créez le champ de saisie pour le titre
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "titre"); // Associez le label à l'input via l'attribut 'for'
  titleLabel.textContent = "Titre";
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", "titre"); // Assurez-vous que l'id correspond à l'attribut 'for' du label
  titleInput.setAttribute("name", "titre"); // Nom du champ pour la soumission du formulaire
  titleInput.classList.add("form-control");
  titleInput.setAttribute("required", ""); // Ajouter l'attribut required
  form.appendChild(titleLabel);
  form.appendChild(titleInput);

  // Créez la liste déroulante pour les catégories
  const categoryLabel = document.createElement("label");
  categoryLabel.setAttribute("for", "categorie"); // Associez le label au select via l'attribut 'for'
  categoryLabel.textContent = "Catégorie";
  const categorySelect = document.createElement("select");
  categorySelect.setAttribute("id", "categorie"); // Assurez-vous que l'id correspond à l'attribut 'for' du label
  categorySelect.setAttribute("name", "categorie"); // Nom du champ pour la soumission du formulaire
  categorySelect.classList.add("form-control");
  categorySelect.setAttribute("required", ""); // Ajouter l'attribut required
  form.appendChild(categoryLabel);
  form.appendChild(categorySelect);

  // Créez un conteneur pour le bouton qui va être utilisé pour appliquer le flex
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // Créez le bouton et ajoutez-le au conteneur
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add("btn-modal", "btn-valider");
  submitButton.textContent = "Valider"; // Utilisez textContent au lieu de value
  buttonContainer.appendChild(submitButton);

  // Ajoutez le conteneur de bouton au formulaire
  form.appendChild(buttonContainer);

  // Ajoutez le formulaire au corps de la modale
  addImageModalBody.appendChild(form);

  // Ajoutez le nouveau corps de la modale au contenu de la modale
  const modalContent = document.querySelector(".modal-content");
  modalContent.appendChild(addImageModalBody);

  // Logique pour remplir la liste déroulante des catégories
  try {
    const categories = await fetchCategories();
    const emptyOption = document.createElement("option");
    emptyOption.textContent = "Sélectionnez une Catégorie";
    emptyOption.value = "";
    emptyOption.selected = true; // choix par défaut
    categorySelect.appendChild(emptyOption);

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }

  // Écouteur d'événements pour drag & drop
  fileUploadContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
    fileUploadContainer.classList.add("hover"); // Ajouter la classe pour le retour visuel lors du survol
  });

  fileUploadContainer.addEventListener("dragleave", (event) => {
    fileUploadContainer.classList.remove("hover"); // Enlever la classe pour le retour visuel lorsqu'on quitte la zone de survol
  });

  // Écouteur d'événements pour drag & drop
  fileUploadContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  // Assurez-vous que fileInput est bien défini ici
  console.log("setup fileInput:", fileInput); // Ceci devrait afficher l'élément input

  fileUploadContainer.addEventListener("drop", (event) => {
    event.preventDefault();
    fileUploadContainer.classList.remove("hover");
    // Assurez-vous de passer tous les arguments requis à fileDropped.
    fileDropped(event, fileInput, imagePreviewContainer, deleteImageButton, fileUploadLabel);
  });

  // Ajouter un écouteur d'événements pour la soumission du formulaire
  form.addEventListener("submit", (event) => handleFormSubmit(event, fileInput, titleInput, categorySelect));

  // Ajoutez des écouteurs d'événements sur les champs de saisie
  titleInput.addEventListener("input", () => checkFieldsAndAdjustButton(titleInput, categorySelect, fileInput, submitButton));
  categorySelect.addEventListener("change", () => checkFieldsAndAdjustButton(titleInput, categorySelect, fileInput, submitButton));
  fileInput.addEventListener("change", () => checkFieldsAndAdjustButton(titleInput, categorySelect, fileInput, submitButton));

  // Appel initial pour définir l'état correct du bouton lors du chargement initial
  checkFieldsAndAdjustButton(titleInput, categorySelect, fileInput, submitButton);
}
// Fonction pour vérifier si tous les champs sont valides
function checkFieldsAndAdjustButton(titleInput, categorySelect, fileInput, submitButton) {
  if (titleInput.checkValidity() && categorySelect.checkValidity() && fileInput.files.length > 0) {
    // Si tous les champs sont valides, enlevez la classe 'btn-valider'
    submitButton.classList.remove("btn-valider");
  } else {
    // Si tous les champs ne sont pas valides, ajoutez la classe 'btn-valider'
    if (!submitButton.classList.contains("btn-valider")) {
      submitButton.classList.add("btn-valider");
    }
  }
}
