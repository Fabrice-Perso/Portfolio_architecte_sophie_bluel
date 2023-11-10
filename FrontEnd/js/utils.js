// Fonction pour créer le conteneur de boutons avec personnalisation
export function createButtonContainer(buttonText, buttonClass, onClickFunction) {
  var buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  var button = document.createElement("button");
  button.textContent = buttonText;
  button.classList.add(buttonClass);
  button.addEventListener("click", onClickFunction); // Utilisation de la fonction de rappel fournie

  buttonContainer.appendChild(button);

  return buttonContainer;
}

// Fonction pour créer le conteneur d'images
export function createImagesContainer(worksData) {
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
    // Suppression réussie, actualisez le contenu de la modale
    await refreshModalContent();
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    // Gérer l'erreur dans l'interface utilisateur, par exemple afficher un message
  }
}

async function refreshModalContent() {
  try {
    const response = await fetch("http://localhost:5678/api/works/");
    const worksData = await response.json();
    const imagesContainer = createImagesContainer(worksData);

    const modalBody = document.querySelector(".images-container"); // Assurez-vous que cette classe correspond à votre élément de modal body
    modalBody.innerHTML = ""; // Effacez le contenu actuel
    modalBody.appendChild(imagesContainer); // Ajoutez le nouveau conteneur d'images
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

// Fonction pour gérer le work
function addWork() {
  // Ici, tu pourrais appeler l'API pour supprimer le travail en utilisant workId
  console.log("Ajouter le travail");
  // Ajoute la logique d'appel API ici...
}
