// Vérifiez si un jeton est déjà stocké localement
const token = localStorage.getItem("token");

// Sélectionnez le formulaire
const loginForm = document.querySelector("form");

// Ajoutez un gestionnaire d'événements pour intercepter la soumission du formulaire
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  // Récupérez les valeurs de l'e-mail et du mot de passe depuis le formulaire
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Utilisez ces valeurs pour effectuer une requête POST vers votre API de connexion
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Stockez le token ou les informations de connexion dans un emplacement sécurisé (par exemple, local storage)
      localStorage.setItem("token", data.token);

      // Ajoutez cette ligne pour marquer l'utilisateur comme connecté
      localStorage.setItem("isLoggedIn", "true");

      // Redirigez l'utilisateur vers la page d'accueil (index.html) ou effectuez une action appropriée
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Erreur de connexion :", error);
    });
});
