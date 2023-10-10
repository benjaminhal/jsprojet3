var id = {
    email : "sophie.bluel@test.tld",
    password : "S0phie"
}


await fetch("http://localhost:5678/api/users/login",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id)
}) .then(response => response.json())
.then(data => console.log(data))


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
          fig.classList = "fa-solid fa-trash-can"
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
    const bar = document.querySelector(".bar");
    bar.style.display = "flex"
    const BtnModifier = document.querySelectorAll(".modal-btn");
    BtnModifier.style.display = "flex"
    const filterss = document.getElementById("btn-filtre");
    filterss.style.display = "none";
};
const token = localStorage.getItem("token");
if (token) {
    affichageFiltres();
  } else{
    adminMode();
  };

/*AJOUT D'UN PROJET*/

const formulaireAjout = document.getElementById("cta");
if (formulaireAjout) {
    formulaireAjout.addEventListener('click', function (e) {
        e.preventDefault();
        ajoutProjet();
    });
}

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
                    alert("Projet ajouté avec succès !");
                    return response.json();
                }
            })
            .then(projet => {
                if (projet) {
                    console.log(projet);
                    //Mettre à jour le tableau globale
                    divElement.push(projet);
                    // Mettre à jout la modale : ajouter le nouveau projet sur la modale 
                    const galleryModaleImg = document.querySelector(".gallery img");
                    const figureModale = createImgModale(projet);
                    galleryModaleImg.appendChild(figureModale);

                    // Mettre à jour la page index avec l'ajout du projet sur la page index 
                    const gallery = document.querySelector(".gallery");
                    const figureIndex = createFigure(projet);
                    gallery.appendChild(figureIndex);

                    returnButton.click();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Une erreur est survenue lors de l'ajout du projet !")
            });
    }
}

function createImgModale(projet) {
    const figure = document.createElement("figure");
    figure.dataset.name = image.category["id"];
    figure.classList = "active";
    var img = document.createElement("img");
    img.src = projet.imageUrl;
    img.alt = projet.title
    const fig = document.createElement("i");
    fig.classList = "fa-solid fa-trash-can"
    figure.appendChild(img)
    figure.appendChild(fig)
    modale.appendChild(figure);
    return figure;}


/*SUPPRIMER DES PROJETS*/
const supprimer = document.createElement("i");
const imageSuppr = document.querySelectorAll(".image-modal figure");
const figGallery = document.querySelectorAll(".gallery figure")
const imageS = document.querySelectorAll(".image-modal img");

    async function deleteElementById(id) {
        supprimer.addEventListener("click", function(){
            const token = localStorage.getItem("token");
            const response = fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const elementSupprime = document.getElementById(figGallery + id);
                const elementSupprimeModal = document.getElementById( imageSuppr + id);
                if (elementSupprime && elementSupprimeModal) {
                elementSupprime.parentNode.removeChild(elementSupprime);
                elementSupprimeModal.parentNode.removeChild(elementSupprimeModal);
                }
            }
        })
    };



