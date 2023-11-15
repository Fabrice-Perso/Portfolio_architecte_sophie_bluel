import { isProduction } from "./config.js";
import { refreshWorks } from "./main.js";

/**
 * Supprime un " Work "  donnée par son identifiant.
 * La suppression s'effectue via une requête API DELETE, en utilisant un token d'authentification stocké localement.
 * @param {string} workId - L'identifiant de " Work " à supprimer.
 */
export async function deleteWork(workId) {
  if (!isProduction) console.log("Fonction deleteWork");

  const apiUrl = "http://localhost:5678/api/works/";
  // Obtenez le token d'authentification du localStorage pour l'authentification de la requête
  const token = localStorage.getItem("token");

  if (!isProduction) console.log("Token utilisé pour l'authentification:", token);

  if (!token) {
    console.error("Aucun token d'authentification trouvé");
    return; // Sortez de la fonction si aucun token n'est trouvé
  }

  try {
    // Exécutez la requête DELETE à l'API
    const response = await fetch(`${apiUrl}${workId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ajoutez le token au header pour l'authentification
      },
    });

    // Si la réponse n'est pas ok, traitez l'erreur
    if (!response.ok) {
      const errorData = await response.json(); // Récupérez le corps de la réponse d'erreur
      console.error("Détails de l'erreur de suppression:", errorData);
      throw new Error(`Erreur lors de la suppression : ${response.status} ${JSON.stringify(errorData)}`);
    }

    if (!isProduction) console.log("Suppression réussie");

    // Affichez un modal de confirmation et rafraîchissez le contenu
    showConfirmationModal("Suppression effectuée avec succès.", "delete");
    await refreshModalContent();
    await refreshWorks();
  } catch (error) {
    // Log l'erreur et gérez l'erreur dans l'interface utilisateur, par exemple en affichant un message d'erreur
    console.error("Erreur lors de la suppression:", error);
  }
}

/**
 * Affiche un modal de confirmation avec un message personnalisé et gère les actions de confirmation.
 * @param {string} message - Le message à afficher dans le modal de confirmation.
 * @param {string} actionType - Le type d'action réalisée, affectant le comportement du bouton de confirmation.
 */
function showConfirmationModal(message, actionType) {
  if (!isProduction) console.log("Fonction showConfirmationModal");

  // Créez un fond pour le modal qui couvre toute la fenêtre
  const confirmationBackdrop = document.createElement("div");
  confirmationBackdrop.classList.add("confirmation-backdrop");

  // Créez le modal de confirmation et ajoutez-lui des classes pour le style
  const confirmationModal = document.createElement("div");
  confirmationModal.classList.add("confirmation-modal");

  // Créez un bouton de fermeture pour le modal
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.setAttribute("title", "Fermer");
  closeBtn.onclick = function () {
    if (!isProduction) console.log("Closing modal and removing from DOM");
    confirmationBackdrop.remove(); // Retire le modal du DOM
  };

  // Créez un paragraphe pour le message de confirmation
  const confirmationMessage = document.createElement("p");
  confirmationMessage.classList.add("confirmation-message");
  confirmationMessage.textContent = message;

  // Créez un bouton de confirmation pour fermer le modal
  const confirmBtn = document.createElement("button");
  confirmBtn.classList.add("confirmation-modal-button");
  confirmBtn.textContent = "OK";
  confirmBtn.addEventListener("click", () => {
    confirmationBackdrop.remove(); // Retire le modal du DOM
    // Si le type d'action est "add", réalisez une action supplémentaire (ici, goBack)
    if (actionType === "add") {
      goBack(); // Fonction hypothétique pour revenir à une étape précédente
    }
  });

  // Ajoutez les éléments au modal, puis le modal au backdrop, et enfin ajoutez le tout au corps du document
  confirmationModal.appendChild(closeBtn);
  confirmationModal.appendChild(confirmationMessage);
  confirmationModal.appendChild(confirmBtn);
  confirmationBackdrop.appendChild(confirmationModal);

  document.body.appendChild(confirmationBackdrop); // Ajoutez le backdrop au corps du document pour afficher le modal
}

/**
 * Simule un clic sur l'icône de retour dans l'interface utilisateur et rafraîchit le contenu du modal.
 * Cette fonction est utile pour réagir à des actions utilisateur qui nécessitent un retour à un état antérieur dans l'interface.
 */
function goBack() {
  if (!isProduction) console.log("Fonction goBack");

  // Trouver l'icône de retour dans le DOM
  const backIcon = document.querySelector(".back-icon");

  // Si l'icône de retour est présente, déclenchez un clic programmé sur celle-ci
  if (backIcon) {
    backIcon.click();
  }

  // Rafraîchissez le contenu du modal, possiblement pour refléter les changements suite à l'action qui a déclenché le "goBack"
  refreshModalContent();
}

/**
 * Rafraîchit le contenu du modal en récupérant les dernières " Work "  depuis l'API
 * et en mettant à jour le conteneur des images en conséquence.
 */
async function refreshModalContent() {
  if (!isProduction) console.log("Fonction refreshModalContent");
  try {
    // Effectuez une requête GET pour récupérer les données des " Work "
    const response = await fetch("http://localhost:5678/api/works/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const worksData = await response.json();

    // Sélectionnez le conteneur existant des images dans le modal
    const imagesContainer = document.querySelector(".images-container");
    if (!imagesContainer) {
      console.error("Le conteneur des images n'a pas été trouvé dans le DOM.");
      return;
    }

    // Videz le conteneur des images pour retirer les éléments existants
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }

    // Ajoutez les éléments mis à jour à partir des données des " Work "  récupérées
    worksData.forEach((work) => {
      const imageWrapper = createImageWrapper(work); // Supposez l'existence d'une fonction 'createImageWrapper'
      imagesContainer.appendChild(imageWrapper);
    });
  } catch (error) {
    // Log l'erreur si la récupération des données ou la mise à jour du DOM échoue
    console.error("Erreur lors de la récupération des données:", error);
  }
}

/**
 * Crée un élément DOM qui représente un wrapper pour une image, incluant une icône de suppression.
 * Chaque wrapper contient l'image de " Work "  ainsi qu'une icône qui, lorsqu'elle est cliquée,
 * déclenchera la suppression de " Work "  correspondante.
 * @param {Object} work - Un objet représentant une " Work " , contenant l'URL de l'image et le titre.
 * @returns {HTMLElement} Le wrapper d'image créé avec l'élément image et l'icône de suppression.
 */
function createImageWrapper(work) {
  if (!isProduction) console.log("Fonction createImageWrapper");

  // Crée un conteneur div pour l'image et l'icône de suppression
  var imageWrapper = document.createElement("div");
  imageWrapper.classList.add("modal-image-wrapper");

  // Crée l'élément image et définit ses attributs source et alt
  var img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  img.classList.add("modal-image");

  // Crée un conteneur pour l'icône de suppression
  var deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");

  // Crée l'icône de suppression et configure son comportement de clic
  var deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-regular", "fa-trash-can");
  deleteIcon.setAttribute("title", "Supprimer le travail");
  deleteIcon.setAttribute("data-id", work.id);
  deleteIcon.addEventListener("click", function () {
    // Appelle la fonction deleteWork avec l'ID de " Work "  lors du clic
    deleteWork(this.getAttribute("data-id"));
  });

  // Ajoute l'icône au conteneur, puis le conteneur et l'image au wrapper
  deleteIconContainer.appendChild(deleteIcon);
  imageWrapper.appendChild(img);
  imageWrapper.appendChild(deleteIconContainer);

  // Retourne le wrapper d'image complet prêt à être ajouté au DOM
  return imageWrapper;
}

/**
 * Gère la soumission du formulaire d'ajout ou de modification d'une " Work " .
 * Prépare les données du formulaire et les envoie au serveur via une requête POST.
 * @param {Event} event - L'événement de soumission du formulaire.
 * @param {HTMLInputElement} fileInput - L'input de type fichier pour l'image de " Work " .
 * @param {HTMLInputElement} titleInput - L'input pour le titre de " Work " .
 * @param {HTMLSelectElement} categorySelect - Le select pour la catégorie de " Work " .
 */
export async function handleFormSubmit(event, fileInput, titleInput, categorySelect) {
  if (!isProduction) console.log("Fonction handleFormSubmit");

  event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire.

  // Créez un objet FormData pour être envoyé dans la requête POST.
  const formData = new FormData();
  formData.append("image", fileInput.files[0]); // Ajoutez l'image au formData.
  formData.append("title", titleInput.value); // Ajoutez le titre au formData.
  formData.append("category", categorySelect.value); // Ajoutez la catégorie sélectionnée au formData.
  // Ajoutez l'userId récupéré du localStorage ou d'un autre mécanisme d'authentification au formData.
  formData.append("userId", localStorage.getItem("userId"));

  // Log pour le débogage
  if (!isProduction) {
    console.log("FormData prepared");
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  }

  try {
    // Envoyez les données du formulaire au serveur.
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData, // Envoi du formData.
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ajoutez le token d'authentification dans les headers.
      },
    });

    // Gérez les réponses non réussies en lançant une exception.
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Détails de l'erreur d'ajout:", errorData);
      throw new Error(`Erreur lors de l'ajout : ${response.status} ${JSON.stringify(errorData)}`);
    }

    // Si la réponse est réussie, affichez un modal de confirmation et rafraîchissez la liste des " Work " .
    const responseData = await response.json();
    if (!isProduction) console.log("Success:", responseData);

    showConfirmationModal("Ajout effectuée avec succès.", "add");
    await refreshWorks();
  } catch (error) {
    // Log l'erreur et affichez un message d'erreur approprié à l'utilisateur.
    console.error("Error:", error);
  }
}

