// // Fonction pour créer le formulaire d'ajout d'image
// async function createAddImageForm() {
//   // Masquez le corps actuel de la modale
//   const currentModalBody = document.querySelector(".modal-delete");
//   currentModalBody.style.display = "none";

//   // Rendez l'icône de retour visible
//   const backIcon = document.querySelector(".back-icon");
//   backIcon.classList.add("visible");

//   // Créez le nouveau corps de la modale pour le formulaire d'ajout
//   const addImageModalBody = document.createElement("div");
//   addImageModalBody.classList.add("modal-addpicture");
//   addImageModalBody.style.display = "flex"; // Utilisez flex pour les éléments internes

//   // Ajoutez un titre à la modale d'ajout de photo
//   var modalTitle = document.createElement("h2");
//   modalTitle.textContent = "Ajout photo";
//   modalTitle.classList.add("modal-title");
//   addImageModalBody.appendChild(modalTitle);

//   // Créez un élément de formulaire
//   const form = document.createElement("form");
//   form.setAttribute("method", "post");
//   form.setAttribute("enctype", "multipart/form-data");

//   // Conteneur pour le téléchargement de fichier
//   const fileUploadContainer = document.createElement("div");
//   fileUploadContainer.classList.add("file-upload-container");
//   fileUploadContainer.setAttribute("title", "Glissez-Déposez ici votre image");

//   const fileUploadLabel = document.createElement("label");
//   fileUploadLabel.classList.add("file-upload-label");

//   const fileIcon = document.createElement("i");
//   fileIcon.classList.add("fa-regular", "fa-image");

//   const uploadText = document.createElement("span");
//   uploadText.classList.add("upload-text");
//   uploadText.textContent = "+ Ajouter photo";

//   const fileFormat = document.createElement("span");
//   fileFormat.classList.add("file-format");
//   fileFormat.textContent = "jpg, png · 4mo max";

//   // Input de type file pour le bouton de téléchargement
//   const fileInput = document.createElement("input");
//   fileInput.type = "file";
//   fileInput.id = "file-upload";
//   fileInput.accept = ".jpg,.jpeg,.png";
//   fileInput.classList.add("file-upload-input");
//   fileInput.style.opacity = "0";

//   fileUploadLabel.appendChild(fileIcon);
//   fileUploadLabel.appendChild(uploadText);
//   fileUploadLabel.appendChild(fileInput);
//   fileUploadLabel.appendChild(fileFormat);

//   fileUploadContainer.appendChild(fileUploadLabel);

//   // Créez un élément où la prévisualisation de l'image sera affichée
//   const imagePreviewContainer = document.createElement("div");
//   imagePreviewContainer.classList.add("image-preview-container");
//   fileUploadContainer.appendChild(imagePreviewContainer);

//   form.appendChild(fileUploadContainer); // Ajoutez le conteneur de téléchargement de fichier au formulaire

//   // Ajoutez une croix pour supprimer l'image prévisualisée
//   const deleteImageButton = document.createElement("button");
//   deleteImageButton.innerHTML = "&times;"; // Utilisez une entité HTML pour la croix ou vous pouvez utiliser une icône
//   deleteImageButton.classList.add("delete-image-button");
//   deleteImageButton.setAttribute("title", "Supprimer l'image");
//   deleteImageButton.onclick = function () {
//     // Effacez l'image prévisualisée et réinitialisez le formulaire
//     imagePreviewContainer.innerHTML = "";
//     fileUploadLabel.style.display = "flex";
//     fileInput.value = ""; // Important pour pouvoir supprimer une image et en sélectionner une autre
//     imagePreviewContainer.style.display = "none";
//   };

//   // Créez le champ de saisie pour le titre
//   const titleLabel = document.createElement("label");
//   titleLabel.setAttribute("for", "titre"); // Associez le label à l'input via l'attribut 'for'
//   titleLabel.textContent = "Titre";
//   const titleInput = document.createElement("input");
//   titleInput.setAttribute("type", "text");
//   titleInput.setAttribute("id", "titre"); // Assurez-vous que l'id correspond à l'attribut 'for' du label
//   titleInput.setAttribute("name", "titre"); // Nom du champ pour la soumission du formulaire
//   titleInput.classList.add("form-control");
//   form.appendChild(titleLabel);
//   form.appendChild(titleInput);

