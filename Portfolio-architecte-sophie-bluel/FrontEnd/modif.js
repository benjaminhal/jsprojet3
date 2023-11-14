
/*AJOUT DES IMAGES */
const divElement = document.querySelector(".gallery");
const filtreCategories = document.getElementById("btn-filtre")


fetch("http://localhost:5678/api/works")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        console.log(result);
        for(const image of result){
            let fig =
                document.createElement("figure");
                fig.setAttribute("data-name",image.category.id);
                //fig.dataset.name = image.category["id"];
                console.log("setattribute")
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
                console.log(fig)

        }

    });

/*AJOUT DES FILTRES*/
/*AJOUT DES FILTRES*/

//creer les boutons filtre
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
            btn.classList = boutons.name;
            filtreCategories.appendChild(btn);
            btn.addEventListener("click",function(){filtrer(boutons.id)})
            console.log("click")
    }; 

    }

);

const btntous = document.getElementById("Tous")

btntous.addEventListener("click",function(){
  let figures = document.querySelectorAll(".gallery figure");
  for(let figure of figures){
    figure.classList.replace("inactive", "active")

  }
  

})

function filtrer(id){
  console.log("filtrer"+ id)
      choix = id;
      console.log(choix)
  
      let figures = document.querySelectorAll(".gallery figure");
      
      
      
      for(let figure of figures){
          figure.classList.replace("active","inactive");
          console.log(figure.dataset.name);
          if(choix == figure.dataset.name || choix === "Tous" ){
              figure.classList.replace("inactive", "active");
              
          }
          
  
      };
};


let btnFiltre =  document.querySelectorAll("#btn-filtre button");
console.log(btnFiltre)

//pour rendre fonctionnel les filtre
/*for (let filter of btnFiltre){
filter.addEventListener("click", function(){
    let choix = this.id
    console.log(choix)

    let figures = document.querySelectorAll(".gallery figure");
    
    
    
    for(let figure of figures){
        figure.classList.replace("active","inactive");
        
        if(choix === figure.dataset.name || choix === "Tous" ){
            figure.classList.replace("inactive", "active");   
        }
    }; 
});
};*/

/*AJOUT DES MODALES*/

const modalContainer = document.querySelector(".modal-container");
const modalContainer2 = document.querySelector(".modal-container2");

const modalTriggers = document.querySelectorAll(".modal-trigger");
const modale = document.querySelector(".image-modal")


modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

//pour affciher  la modale
function toggleModal(){
  modalContainer.classList.toggle("active")
}

