// Sélectionnez le lien "Login"
const loginLink = document.getElementById("login-link");

// Fonction pour gérer la connexion/déconnexion
function handleLoginLinkClick() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    // L'utilisateur est connecté, effectuez la déconnexion
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", "false");

    // Mettez à jour le texte du lien
    loginLink.textContent = "Log In";
  } else {
    // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    window.location.href = "login.html";
  }
}

// Ajoutez un gestionnaire d'événements au lien "Login"
loginLink.addEventListener("click", handleLoginLinkClick);

// Appelez la fonction pour mettre à jour le texte du lien
updateNavigation();

// Fonction pour mettre à jour la barre de navigation en fonction de l'état de connexion
function updateNavigation() {
  const loginLink = document.getElementById("login-link");
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Vérifiez si l'utilisateur est connecté

  if (isLoggedIn === "true") {
    // L'utilisateur est connecté, affiche "Log Out" et ajoute un gestionnaire d'événements
    loginLink.textContent = "Log Out";
    loginLink.addEventListener("click", () => {
      // Supprimez le jeton du localStorage
      localStorage.removeItem("token");
      localStorage.setItem("isLoggedIn", "false"); // Marquez l'utilisateur comme déconnecté

      // Mettez à jour le texte du lien
      loginLink.textContent = "Log In";

      // Vous n'avez pas besoin de rediriger l'utilisateur
    });
  } else {
    // L'utilisateur n'est pas connecté, affiche "Log In"
    loginLink.textContent = "Log In";
  }
}

// Vérifiez si l'utilisateur est connecté
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
  // Si l'utilisateur est connecté, modifiez le texte du lien en "Log Out"
  document.getElementById("login-link").textContent = "Log Out";
}