/**
 * Gère les fichiers sélectionnés par l'utilisateur ou déposés dans la zone de dépôt.
 * Affiche une prévisualisation de l'image sélectionnée et prépare le fichier pour l'envoi.
 * @param {Event} event - L'événement de sélection de fichier, qui peut venir d'un input ou d'un drag and drop.
 * @param {HTMLInputElement} fileInput - L'input de type fichier où le fichier sélectionné sera placé.
 * @param {HTMLElement} imagePreviewContainer - Le conteneur où la prévisualisation de l'image sera affichée.
 * @param {HTMLElement} deleteImageButton - Le bouton qui permettra de supprimer l'image prévisualisée.
 * @param {HTMLElement} fileUploadLabel - Le label associé à l'input de type fichier, généralement contenant des instructions pour télécharger.
 */
export function handleFileSelect(event, fileInput, imagePreviewContainer, deleteImageButton, fileUploadLabel) {
  if (!isProduction) console.log("Fonction handleFileSelect");

  // Récupère les fichiers depuis l'événement, en gérant les deux cas : sélection directe ou drag and drop.
  const files = event.target.files || event.dataTransfer.files;

  // Vérifie que le fichier est bien une image JPEG ou PNG et qu'un seul fichier est sélectionné et que sa taille ne dépasse pas 4 Mo.
  if (files.length === 1 && ["image/jpeg", "image/png"].includes(files[0].type) && files[0].size <= 4 * 1024 * 1024) {
    // Création d'un nouvel objet DataTransfer pour gérer le fichier sélectionné.
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(files[0]);
    fileInput.files = dataTransfer.files; // Affecte le fichier sélectionné à l'input de fichier.

    // Utilise FileReader pour lire le contenu du fichier pour la prévisualisation.
    const reader = new FileReader();
    reader.onload = function (e) {
      // Vide le conteneur de prévisualisation et le prépare pour la nouvelle image.
      imagePreviewContainer.innerHTML = "";
      imagePreviewContainer.style.display = "flex";

      // Crée une image et l'ajoute au conteneur de prévisualisation.
      const img = document.createElement("img");
      img.src = e.target.result; // Utilise le résultat de FileReader pour définir la source de l'image.
      img.classList.add("image-preview");
      imagePreviewContainer.appendChild(img);

      // Ajoute le bouton de suppression à côté de l'image prévisualisée.
      imagePreviewContainer.appendChild(deleteImageButton);

      // Cache le label de téléchargement de fichier une fois l'image chargée.
      fileUploadLabel.style.display = "none";
    };
    // Commence la lecture du fichier si un fichier est présent.
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
    }
  } else {
    // Ajoutez un message d'erreur pour les fichiers trop volumineux.
    if (files[0].size > 4 * 1024 * 1024) {
      showConfirmationModal("La taille de l'image ne doit pas dépasser 4 Mo.", "alerte");
    } else {
      // Si le fichier n'est pas une image JPEG ou PNG ou si plusieurs fichiers ont été sélectionnés, affiche un message d'erreur.
      showConfirmationModal("Veuillez sélectionner une seule image de type JPEG ou PNG.", "alerte");
    }
  }
}

/**
 * Traite le fichier déposé dans la zone de dépôt et déclenche la prévisualisation de l'image.
 * @param {Event} event - L'événement de dépôt du fichier.
 * @param {HTMLInputElement} fileInput - L'input de type fichier qui sera mis à jour avec le fichier déposé.
 * @param {HTMLElement} imagePreviewContainer - Le conteneur où la prévisualisation de l'image sera affichée.
 * @param {HTMLElement} deleteImageButton - Le bouton qui permettra de supprimer l'image prévisualisée.
 * @param {HTMLElement} fileUploadLabel - Le label associé à l'input de type fichier, utilisé pour afficher les instructions de téléchargement.
 */
export function fileDropped(event, fileInput, imagePreviewContainer, deleteImageButton, fileUploadLabel) {
  if (!isProduction) console.log("Fonction handleFileSelect");

  event.preventDefault();

  if (!isProduction) console.log("File dropped onto the drop zone:", fileInput);

  // Appelle handleFileSelect qui gère la sélection de fichiers pour les inputs de type fichier et pour le drag & drop.
  handleFileSelect(event, fileInput, imagePreviewContainer, deleteImageButton, fileUploadLabel);
}
