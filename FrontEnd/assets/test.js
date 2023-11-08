// Fonction pour créer la modale
function createModal() {
  // Créez un nouvel élément DIV pour la modale
  var modal = document.createElement("div");
  modal.setAttribute("id", "myModal");
  modal.classList.add("modal");

  // Créez le contenu de la modale
  var modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Créez la div intermédiaire qui contiendra tout le corps de la modale
  var modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  // Ajoutez un élément span pour pouvoir fermer la modale
  var closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  modalContent.appendChild(closeBtn); // Le bouton de fermeture est ajouté directement au modalContent

  // Ajoutez un titre à la modale
  var modalTitle = document.createElement("h2");
  modalTitle.textContent = "Galerie photo";
  modalTitle.classList.add("modal-title"); // Ajoutez une classe pour le style du titre

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

  // Ajoutez le titre au modalBody
  modalBody.appendChild(modalTitle);

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
