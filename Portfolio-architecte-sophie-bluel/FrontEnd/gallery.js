//Redirection au click sur les boutons du header
let login = document.getElementById("login");

function log(){
  login.addEventListener("click",function(){
    window.location.href = "connexion.html"
  }); 
};
log();


let btnContact = document.getElementById("btn-contact");

function contact(){
  btnContact.addEventListener("click",function(){
    window.location.href = "#contact"
  });
};
contact();


let btnProjet = document.getElementById("btn-projet");

function gallerie(){
  btnProjet.addEventListener("click",function(){
    window.location.href = "#encre-gallery"
  });
};

gallerie();


/*AJOUT DES IMAGES */
const divElement = document.querySelector(".gallery");
const filtreCategories = document.getElementById("btn-filtre")

function afficherImage(){
  fetch("http://localhost:5678/api/works")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        for(const image of result){
            let fig =
                document.createElement("figure");
                fig.setAttribute("data-name",image.category.id);
                fig.id = "gallerie-modale"+image.id;
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
}

afficherImage();

/*FONCTION ADMIN*/

//page et fonctionnalités admin
function adminMode(){
    const login = document.getElementById("login");
    login.style.display = "none";
    const logout = document.getElementById("logout")
    logout.style.display = "flex";
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


//activer le mode admin
if (token != null) {
    adminMode();
  } 

  //DECONEXion
  const loginButton = document.getElementById("login");
  const logoutButton = document.getElementById("logout") 

function logout(){
  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    removeToken();
    window.location.assign("index.html");
  });
};

  logout();
  
  
  // Supprime le token du localStorage
  function removeToken() {
    localStorage.removeItem("token");
  };

/*SUPPRIMER DES PROJETS*/
const supprimer = document.querySelectorAll(".fa-trash-can");
const imageSuppr = document.querySelectorAll(".image-modal figure");
const figGallery = document.querySelectorAll(".gallery figure")
const imageS = document.querySelectorAll(".image-modal img");

    function deleteElementById(id) {
            const token = localStorage.getItem("token");
            fetch(`http://localhost:5678/api/works/${id.replace('modale', '')}`, {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

                const elementSupprime = document.getElementById("gallerie-" + id);
                const elementSupprimeModal = document.getElementById(id);
                elementSupprime.parentNode.removeChild(elementSupprime);
                elementSupprimeModal.parentNode.removeChild(elementSupprimeModal);
              
      };


      
/*AJOUT DES IMAGES*/

//creation de la balise figure et les balises qu'elle contient
const creerBaliser = (data) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const{ id:id, imageUrl:imageUrl, title:titre} = data[i];
    const figureElements = document.createElement('figure');
    figureElements.setAttribute("data-name", id);
    figureElements.id = "gallerie-modale"+id;
    figureElements.classList = "active";
    figureElements.innerHTML = `<img src="${imageUrl}" alt="${titre}"><figcaption>${titre}</figcaption>`;
    gallery.appendChild(figureElements);
            
  }
};

const fetchData = async (url, callback) => {
  try {
      const res = await fetch(url);
      const data = await res.json();
      callback(data);
  } catch (Error) {
      console.error(error);
  }
};
  
//récupére l'id de la catégorie choisi
const formModal2 = document.getElementById("select-categorie")

let selectCategorieIdDuSelect = "";
formModal2.addEventListener("change", function () {
    const selectedCategoryId = formModal2.options[formModal2.selectedIndex].id;
    selectCategorieIdDuSelect = selectedCategoryId;
});

function messageErreur(message) {
  const erreur = document.querySelector("error");
  alert(message);
  clearTimeout(stockage);
};

//afficher et envoyer l'image et son titre
const envoyerImage = async (event) => {
  event.preventDefault();
  let Data = new FormData();
  if (inputImage.files[0].type === "image/jpeg") {
      Data.append("image", inputImage.files[0], 'image.jpeg');

  } else if (inputImage.files[0].type === "image/png") {
      Data.append("image", inputImage.files[0], 'image.png');
  }
  Data.append("title", titre.value);
  Data.append("category", selectCategorieIdDuSelect);
  const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: Data
  });
  if (response.ok) {
      resetApresEnvoie();
      fetchData("http://localhost:5678/api/works/", creerBaliser);
      fetchData("http://localhost:5678/api/works/", creerImgModale);
      modalContainer2.classList.remove("active");
      modalContainer.classList.remove("active");
  } else if (response.status === 400 && titre.value.trim() == "") {
    messageErreur("Veuillez remplir le formulaire");

  } else if (response.status === 400 && formAjout.value == "") {
    messageErreur("Veuillez remplir le formulaire");

  } else if (response.status === 400 || response.status === 401 || response.status === 500) {
    messageErreur("Erreur de l'API");
      resetApresEnvoie();
  } else {
    messageErreur("Veuillez remplir le formulaire");
  }
};