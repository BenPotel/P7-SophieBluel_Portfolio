async function login() {
  const emailLogin = document.getElementById("email").value;
  const passwordLogin = document.getElementById("password").value;

  const user = {
    email: emailLogin,
    password: passwordLogin,
  };

  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        const userdata = data.token;
        if ((localStorage.user = userdata))
          localStorage.setItem("token", userdata.token);
        document.location.href = "index.html";
      });
    } else {
      document.querySelector(".error").innerHTML =
        "Utilisateur inconnu ou mot de passe érroné";
    }
  });
}

const submitForm = document.querySelector(".connexion");
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});
