/* 
Activité 2
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];
var lientest = { titre: "titretest", url: "utltest", auteur: "auteurtest"};

// TODO : compléter ce fichier pour ajouter les liens à la page web et avoir la possibilité d'ajouter des liens
//déclaration
var zoneBoutonElt = document.createElement("div");
var i = 0;


//fonction
afficherListe(listeLiens);
var nodeReference = document.getElementById("listeLiens");
afficherBouton();



// mise en place du bouton
function afficherBouton( boutonElt){
    var boutonElt = document.createElement("button");
    zoneBoutonElt.innerHTML = "";
    zoneBoutonElt.id = "zoneForm";
    boutonElt.textContent = "Ajouter un Lien";
    zoneBoutonElt.appendChild(boutonElt);
    document.getElementById("contenu").insertBefore(zoneBoutonElt, nodeReference  );
    boutonElt.addEventListener("click", function(){afficherForm()});
}

function afficherListe(listeLiens){
    var ulElt = document.createElement("ul"); // Création de la liste
    ulElt.id = "listeLiens";
    listeLiens.forEach(function (lien) {
        ulElt.appendChild(ajouterUnLien(lien));
    });
    document.getElementById("contenu").appendChild( ulElt); // Ajout de la liste à la page
}

    
function ajouterUnLien (lien){
    var liElt = document.createElement("li");
    liElt.className = "lien";

    //création du lien sur le titre
    var titreElt = document.createElement("h3");
    titreElt.id = "titre";
    titreElt.style.color = "#428bca";
    
    var lienElt = document.createElement("a");
    lienElt.textContent = lien.titre;
    lienElt.href = lien.url;
    lienElt.style.textDecoration = "none";

    var urlElt = document.createElement("p");
    urlElt.textContent = lien.url;

    var auteurElt = document.createElement("p");
    auteurElt.textContent = 'Ajouté par '+lien.auteur;
    titreElt.appendChild(lienElt);
    liElt.appendChild(titreElt);
    liElt.appendChild(urlElt);
    liElt.appendChild(auteurElt);
    return  liElt;
}
    

function ajouterLienListe(nTitre, nUrl, nAuteur){
    var regexUrl = new RegExp('http:\/\/');
    var regexUrls = new RegExp('https:\/\/');
    if (!regexUrl.test(nUrl) && !regexUrls.test(nUrl)){
        nUrl = "http:\/\/"+nUrl;
    }
    var lienTemp = {
        titre: nTitre,
        url: nUrl,
        auteur: nAuteur
    }
    console.log(lienTemp);
    document.querySelector("ul").appendChild(ajouterUnLien(lienTemp));
}

function afficherForm(){

    var formElt = document.createElement("form");
    for(var i=0; i < 4; i++) {
        var labelElt = document.createElement("label");
        var inputElt = document.createElement("input");
        if (i===0){
            labelElt.textContent = "Inserer le titre";
            formElt.appendChild(labelElt);
            inputElt.type = "text";
            inputElt.id = "titre";
            inputElt.required = true;
            formElt.appendChild(inputElt);
        } else if(i === 1){
            labelElt.textContent = "Inserer l'url";
            formElt.appendChild(labelElt);
            inputElt.type = "text";
            inputElt.id = "url";
            inputElt.required = true;
            formElt.appendChild(inputElt);
        }else if(i === 2){
            labelElt.textContent = "Inserer l'auteur";
            formElt.appendChild(labelElt);
            inputElt.type = "text";
            inputElt.id = "auteur";
            inputElt.required = true;
            formElt.appendChild(inputElt);
        }else if(i === 3){
            inputElt.type = "submit";
            inputElt.value = "Envoyer";
            formElt.appendChild(inputElt);            
        }
    }
    document.getElementById("zoneForm").appendChild(formElt);

    formElt.addEventListener("submit", function(e){
        ajouterLienListe(formElt.elements.titre.value,formElt.elements.url.value,formElt.elements.auteur.value);
        e.preventDefault();
       
        zoneBoutonElt.innerHTML = "";
        zoneBoutonElt.appendChild(formElt);
        afficherMessage();
        setTimeout(function(){afficherBouton();},2000);
    });
}

function afficherMessage(){
    var zoneMessage = document.getElementById("zoneForm");
    zoneMessage.textContent = "Le lien a été ajouter avec succès";
}