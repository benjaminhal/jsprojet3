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

//afficher les image et l'icone supprimer sur la modale1

function afficherImageModale(){
    const affichageModal = fetch("http://localhost:5678/api/works")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        for(const image of result){
          const figure = 
          document.createElement("figure");
          figure.id = "modale" + image.id
          const fig = document.createElement("i");
          fig.classList = "fa-solid fa-trash-can";
          /*fig.id = image.id*/
          /*POUR SUPPRIMER UNE IMAGE DE LA MODALE ET DE L'API*/
          fig.addEventListener("click",function(){
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
};
afficherImageModale();


const formModale2 = document.getElementById("select-categorie")

//creation des balises option qui contient les catégories sur la modale2 
function optionModale(){
    const affichageModal2 = fetch("http://localhost:5678/api/categories")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        for(const catego of result){
        const option = document.createElement("option")
        option.innerHTML = catego.name;
        option.id = catego.id;
        formModale2.appendChild(option);
        }
    });
};
optionModale();
    




const modifier = document.querySelector(".ajoutPhoto")

// Pour aller sur la modale2 AU CLICK sur le bouton modifier
function ouvrirModale2(){
    modifier.addEventListener("click",function(){
        modalContainer.classList.remove("active")
        modalContainer2.classList.toggle("active")
      });     
};
ouvrirModale2();

const fermer = document.querySelector(".close-modal2")

//fermer la modale au click sur la croix
function fermerModales(){
    fermer.addEventListener("click",function(){
    modalContainer2.classList.remove("active");
    modalContainer.classList.remove("active");
  });
};
fermerModales();


const retour = document.querySelector(".retour");

//retourner à la modale1 
function retourModale1(){
    retour.addEventListener("click",function(){
        modalContainer2.classList.remove("active");
        modalContainer.classList.toggle("active");
      });
};
retourModale1();


//creer ls balises dans la modale lorsqu'une image est ajouté
const creerImgModale = (data) => {
    const gallery = document.querySelector(".image-modal");
    gallery.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const{ id:id, imageUrl:imageUrl, title:titre} = data[i];
      const figureElements = document.createElement('figure');
      figureElements.id = "modale"+id;
      figureElements.innerHTML = `<img src="${imageUrl}" alt="${titre}">`/*<i class="fa-solid fa-trash-can"></i>*/;
      const poubelle = document.createElement("i")
      poubelle.classList = "fa-solid fa-trash-can";
      figureElements.appendChild(poubelle)
      poubelle.addEventListener("click",function(){
        deleteElementById(figureElements.id);
  
      })
      gallery.appendChild(figureElements);
    };
  };

  const btnAjoutImage = document.querySelector('.btn-ajout');
let inputImage = document.querySelector('.input-ajout');
const formAjout = document.getElementById('select-categorie');
const imageinfo = document.getElementById('image-info');
const iconeImage= document.querySelector('.fa-image');
const partAjout = document.querySelector('.ajout');
  // Pour déclencher le click sur input
  function clickInput(){
    btnAjoutImage.addEventListener('click', (e) => {
        inputImage.click();
        e.preventDefault(); 
      });
  };
  clickInput();




//permet de reset la modale2
  const reset = () => {
    imageinfo.style.display = "block";
    imagePreview.style.display = "none";
    imageWork = "";
    titre.value = "";
    document.querySelector('.fa-regular').style.display = "block";
    document.querySelector(".image-ajout").style.position = "relative";
    document.querySelector(".image-ajout").style.height = "167px";
    document.querySelector(".image-ajout").style.top = "3em";
    document.querySelector(".image-ajout").style.left = "192px";
    document.querySelector(".fa-regular").style.display = "block";
    document.querySelector(".fa-regular").style.position = "relative";
    document.querySelector(".fa-regular").style.top = "-0.6em";
    document.querySelector(".fa-image").style.display = "block";
    document.querySelector(".fa-image").style.position = "relative";
    document.querySelector(".fa-image").style.top = "-0.6em";
    document.querySelector('.btn-ajout').style.display = "block";
    document.querySelector('.btn-ajout').style.top = "-6.7em";
    //document.querySelector('.ajout').style.padding = "40px 0 40px";
    formAjout.value = "";
    inputImage.value = "";
    selectCategorieIdDuSelect = "";
    document.querySelector(".cta2").style.backgroundColor = "#A7A7A7";
    imageinfo.innerHTML = "jpg, png : 4mo max";
    imageinfo.style.color = "black";
    imageinfo.style.position = "relative";  
    imageinfo.style.top = "-5em";
    imageinfo.style.left = "165px";
  };

  // verifier formulaire bien rempli
  function verification(){
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
                if (ImageSelectione[0].size <= 4 * 1024 * 1024) {
                    imagePreview.src = URL.createObjectURL(ImageSelectione[0]);    
                    iconeImage.style.display = "none";
                    btnAjoutImage.style.display = "none";
                    imageinfo.style.display = "none";
                    imageWork = "ok";
                    imagePreview.style.display = "block";
                } 
            } else {
                messageImage("L'image doit être au format jpeg ou png et doit faire moins de 4 Mo.");
            };
            changerBoutton();
        }
      });
  };
  verification();


  function resetApresEnvoie() {
    Data = "";
    reset();
  };

const btn = document.querySelector(".cta2");
let stockage; // Pour stocker

// afficher l'erreur au click sur le boutoin valider si formulaire mal rempli
const listenerValider = (e) => {
    e.preventDefault();
    messageErreur("Veuillez remplir le formulaire");
};

btn.addEventListener('click', listenerValider);


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