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

    const supprimer = document.querySelector(".fa-solid fa-trash-can");
    const imageSuppr = document.querySelectorAll(".image-modal figure");
    const imageS = document.querySelectorAll(".image-modal img");
    
    
    supprimer.addEventListener("click",function(){
      for(let figure of imageSuppr){
        figure.remove()
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






