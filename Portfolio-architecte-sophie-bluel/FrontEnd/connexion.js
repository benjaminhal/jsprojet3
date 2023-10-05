let form = document.querySelector("formulaire");
let inputEmail = document.querySelector("#email");
let inputMdp = document.querySelector("#password");
let envoyer = document.querySelector("#cta");

var id = {
  email : inputEmail,
  password : inputMdp
}
console.log(id)
envoyer.addEventListener("click",async function(e){
  const connexion = await fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(id)
}) .then(response => response.json())
.then(data => console.log(data))
  if (inputEmail.value != id.email && inputMdp.value != id.password) {
    let erreur = document.querySelector(".error");
    erreur.innerText = "email ou mot de passe incorect";
    e.preventDefault();
    
  }
  else{
    console.log("blabla")
    window.location.replace("http://127.0.0.1:5500/Portfolio-architecte-sophie-bluel/FrontEnd/index.html")
  }
  
 
  }
);