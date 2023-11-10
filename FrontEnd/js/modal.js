import { createButtonContainer, createImagesContainer } from "./utils.js";
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
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = function () {
    console.log("Closing modal and removing from DOM");
    modal.remove();
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
      console.log("Click outside modal, removing from DOM");
      modal.remove();
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
  var addButtonContainer = createButtonContainer("Ajouter une photo", "btn-modal", createAddImageForm);
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

  // Créez un élément de formulaire
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("enctype", "multipart/form-data");

  // Conteneur pour le téléchargement de fichier
  const fileUploadContainer = document.createElement("div");
  fileUploadContainer.classList.add("file-upload-container");

  const fileUploadLabel = document.createElement("label");
  fileUploadLabel.classList.add("file-upload-label");

  const fileIcon = document.createElement("i");
  fileIcon.classList.add("fa-regular", "fa-image");

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

  fileUploadLabel.appendChild(fileIcon);
  fileUploadLabel.appendChild(uploadText);
  fileUploadLabel.appendChild(fileInput);
  fileUploadLabel.appendChild(fileFormat);

  fileUploadContainer.appendChild(fileUploadLabel);

  // Créez un élément où la prévisualisation de l'image sera affichée
  const imagePreviewContainer = document.createElement("div");
  imagePreviewContainer.classList.add("image-preview-container");
  fileUploadContainer.appendChild(imagePreviewContainer);

  form.appendChild(fileUploadContainer); // Ajoutez le conteneur de téléchargement de fichier au formulaire

  // Créez le champ de saisie pour le titre
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "titre"); // Associez le label à l'input via l'attribut 'for'
  titleLabel.textContent = "Titre";
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", "titre"); // Assurez-vous que l'id correspond à l'attribut 'for' du label
  titleInput.setAttribute("name", "titre"); // Nom du champ pour la soumission du formulaire
  titleInput.classList.add("form-control");
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

  // Gérez la soumission du formulaire
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Ici, ajoutez votre logique de soumission du formulaire
    // Utilisez FormData et fetch() pour envoyer les données
    const formData = new FormData(form);
    // ... (Logique de fetch pour envoyer formData)
  });

  // Ajoutez le formulaire au corps de la modale
  addImageModalBody.appendChild(form);

  // Ajoutez le nouveau corps de la modale au contenu de la modale
  const modalContent = document.querySelector(".modal-content");
  modalContent.appendChild(addImageModalBody);

  // Logique pour afficher la prévisualisation de l'image sélectionnée
  fileInput.addEventListener("change", function (event) {
    // Assurez-vous qu'un fichier a été sélectionné
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Débogage : confirme que cette partie du code est exécutée
        console.log("Prévisualisation de l'image en cours");

        // Créez et ajoutez l'image à la prévisualisation
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("image-preview");

        imagePreviewContainer.appendChild(img);

        // Changez les styles pour l'affichage
        fileUploadLabel.style.display = "none"; // Cachez le label de téléchargement de fichier
        imagePreviewContainer.style.display = "flex"; // Affichez le conteneur de prévisualisation avec flex
      };

      // Lisez le fichier sélectionné
      const file = event.target.files[0];
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      // Débogage : Aucun fichier sélectionné
      console.log("Aucun fichier sélectionné pour la prévisualisation");
    }
  });

  // Remplissez la liste déroulante des catégories
  try {
    const categories = await fetchCategories();

    // Créez et ajoutez une option vide au début de la liste déroulante
    const emptyOption = document.createElement("option");
    emptyOption.textContent = ""; // Texte vide pour l'option vide
    emptyOption.value = ""; // Valeur vide pour l'option vide
    categorySelect.appendChild(emptyOption);

    // Ensuite, ajoutez les autres options à partir des catégories récupérées
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
}