//afficher les image et l'icone supprilmer sur la modale1
const affichageModal = fetch("http://localhost:5678/api/works")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        console.log(result);
        for(const image of result){
          const figure = 
          document.createElement("figure");
          figure.id = "modale" + image.id
          const fig = document.createElement("i");
          fig.classList = "fa-solid fa-trash-can";
          /*fig.id = image.id*/
          /*POUR SUPPRIMER UNE IMAGE DE LA MODALE ET DE L'API*/
          fig.addEventListener("click",function(){
            console.log("click"+ this.id)
            deleteElementById(figure.id);

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

//creation des balises option qui contient les catégories sur la modale2 
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

// Pour aller sur la modale2 AU CLICK sur le bouton modifier
modifier.addEventListener("click",function(){
  modalContainer.classList.remove("active")
  modalContainer2.classList.toggle("active")
});

const fermer = document.querySelector(".close-modal2")

//fermer la modale au click sur la croix
fermer.addEventListener("click",function(){
  modalContainer2.classList.remove("active");
  modalContainer.classList.remove("active");

});

/*fermer la modale
function closeModal(){
  fermer.addEventListener("click",function(){
    modalContainer2.classList.remove("active")
    modalContainer.classList.remove("active")

  })
};*/

const retour = document.querySelector(".retour");

//retourner à la modale1 
retour.addEventListener("click",function(){
  modalContainer2.classList.remove("active");
  modalContainer.classList.toggle("active");

});

/*FONCTION ADMIN*/

//page et fonctionnalités admin
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

//activer le mode admin
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
  
  // Supprime le token du localStorage
  function removeToken() {
    localStorage.removeItem("token");
  };
/*AJOUT D'UN PROJET*/

/*const boutonAjout = document.querySelector(".btn-ajout")*/

/*async function ajoutProjet() {
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
       /* console.log(title);
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
};*/
  
/*const image = inputFile.files[0];*/



/*async function creerImgModale(projet) {
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

}*/

/*const btnAjout = document.getElementById("photo")
const drop = document.querySelector(".image-ajout")*/

/*btnAjout.onclick = () =>{
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
}

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
      
    };*/
    
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

    function deleteElementById(id) {
      console.log(id)
            const token = localStorage.getItem("token");
            fetch(`http://localhost:5678/api/works/${id.replace('modale', '')}`, {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

                const elementSupprime = document.getElementById("gallerie-" + id);
                const elementSupprimeModal = document.getElementById(id);
                /*if (elementSupprime && elementSupprimeModal) {*/
                console.log(elementSupprime)
                console.log(elementSupprimeModal)
                elementSupprime.parentNode.removeChild(elementSupprime);
                elementSupprimeModal.parentNode.removeChild(elementSupprimeModal);
              
      };


      
/*AJOUT DES IMAGES*/

      //creation de la balise figure et les balises qu'elle contient
      const creerBaliser = (data) => {
        console.log("creerBalise");
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            //const { imageUrl: img, title: titre, mondId: id} = data[i];
            //const article = createElemt("figure",` <img src="${img}" alt="${titre}"><figcaption>"${titre}"</figcaption>`);
            const{ id:id, imageUrl:imageUrl, title:titre} = data[i];
            const figureElements = document.createElement('figure');
            figureElements.setAttribute("data-name", id);
            figureElements.id = "gallerie-modale"+id;
            figureElements.classList = "active";
            figureElements.innerHTML = `<img src="${imageUrl}" alt="${titre}"><figcaption>${titre}</figcaption>`;
            
        
            //const { imageUrl: img, title: titre} = data[i];
            //const article = createElemt("figure", `<img src="${img}" alt="${titre}"> <i class="fa-solid fa-trash-can"></i>`);
            gallery.appendChild(figureElements);
                  
            //gallery.appendChild(article);
            
        }
      };

      const fetchData = async (url, callback) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            callback(data);
        } catch (Error) {
            let header = document.querySelector('.image-sophie-bluel');
            header.innerHTML = '<img src="./assets/images/404.jpeg" alt="page404">';
        }
      };

/*function creerImgModale(projet){
 fetch("http://localhost:5678/api/works")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        console.log(result);
        
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
        
})
};*/

const creerImgModale = (data) => {
  console.log("creerimg");
  const gallery = document.querySelector(".image-modal");
  gallery.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const{ id:id, imageUrl:imageUrl, title:titre} = data[i];
    const figureElements = document.createElement('figure');
    figureElements.id = "modale"+id;
    figureElements.innerHTML = `<img src="${imageUrl}" alt="${titre}"><i class="fa-solid fa-trash-can"></i>`;
    
        
      //const { imageUrl: img, title: titre} = data[i];
      //const article = createElemt("figure", `<img src="${img}" alt="${titre}"> <i class="fa-solid fa-trash-can"></i>`);
      gallery.appendChild(figureElements);
  }
};


/*
function creerImgModale(projet) {
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
};*/
      
    
      //recuperer la categorie
      const fetchCategory = async () => {
        const res = await fetch('http://localhost:5678/api/categories/');
        const data = await res.json();
        const choise0 = createElemt("option", " ");
        selectCategorie.appendChild(choise0);
        data.forEach((element) => {
            const name = element.name;
            const id = element.id;
            const categorychoisi = createElemt("option", `${name}`);
            categorychoisi.value = `${name}`;
            categorychoisi.setAttribute("id", `${id}`);
            selectCategorie.appendChild(categorychoisi);
        });
    };

    //constante qui permet de créer un élement
    const createElemt = (elem, texte, mondId) => {
      const elemCreated = document.createElement(elem);
      elemCreated.innerHTML += texte;
      elemCreated.setAttribute("id",mondId)
      return elemCreated;
  };       


//récupére l'id de la catégorie choisi
const selectCategorie = document.getElementById("select-categorie");

let selectCategorieIdDuSelect = "";
formModale2.addEventListener("change", function () {
    const selectedCategoryId = formModale2.options[formModale2.selectedIndex].id;
    selectCategorieIdDuSelect = selectedCategoryId;
});

const btnAjoutImage = document.querySelector('.btn-ajout');
let inputImage = document.querySelector('.input-ajout');
let titre = document.getElementById('titre');
const formAjout = document.getElementById('select-categorie');
const imagePreview = document.getElementById('imagePreview');
const imageinfo = document.getElementById('image-info');
let imageWork = "";

const reset = () => {
  imageinfo.style.display = "block";
  imagePreview.style.display = "none";
  imageWork = "";
  titre.value = "";
  document.querySelector('.fa-regular').style.display = "block";
  document.querySelector(".image-ajout").style.position = "relative";
  document.querySelector(".image-ajout").style.height = "167px";
  document.querySelector(".fa-regular").style.position = "relative";
  document.querySelector(".fa-regular").style.top = "-1em";
  document.querySelector(".fa-image").style.position = "relative";
  document.querySelector(".fa-image").style.top = "-0.5em";
  document.querySelector('.btn-ajout').style.display = "block";
  document.querySelector('.fa-image').style.display = "block";
  document.querySelector('.ajout').style.padding = "40px 0 40px";
  formAjout.value = "";
  inputImage.value = "";
  selectCategorieIdDuSelect = "";
  document.querySelector(".cta2").style.backgroundColor = "#A7A7A7";
  imageinfo.innerHTML = "jpg, png : 4mo max";
  imageinfo.style.color = "black";
};

// Pour déclencher le click sur input
btnAjoutImage.addEventListener('click', (e) => {
  inputImage.click();
  e.preventDefault(); 
});

const btn = document.querySelector(".cta2");
let stockage; // Pour stocker


function messageErreur(message/*, color*/) {
  const erreur = document.querySelector("error");
  alert(message);
  /*erreur.style.fontSize = "5000px";
  erreur.style.color = color;*/
  clearTimeout(stockage);
};

// afficher l'erreur au click sur le boutoin valider si formulaire mal rempli
const listenerValider = (e) => {
    e.preventDefault();
    messageErreur("Veuillez remplir le formulaire"/*, "red"*/);
};
btn.addEventListener('click', listenerValider);


const iconeImage= document.querySelector('.fa-image');
const partAjout = document.querySelector('.ajout');

// verifier formulaire bien rempli
inputImage.addEventListener('change', () => {
  const ImageSelectione = inputImage.files;

  if (ImageSelectione) {
      function messageImage(message) {
          imageinfo.style.color = "red";
          inputImage.value = ''; 
          imageWork = "";
          imageinfo.innerHTML = message;
      };
      if (ImageSelectione[0].type == "image/jpeg" || ImageSelectione[0].type == "image/png") {
          console.log(ImageSelectione[0].type);
          
          if (ImageSelectione[0].size < 4 * 1024 * 1024) {
              imagePreview.src = URL.createObjectURL(ImageSelectione[0]);    
              iconeImage.style.display = "none";
              btnAjoutImage.style.display = "none";
              imageinfo.style.display = "none";
              imageWork = "ok";
              imagePreview.style.display = "block";
          } else if (ImageSelectione[0].size >= 4 * 1024 * 1024) {
              messageImage("L'image est trop volumineuse. Veuillez sélectionner une image de moins de 4 Mo.");
          }
      } else {
          console.log(ImageSelectione[0].type);
          messageImage("L'image doit être au format jpeg ou png et doit faire moins de 4 Mo.");
      };
      changerBoutton();
  }
});

function resetApresEnvoie() {
  Data = "";
  reset();
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
      console.log("response.ok")
      resetApresEnvoie();
      fetchData("http://localhost:5678/api/works/", creerBaliser);
      fetchData("http://localhost:5678/api/works/", creerImgModale);
      modalContainer2.classList.remove("active");
      modalContainer.classList.remove("active");
  } else if (response.status === 400 && titre.value.trim() == "") {
    messageErreur("Veuillez remplir le formulaire", "red");

  } else if (response.status === 400 && formAjout.value == "") {
    messageErreur("Veuillez remplir le formulaire", "red");

  } else if (response.status === 400 || response.status === 401 || response.status === 500) {
    messageErreur("Erreur de l'API", "red");
      resetApresEnvoie();
  } else {
    messageErreur("Veuillez remplir le formulaire", "red");
  }
};



function changerBoutton() {
  if (imageWork == "ok" && titre.value !== "" && formAjout.value !== "") {
      btn.style.backgroundColor = "#1D6154";
      btn.removeEventListener('click', listenerValider);
      btn.addEventListener('click', envoyerImage);
  } else {
      btn.style.backgroundColor = "#A7A7A7";
  }
};

titre.addEventListener('change', changerBoutton);
formAjout.addEventListener('change', changerBoutton);

/*const init = () => {
  fetchData("http://localhost:5678/api/works/", creerBaliser);
};*/

//init();