//   // Créez la liste déroulante pour les catégories
//   const categoryLabel = document.createElement("label");
//   categoryLabel.setAttribute("for", "categorie"); // Associez le label au select via l'attribut 'for'
//   categoryLabel.textContent = "Catégorie";
//   const categorySelect = document.createElement("select");
//   categorySelect.setAttribute("id", "categorie"); // Assurez-vous que l'id correspond à l'attribut 'for' du label
//   categorySelect.setAttribute("name", "categorie"); // Nom du champ pour la soumission du formulaire
//   categorySelect.classList.add("form-control");
//   form.appendChild(categoryLabel);
//   form.appendChild(categorySelect);

//   // Créez un conteneur pour le bouton qui va être utilisé pour appliquer le flex
//   const buttonContainer = document.createElement("div");
//   buttonContainer.classList.add("button-container");

//   // Créez le bouton et ajoutez-le au conteneur
//   const submitButton = document.createElement("button");
//   submitButton.type = "submit";
//   submitButton.classList.add("btn-modal", "btn-valider");
//   submitButton.textContent = "Valider"; // Utilisez textContent au lieu de value
//   buttonContainer.appendChild(submitButton);

//   // Ajoutez le conteneur de bouton au formulaire
//   form.appendChild(buttonContainer);

//   // Ajoutez le formulaire au corps de la modale
//   addImageModalBody.appendChild(form);

//   // Ajoutez le nouveau corps de la modale au contenu de la modale
//   const modalContent = document.querySelector(".modal-content");
//   modalContent.appendChild(addImageModalBody);

//   // Logique pour afficher la prévisualisation de l'image sélectionnée
//   fileInput.addEventListener("change", function (event) {
//     // Assurez-vous qu'un fichier a été sélectionné
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];

//       // Vérifiez si le fichier est de type JPEG ou PNG
//       if (["image/jpeg", "image/png"].includes(file.type)) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//           // Affichage du bloc prévisualisation
//           imagePreviewContainer.innerHTML = "";
//           imagePreviewContainer.style.display = "flex";

//           // Créez et ajoutez l'image à la prévisualisation
//           const img = document.createElement("img");
//           img.src = e.target.result;
//           img.classList.add("image-preview");
//           imagePreviewContainer.appendChild(img);

//           // Changez les styles pour l'affichage
//           fileUploadLabel.style.display = "none"; // Cachez le label de téléchargement de fichier
//         };

//         // Lisez le fichier sélectionné
//         reader.readAsDataURL(file);
//       } else {
//         // Affichez un message si le fichier n'est pas une image JPEG ou PNG
//         console.log("Le fichier sélectionné n'est pas une image JPEG ou PNG.");
//       }
//     } else {
//       // Débogage : Aucun fichier sélectionné
//       console.log("Aucun fichier sélectionné pour la prévisualisation");
//     }
//   });

//   // Remplissez la liste déroulante des catégories
//   try {
//     const categories = await fetchCategories();

//     // Créez et ajoutez une option vide au début de la liste déroulante
//     const emptyOption = document.createElement("option");
//     emptyOption.textContent = ""; // Texte vide pour l'option vide
//     emptyOption.value = ""; // Valeur vide pour l'option vide
//     categorySelect.appendChild(emptyOption);

//     // Ensuite, ajoutez les autres options à partir des catégories récupérées
//     categories.forEach((category) => {
//       const option = document.createElement("option");
//       option.value = category.id;
//       option.textContent = category.name;
//       categorySelect.appendChild(option);
//     });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des catégories :", error);
//   }
//   // Gérez la soumission du formulaire
//   form.addEventListener("submit", async function (event) {
//     event.preventDefault();

//     // Ici, ajoutez votre logique de soumission du formulaire
//     // Utilisez FormData et fetch() pour envoyer les données
//     const formData = new FormData(form);
//     // ... (Logique de fetch pour envoyer formData)
//   });
// }
