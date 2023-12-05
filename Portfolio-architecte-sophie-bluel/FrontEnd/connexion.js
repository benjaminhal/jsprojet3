let form = document.querySelector("formulaire");
let inputEmail = document.querySelector("#email");
let inputMdp = document.querySelector("#password");
let envoyer = document.querySelector("#cta");

function connection(){
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
      if (data.message || data.error){
        let erreur = document.querySelector(".error");
        erreur.innerText = "email ou mot de passe incorect";
      }
      else{
          localStorage.setItem("token", data.token);
          localStorage.setItem('userId', data.userId);
          window.location.href = "index.html";
      }
    })
  });
};

connection();


let btnContact = document.getElementById("bouton-contact");

function contact(){
  btnContact.addEventListener("click",function(){
    window.location.href = "index.html#contact"
  });
};

contact();


let btnProjet = document.getElementById("bouton-projet");

function gallery(){
  btnProjet.addEventListener("click",function(){
    window.location.href = "index.html#encre-gallery"
  });
};

gallery();
