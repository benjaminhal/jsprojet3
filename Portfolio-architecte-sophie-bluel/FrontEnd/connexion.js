let form = document.querySelector("formulaire");
let inputEmail = document.querySelector("#email");
let inputMdp = document.querySelector("#password");
let envoyer = document.querySelector("#cta");

envoyer.addEventListener("click",function(e){
  var id = {
    email : inputEmail.value,
    password : inputMdp.value
  }
  console.log(id)
  e.preventDefault();
  fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(id)
  }) 
  .then(response => response.json())
  .then((data) => {
    const token = data.token;
    localStorage.setItem("token", token);
    console.log(data)
    if (data.message || data.error){
      let erreur = document.querySelector(".error");
      erreur.innerText = "email ou mot de passe incorect";
      console.log(id);
    }
    else{
        console.log("connecté");
        console.log(id);
        console.log(data)
        localStorage.setItem("token", data.token);
        localStorage.setItem('userId', data.userId);
        window.location.href = "index.html";
    }
  })
});