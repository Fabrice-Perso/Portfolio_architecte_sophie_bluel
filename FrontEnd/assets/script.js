function fetchWorks() {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Réponse réseau incorrecte : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayWorks(data);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la récupération des données :", error);
    });
}

function displayWorks(works) {
  const gallery = document.querySelector(".gallery");

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

  // Ajoutez un log pour vérifier que les données ont été traitées avec succès
  console.log("Données récupérées et affichées avec succès :", works);
}

// Appelez la fonction fetchWorks pour récupérer les données
fetchWorks();
