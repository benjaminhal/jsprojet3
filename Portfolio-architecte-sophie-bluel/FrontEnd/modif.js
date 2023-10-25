
/*AJOUT DES IMAGES */
const divElement = document.querySelector(".gallery");
const filtreCategories = document.getElementById("btn-filtre")



const affichage = await fetch("http://localhost:5678/api/works")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        console.log(result);
        for(const image of result){
            const fig =
                document.createElement("figure");
                fig.dataset.name = image.category["id"];
                fig.classList = "active";
                var img = document.createElement("img");
                img.src = image.imageUrl;
                img.alt = image.title;
                fig.appendChild(img);
                var titre = document.createElement("figcaption");
                titre.textContent = image.title;
                fig.appendChild(titre);
                divElement.appendChild(fig);

        }

    });

/*AJOUT DES FILTRES*/

 const filtre = await fetch("http://localhost:5678/api/categories")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        console.log(result);
        for(const boutons of result){
            const btn = document.createElement("button");
                btn.id = boutons.id;
                btn.type = "button";
                btn.innerHTML = boutons.name;
                btn.classList = boutons.name
                filtreCategories.appendChild(btn);

        }

    });


let btnFiltre =  document.querySelectorAll("#btn-filtre button");
console.log(btnFiltre)


for (let filter of btnFiltre){
    filter.addEventListener("click", async function(){
        let choix = this.id

        let figures = document.querySelectorAll(".gallery figure");
        
        
        
        for(let figure of figures){
            figure.classList.replace("active","inactive");
            
            if(choix === figure.dataset.name || choix === "Tous" ){
                figure.classList.replace("inactive", "active");
                
            }
            

        }; 
    });
};

/*AJOUT DES MODALES*/

const modalContainer = document.querySelector(".modal-container");
const modalContainer2 = document.querySelector(".modal-container2");

const modalTriggers = document.querySelectorAll(".modal-trigger");
const modale = document.querySelector(".image-modal")


modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle("active")
}

const affichageModal = fetch("http://localhost:5678/api/works")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        console.log(result);
        for(const image of result){
          const figure = 
          document.createElement("figure")
          const fig = document.createElement("i");
          fig.classList = "fa-solid fa-trash-can";
          fig.id = image.id
          /*POUR SUPPRIMER UNE IMAGE DE LA MODALE ET DE L'API*/
          fig.addEventListener("click",function(){
            console.log("click"+ this.id)
            deleteElementById(this.id);

          })
          const img = document.createElement("img")
          img.src = image.imageUrl;
          img.alt = image.title;
          figure.appendChild(img)
          figure.appendChild(fig)
          modale.appendChild(figure);
        }
});

const formModale2 = document.getElementById("select-categorie")

const affichageModal2 = fetch("http://localhost:5678/api/categories")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        console.log(result);
        for(const catego of result){
          const option = document.createElement("option")
          option.innerHTML = catego.name;
          option.id = catego.id;
          formModale2.appendChild(option);
        }
});


const modifier = document.querySelector(".ajoutPhoto")

modifier.addEventListener("click",function(){
  modalContainer.classList.remove("active")
  modalContainer2.classList.toggle("active")
});

const fermer = document.querySelector(".close-modal2")

fermer.addEventListener("click",function(){
  modalContainer2.classList.remove("active")
  modalContainer.classList.remove("active")

});

function closeModal(){
  fermer.addEventListener("click",function(){
    modalContainer2.classList.remove("active")
    modalContainer.classList.remove("active")

  })
};

const retour = document.querySelector(".retour");

retour.addEventListener("click",function(){
  modalContainer2.classList.remove("active")
  modalContainer.classList.toggle("active")

});

/*FONCTION ADMIN*/

function adminMode(){
    const login = document.getElementById("login");
    login.style.display = "none";
    const logout = document.getElementById("logout")
    logout.style.display = "flex"
    const bar = document.querySelector(".bar");
    bar.style.display = "flex";
    const BtnModifier = document.querySelector(".modal-btn");
    BtnModifier.style.display = "flex";
    const filterss = document.getElementById("btn-filtre");
    filterss.style.display = "none";
    const btnTous = document.getElementById("Tous");
    btnTous.style.display = "none";
};
const token = localStorage.getItem("token");
console.log(token)
if (token != null) {
    adminMode();
  } 

  //DECONEXion
  const loginButton = document.getElementById("login");
  const logoutButton = document.getElementById("logout") 

  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    removeToken();
    window.location.assign("index.html");
  });

  function removeToken() {
    // Supprime le token du localStorage
    localStorage.removeItem("token");
  };
/*AJOUT D'UN PROJET*/

const formulaireAjout = document.querySelector(".cta2");
    formulaireAjout.addEventListener("click", function (e) {
        e.preventDefault();
        ajoutProjet();
    });

const image = document.querySelector(".input-ajout").files[0];
const title = document.getElementById("titre").value;
const category = document.getElementById("select-categorie").value;


/*if (!image || title == "" || category == ""){
  formulaireAjout.classList.replace("cta2","buttonFonctionnel");
}else{
  formulaireAjout.classList.replace("buttonFonctionnel","cta2");
}*/
const boutonAjout = document.querySelector(".btn-ajout")

console.log(category)


