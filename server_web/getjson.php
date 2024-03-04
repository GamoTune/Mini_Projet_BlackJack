<?php

$json=$_POST['json']; // on récupère le json envoyé par le client

$file = "/home/gamoonr/www/blackjack/scores.txt"; // on définit le fichier de sauvegarde

$scoresFile = fopen($file,'a'); // on ouvre le fichier en écriture

$test = fwrite($scoresFile,$json); // on écrit le json dans le fichier
fwrite($scoresFile, PHP_EOL); // on saute une ligne

if($test){ // si l'écriture a fonctionné
    echo "sauvegarde partie effectuee : ".$json; // on renvoie le json sauvegardé
}else{ // si l'écriture a échoué
    echo "erreur sauvegarde ".$json; // on renvoie une erreur
}

?>