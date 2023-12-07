//creer les boutons filtre
function creerFiltrer(){
    fetch("http://localhost:5678/api/categories")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        for(const boutons of result){
            const btn = document.createElement("button");
                btn.id = boutons.id;
                btn.type = "button";
                btn.innerHTML = boutons.name;
                btn.classList = boutons.name;
                filtreCategories.appendChild(btn);
                btn.addEventListener("click",function(){filtrer(boutons.id)})
        }; 
        }
    );
};

creerFiltrer();


const btntous = document.getElementById("Tous")

function filtreTous(){
    btntous.addEventListener("click",function(){
        let figures = document.querySelectorAll(".gallery figure");
        for(let figure of figures){
          figure.classList.replace("inactive", "active")
        }
      });
};
filtreTous();

function filtrer(id){
      choix = id;
      let figures = document.querySelectorAll(".gallery figure");
      for(let figure of figures){
          figure.classList.replace("active","inactive");
          if(choix == figure.dataset.name){
              figure.classList.replace("inactive", "active"); 
          }
      };
};