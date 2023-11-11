import { refreshWorks } from "./main.js";

export async function deleteWork(workId) {
  const apiUrl = "http://localhost:5678/api/works/";
  const token = localStorage.getItem("token"); // Obtenez le token du localStorage

  console.log("Token utilisé pour l'authentification:", token); // Pour débogage

  if (!token) {
    console.error("Aucun token d'authentification trouvé");
    return; // Sortez de la fonction si aucun token n'est trouvé
  }

  try {
    const response = await fetch(`${apiUrl}${workId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Utilisez le token pour l'en-tête d'autorisation
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Récupère le corps de l'erreur
      console.error("Détails de l'erreur de suppression:", errorData);
      throw new Error(`Erreur lors de la suppression : ${response.status} ${JSON.stringify(errorData)}`);
    }

    console.log("Suppression réussie");
    // Dans votre fonction deleteWork, après la suppression réussie :
    showConfirmationModal("Suppression effectuée avec succès.", "delete");
    // Suppression réussie, actualisez le contenu de la modale
    await refreshModalContent();
    await refreshWorks();
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    // Gérer l'erreur dans l'interface utilisateur, par exemple afficher un message
  }
}

function showConfirmationModal(message, actionType) {
  const confirmationBackdrop = document.createElement("div");
  confirmationBackdrop.classList.add("confirmation-backdrop");

  const confirmationModal = document.createElement("div");
  confirmationModal.classList.add("confirmation-modal");

  var closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.setAttribute("title", "Fermer");
  closeBtn.onclick = function () {
    console.log("Closing modal and removing from DOM");
    confirmationBackdrop.remove();
  };

  const confirmationMessage = document.createElement("p");
  confirmationMessage.classList.add("confirmation-message");
  confirmationMessage.textContent = message;

  const confirmBtn = document.createElement("button");
  confirmBtn.classList.add("confirmation-modal-button");
  confirmBtn.textContent = "OK";
  confirmBtn.addEventListener("click", () => {
    confirmationBackdrop.remove();
    if (actionType === "add") {
      goBack(); // Seulement pour l'ajout, nous voulons faire un "goBack"
    }
  });

  confirmationModal.appendChild(closeBtn);
  confirmationModal.appendChild(confirmationMessage);
  confirmationModal.appendChild(confirmBtn);
  confirmationBackdrop.appendChild(confirmationModal);

  document.body.appendChild(confirmationBackdrop);
}

function goBack() {
  const backIcon = document.querySelector(".back-icon");
  if (backIcon) {
    backIcon.click();
  }
  refreshModalContent();
}
async function refreshModalContent() {
  try {
    const response = await fetch("http://localhost:5678/api/works/");
    const worksData = await response.json();

    // Sélectionnez le conteneur existant des images
    const imagesContainer = document.querySelector(".images-container");
    // Supprimez uniquement les wrappers d'image existants du conteneur
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }

    // Créez de nouveaux wrappers d'image et ajoutez-les au conteneur
    worksData.forEach((work) => {
      imagesContainer.appendChild(createImageWrapper(work));
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

// Fonction pour créer un seul wrapper d'image
function createImageWrapper(work) {
  // Crée le wrapper d'image
  var imageWrapper = document.createElement("div");
  imageWrapper.classList.add("modal-image-wrapper");

  // Crée l'image et définit ses attributs
  var img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  img.classList.add("modal-image");

  // Crée le conteneur de l'icône de suppression et l'icône elle-même
  var deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");

  var deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-regular", "fa-trash-can");
  deleteIcon.setAttribute("title", "Supprimer le travail");
  deleteIcon.setAttribute("data-id", work.id);
  deleteIcon.addEventListener("click", function () {
    deleteWork(this.getAttribute("data-id"));
  });

  // Assemble les éléments dans le wrapper d'image
  deleteIconContainer.appendChild(deleteIcon);
  imageWrapper.appendChild(img);
  imageWrapper.appendChild(deleteIconContainer);

  return imageWrapper;
}

// Définir la fonction handleFormSubmit
export async function handleFormSubmit(event, fileInput, titleInput, categorySelect) {
  event.preventDefault(); // Empêche la soumission normale du formulaire

  // Log pour le débogage
  console.log("Handling form submission");

  // Créer l'objet FormData à partir du formulaire
  const formData = new FormData();
  formData.append("image", fileInput.files[0]); // Vérifiez que 'fileInput' est votre input de type 'file'
  formData.append("title", titleInput.value); // Assurez-vous que 'titleInput' est votre input pour le titre
  formData.append("category", categorySelect.value); // Assurez-vous que 'categorySelect' est votre élément select pour les catégories
  // Ajouter le userId au formData
  const userId = localStorage.getItem("userId");
  formData.append("userId", userId); // Ici, 'userId' est récupéré depuis le localStorage ou autre mécanisme d'authentification

  // // Log pour le débogage
  // console.log("FormData prepared");
  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  // Envoi du FormData au serveur
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData, // Pas besoin de définir 'Content-Type', il est automatiquement défini
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Utiliser le token d'authentification
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Récupère le corps de l'erreur
      console.error("Détails de l'erreur d'ajout:", errorData);
      throw new Error(`Erreur lors de l'ajout' : ${response.status} ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();
    console.log("Success:", responseData);
    showConfirmationModal("Ajout effectuée avec succès.", "add");
    refreshWorks();
    // Ici, gérer la réponse de succès, par exemple en affichant un message ou en redirigeant l'utilisateur
  } catch (error) {
    console.error("Error:", error);
    // Ici, gérer l'erreur, par exemple en affichant un message d'erreur à l'utilisateur
  }
}
// Fonction pour gérer les fichiers sélectionnés ou déposés
export function handleFileSelect(event, fileInput, imagePreviewContainer, deleteImageButton, fileUploadLabel) {
  const files = event.target.files || event.dataTransfer.files;
  if (files.length === 1 && ["image/jpeg", "image/png"].includes(files[0].type)) {
    // Créez un nouvel objet DataTransfer
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(files[0]);
    fileInput.files = dataTransfer.files;
    const reader = new FileReader();
    reader.onload = function (e) {
      // Affichage du bloc prévisualisation
      imagePreviewContainer.innerHTML = "";
      imagePreviewContainer.style.display = "flex";

      // Créez et ajoutez l'image à la prévisualisation
      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("image-preview");
      imagePreviewContainer.appendChild(img);

      // Ajoutez le bouton de suppression maintenant que l'image est chargée
      imagePreviewContainer.appendChild(deleteImageButton);

      // Changez les styles pour l'affichage
      fileUploadLabel.style.display = "none"; // Cachez le label de téléchargement de fichier
    };
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
    }
  } else {
    alert("Veuillez sélectionner une seule image de type JPEG ou PNG.");
  }
}

// Fonction pour gérer les fichiers déposés par drag & drop
export function fileDropped(event, fileInput, imagePreviewContainer, deleteImageButton, fileUploadLabel) {
  event.preventDefault();
  console.log("fileDropped fileInput:", fileInput); // Ceci devrait afficher l'élément input
  // Assurez-vous que handleFileSelect est défini dans la même portée ou importé correctement.
  handleFileSelect(event, fileInput, imagePreviewContainer, deleteImageButton, fileUploadLabel);
}
