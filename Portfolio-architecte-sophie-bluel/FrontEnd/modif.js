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

    const affichageFiltres = await fetch("http://localhost:5678/api/categories")
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

