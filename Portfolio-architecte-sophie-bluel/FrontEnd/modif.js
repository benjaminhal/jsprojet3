
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

function affichageFiltres(){
 fetch("http://localhost:5678/api/categories")
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

    })
};





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
          fig.addEventListener("click",function(){
            console.log("click"+ this.id)
          })
          const img = document.createElement("img")
          img.src = image.imageUrl;
          img.alt = image.title;
          figure.appendChild(img)
          figure.appendChild(fig)
          modale.appendChild(figure);
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
if (token == null) {
    affichageFiltres();
  } else{
    adminMode();
  };

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

const formulaireAjout = document.getElementById("cta");
    formulaireAjout.addEventListener("click", function (e) {
        e.preventDefault();
        ajoutProjet();
    });


function ajoutProjet() {
    const image = document.getElementById("input-ajout").files[0];
    const title = document.getElementById("titre").value;
    const category = document.getElementById("label-categorie").value;

    if (!image || title.trim() == "" || category.trim() == "") {
        alert("Veuillez rentrer tous les champs.");
    } else {
        const formData = new FormData();
        formData.append("titre", title);
        formData.append("label-categorie", category);
        formData.append("input-ajout", image);

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
        })
            .then(response => {
                if (localStorage.getItem("token")) {
                    alert("Projet ajouté");
                    return response.json();
                }
            })
            .then(projet => {
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
                console.error('Error:', error);
                alert("Une erreur est survenue lors de l'ajout du projet !")
            });
    }
};

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

const btnAjout = document.querySelector(".btn-ajout")
const drop = document.querySelector(".image-ajout")

function visualisationModal(){
    btnAjout.addEventListener("click", () => {
        const visualisationPhoto = new FileReader();
        visualisationPhoto.readAsDataURL(btnAjout.files[0]);

        visualisationPhoto.addEventListener("load", () => {
        const nonConforme = document.querySelector(".nonConforme");
        var fileInput = document.getElementById("photo");
        var file = fileInput.files[0];

        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            nonConforme.innerText = "Utilisez une photo format jpg ou png.";
        } else if (file.size > 4 * 1024 * 1024) {
            nonConforme.innerText =
            "utilisez une photo de moins de 4 mo.";
        } else {
            nonConforme.innerText = "";
            const url = photoPreview.result;
            img = new Image();
            img.classList.add("visualisationImg");
            img.src = url;
            drop.appendChild(img);
            return img;
        }
        });
    });
};

const titreAjout = document.querySelector("titre")
const categorieSelect = document.querySelector("select-categorie")

function ChangementButton() {
    const titreAjout = btnAjout.files;
    const nom = titreAjout.value.trim() !== "";
    const categorieChoisi = categorieSelect.value !== "";

    if (
      titreAjout.length > 0 &&
      nom &&
      categorieChoisi
    ) {
      formulaireAjout.classList = "buttonFonctionnel";
    } else {
      formulaireAjout.id = "";
    }
};

formulaireAjout.addEventListener("click", async (e) => {
    e.preventDefault();
    if (formulaireAjout.id === "buttonFonctionnel") {
      e.preventDefault();
      try {
        await postData();
        img.remove();
        titreAjout.value = "";
        categorieSelect.selectedIndex = 0;
        formulaireAjout.removeAttribute("id");
        divElement.innerHTML = "";
        await createImgGallery();
      } catch (error) {
        console.log("Erreur", error);
      }
    }
});

async function postDatas() {
    return new Promise((resolve) => {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", uploadPhotoButton.files[0]);
      formData.append("title", nameInput.value);
      formData.append("category", categoryId);

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((response) => {
        if (response.status === 201) {
          resolve();
        }
      });
    });
  }
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
    
for(poubelles in supprimer){
    poubelles.addEventListener("click", function () {
       
        deleteElementById(id);
      })
    };



