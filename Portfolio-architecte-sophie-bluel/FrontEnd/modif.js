var id = {
    email : "sophie.bluel@test.tld",
    password : "S0phie"

}


await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id)
}) .then(response => response.json())
.then(data => console.log(data))

const divElement = document.querySelector(".gallery");
const filreCategories = document.getElementById("btn-filtre")


const test = await fetch("http://localhost:5678/api/works")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        console.log(result);
        for(const image of result){
            const ele =
                document.createElement("figure");
                ele.dataset.name =  image.category["name"];
                ele.classList = "active"
                var img = document.createElement("img");
                img.src = image.imageUrl;
                img.alt = image.title;
                ele.appendChild(img);
                var titre = document.createElement("figcaption");
                titre.textContent = image.title
                ele.appendChild(titre);
                divElement.appendChild(ele);
        }
        for(const boutons of result){
                const btn = document.createElement("button")
                btn.id = boutons.category["name"]
                btn.type = "button"
                btn.innerHTML = boutons.category["name"]
                filreCategories.appendChild(btn)
        }

    });
/*
let filtreAppart = document.querySelectorAll(".btn-Objets")
console.log(filtreAppart)

for(let i = 0; i < filtreAppart.length; i++ ){
    filtreAppart[i].addEventListener("click", event =>{
        event.preventDefault();
        console.log(event);
    } )

    img = img.filter(el => el.i.category["name"] !== filtreAppart)
    console.log(img)

    localStorage.setItem("image", JSON.stringify(img));

    window.location.href ="index.html";

}
*/
let btnFiltre = document.querySelectorAll("#btn-filtre button");
console.log(btnFiltre)

for (let filter of btnFiltre){
    filter.addEventListener("click", async function(){
        let choix = this.id

        let figures = document.querySelectorAll(".gallery figure");
        for(let figure of figures){
            figure.classList.replace("active","inactive");

            if(choix in figure.dataset || choix === "Tout" ){
                figure.classList.replace("inactive", "active");
            }

        };
    });
};



/*const appart = image.categorie["name"].filter((catego)=> catego === "Appartements");
const hotelResto = image.categorie["name"].filter((catego) => catego === "Hotels & retaurants");
const objet = image.categorie["name"].filter((catego)=> catego ==="Objets");




       
        
const filtre = fetch("http://localhost:5678/api/works").then(filtre => filtre.json());
const monSet = new set()
monSet.add(filtre.name)
btnTous.addEventListener("click", function(monSet){
	let liste = new set(monSet)
	for(let categorie of monSet){
		if(btnTous ==="click"){
			liste.add()
		}
		else{
			break
		}
	}
	console.log(liste)
});

const image = await reponse.json()

var email = document.getElementById("email");

        email.addEventListener("keyup", function (event) {
          if (email.validity.typeMismatch) {
            email.setCustomValidity("J'attends un e-mail, mon cher !");
          } else {
            email.setCustomValidity("");
          }
        });


/*function genererPieces(image) {
    for( let i ; i < image.lenght; i ++){
        const photo = image(i);
        const section = document.createElement(".portfolio");
        const imageElement = document.createElement("photo");
        const imgElement = document.createElement("img");
        imgElement.src = reponse.imageUrl;
        const nomElement = document.createElement("h2");
        nomElement.innerText = reponse.title;

        section.appendChild(imgElement);
        imgElement.appendChild(nomElement);
    }

    
}
genererPieces(image);*/

