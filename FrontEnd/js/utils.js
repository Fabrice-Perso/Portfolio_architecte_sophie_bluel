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
