let form = document.querySelector("formulaire");
let inputEmail = document.querySelector("#email");
let inputMdp = document.querySelector("#password");
let envoyer = document.querySelector("#cta");

envoyer.addEventListener("click",async function(e){
  var id = {
    email : inputEmail.value,
    password : inputMdp.value
  }
  console.log(id)
  e.preventDefault();
  const connexion = await fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(id)
}) .then(response => response.json())
.then(data => console.log(data))
  if (data.message) {
    let erreur = document.querySelector(".error");
    erreur.innerText = "email ou mot de passe incorect";
    console.log(id);
  }
  else{
      console.log("LogAdmin OK");
      console.log(id);
      // stockage du token et userid dans le stockage local
      localStorage.setItem("token", data.token);
      localStorage.setItem('userId', data.userId);
      //Redirection index.html
      window.location.href = "index.html";
  }
  }
);



 //DELETE icone Corbeille
    iconDelete.addEventListener("click", async (e) => {
      e.preventDefault();
      const cardDelete = e.target.parentNode.getAttribute("data-card-id");
      removeElement(cardDelete);
      deletedImages[cardDelete] = true;
      console.log(deletedImages);

      // Convertir l'objet en chaîne de caractères JSON
      const deletedImagesJSON = JSON.stringify(deletedImages);
      // Stocker JSON dans sessionStorage
      sessionStorage.setItem("deletedImages", deletedImagesJSON);
    });

    //FONCTION DELETE SUR LE DOM UNIQUEMENT appellé ds l evenement au click delete:

    function removeElement(cardDelete) {
      const card = document.querySelector(`[data-card-id="${cardDelete}"]`);
      if (card && card.parentNode) {
        card.parentNode.removeChild(card);
        container.remove(card);
      }
    }