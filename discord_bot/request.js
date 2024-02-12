const fs = require('fs'); //Importation de la librairie fs (file system)
const axios = require('axios'); //Importation de la librairie axios


function upload(data) { //Fonction pour uploader les stats des joueurs sur le serveur PHP


    var json = {
        info: "1",
        joueur1: joueur1,
        score: "21",
    }
    json = JSON.stringify(json);

    axios.post("https://gamo.one/blackjack/getjson.php", {json: json},
        {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
    )
        .then(response => { //On récupère la réponse du serveur PHP
            // response.data contient le contenu du fichier JSON
            console.log('Réponse :', response.data);
            //console.log('Type de la réponse :', typeof response.data);
            //let json2 = JSON.parse(response.data);
            //console.log('Réponse :', json2);
        })
        .catch(error => { //On affiche une erreur si le serveur PHP ne répond pas
            console.error('Erreur :', error);
        });
}

upload(); //On exécute la fonction upload

module.exports = { upload }; //Exportation de la fonction upload