async function ajoutProjet() {
    const image = document.querySelector(".input-ajout").files[0];
    const title = document.getElementById("titre").value;
    const category = document.getElementById("select-categorie").selectedIndex;
    const categoryId = document.getElementById("select-categorie").options[category].id;

    if (!image || title == "" || category == "") {
        alert("Veuillez rentrer tous les champs.");
    } else {
        var reader = new FileReader();
        const Data = new FormData();
        Data.append("title", title);
        Data.append("categorie", categoryId);
        Data.append("image", reader.readAsDataURL(image));
        
        /*reader.onloadend = function() {
          console.log('Encoded Base 64 File String:', reader.result);
          var data=(reader.result).split(',')[1];
          var binaryBlob = atob(data);
          console.log('Encoded Binary File String:', binaryBlob);
        }
        reader.readAsDataURL(image);*/
        console.log(title);
        console.log(categoryId);
        console.log(Data);
        fetch("http://localhost:5678/api/works/", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: Data,
        })
            .then(response => {
                if (localStorage.getItem("token")) {
                    alert("Projet ajouté");
                    console.log(response)
                    return response.json();
                    
                } else{
                  alert("projet non ajouté")
                  return response.json();
                }
            })
            .then(projet => {
                console.log(projet);
                if (projet) {
                    console.log(projet);
                    divElement.push(projet);
                    const galleryModaleImg = document.querySelector(".image-modal");
                    const figureModale = creerImgModale(projet);
                    galleryModaleImg.appendChild(figureModale);

                    const figureIndex = creerImgGallery(projet);
                    divElement.appendChild(figureIndex);
                }
            })
            .catch(error => {
                console.log('Error:', error);
                alert("Une erreur est survenue lors de l'ajout du projet !")
            });
    }
};



  const file1 = document.getElementById(".input-ajout").files[0];
  const viewImage = document.getElementById(".image-modal");
  const tailleMax = 4 * 1024 * 1024;

  if (file1.size > tailleMax) {
    drop.textContent = "Votre image est trop volumineuse";
    console.log("fichier > 4MO!");
    return;
  };

  
/*const image = inputFile.files[0];*/



async function creerImgModale(projet) {
    const figure = document.createElement("figure")
    const fig = document.createElement("i");
    fig.classList = "fa-solid fa-trash-can"
    const img = document.createElement("img")
    img.src = projet.imageUrl;
    img.alt = projet.title;
    figure.appendChild(img)
    figure.appendChild(fig)
    modale.appendChild(figure);
    return figure;
};

async function creerImgGallery(projet){
    const fig = document.createElement("figure");
    fig.dataset.name = projet.category["id"];
    fig.classList = "active";
    var img = document.createElement("img");
    img.src = projet.imageUrl;
    img.alt = projet.title;
    fig.appendChild(img);
    var titre = document.createElement("figcaption");
    titre.textContent = projet.title;
    fig.appendChild(titre);
    divElement.appendChild(fig);

}

const btnAjout = document.getElementById("photo")
const drop = document.querySelector(".image-ajout")

btnAjout.onclick = () =>{
    inputAjout.click()
}
const inputAjout = document.querySelector(".input-ajout")

inputAjout.addEventListener("change",function(){
    let file = this.files[0];
    
    typeFichier(file);
})

function typeFichier(file){
    console.log(file);
    let fichier = file.type;
    console.log(fichier);

        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            

            let imag = `<img src=${reader.result} alt="image"/>`
            drop.innerHTML = imag;
        }
};

const titreAjout = document.querySelector("titre")
const categorieSelect = document.querySelector("select-categorie")

const envoie = ""

/*if (drop.files.length > 0 && titreAjout.value !== "" && categorieSelect.value !== "") {
  formulaireAjout.classList.replace("cta2","buttonFonctionnel");
  envoie = "ok"
} else {
  formulaireAjout.classList = "cta2";
}*/

    if (drop === null || image === undefined) {
      drop.textContent = "Veuillez selectionnez une image";
      
    } else if (title.length < 1) {
      titreAjout.textContent = "Ajoutez un titre";
    } else if (categorieSelect === "") {
      categorieSelect.textContent = "Choisissez une catégorie";
      titreAjout.textContent = "";
    } else {
      boutonAjout.style.display = "none";

      formulaireAjout.style.background = " #1d6154";
      titreAjout.textContent = "";
      categorieSelect.textContent = "";
      
    };
    
/*
formulaireAjout.addEventListener("click", async (e) => {
    e.preventDefault();
    if(envoie !== "ok"){
        const image = inputFile.files[0];
        console.log(image)

      //Récupérer Titre
       const title = document.querySelector("#titre").value;
       let categorySelect = document.querySelector("#select-categorie");
       let selectedOption = categorySelect.selectedOptions[0];
       let category = selectedOption.getAttribute("data-id");
       console.log(category)
       category = parseInt(category);
       const Data = new FormData();
       Data.append("image", image);
       Data.append("titre", title);
       Data.append("category", category);
       alert(Data);
       fetch("http://localhost:5678/api/" + "works", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: Data,
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("requête POST fonctionne pas ");
        }
        return response.json();
      })
      .then((data) => {
        console.log("requête POST fonctionne:", data);
        creerImgGallery()
        creerImgModale()
        inputFile.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("requête POST ne fonctionne pas ");
      });
  } else {
    console.log("Formulaire invalide !!!");
  }
});*/


/*SUPPRIMER DES PROJETS*/
const supprimer = document.querySelectorAll(".fa-trash-can");
const imageSuppr = document.querySelectorAll(".image-modal figure");
const figGallery = document.querySelectorAll(".gallery figure")
const imageS = document.querySelectorAll(".image-modal img");

    async function deleteElementById(id) {
            const token = localStorage.getItem("token");
            const response = fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            if (response) {
                const elementSupprime = document.getElementById(figGallery + id);
                const elementSupprimeModal = document.getElementById( imageSuppr + id);
                if (elementSupprime && elementSupprimeModal) {
                elementSupprime.parentNode.removeChild(elementSupprime);
                elementSupprimeModal.parentNode.removeChild(elementSupprimeModal);
                }
            }
      };
     
       