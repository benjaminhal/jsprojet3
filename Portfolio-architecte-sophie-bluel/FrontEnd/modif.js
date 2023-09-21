var id = {
    email : "sophie.bluel@test.tld",
    password : "S0phie"

}


fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id)
}) .then(response => response.json())
.then(data => console.log(data))

const divElement = document.getElementById("portfolio");
let btnTous = document.getElementById("btn-tous");
let btnAppartements = document.getElementById("btn-appartements");
let btnHT = document.getElementById("btn-h-t");
let btnObjets = document.getElementById("btn-objets");

const test = fetch("http://localhost:5678/api/works")
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        console.log(result);
        for(const image of result){
            const ele =
                document.createElement("figure")
                ele.innerHTML = image.title;
                divElement.appendChild(ele)
                

        }

    })


const appart = image.categorie.filter((catego)=> catego === "Appartements");
const hotelResto = image.categorie.filter((catego) => catego === "Hotels & retaurants");
const objet = image.categorie.filter((catego)=> catego ==="Objets");
/* 
const monSet = new set()
monSet.add(divElement)
        btnTous.addEventListener("click",function(){
            for(const image of result){
                if(btnTous === "click"){
                    monSet.delet(ele)
                    monSet.appendChild(appart)
                }
                else{
                    break
                }
        })
        btnAppartements.addEventListener("click",function(){
            for (const image of result){
                if(btnAppartements === "click"){
                    monSet.delet(ele)
                    monSet.appendChild(hotelResto)
    
                }
            }
        btnAppartements.addEventListener("click",function(){
            for (const image of result){
                if(btnAppartements === "click"){
                    monSet.delet(ele)
                    monSet.appendChild(objet)
    
                }
            }
            console.log(monSet)
        })*/

        
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

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle("active")
}
