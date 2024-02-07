// Code goes here

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades']; // Les couleurs
let values = ['Ace', 'King', 'Queen', 'Jack', // Les valeurs
    'Ten', 'Nine', 'Eight', 'Seven', 'Six',
    'Five', 'Four', 'Three', 'Two', 'One'
];


// La on crée les variables qui vont servir a stocker les cartes du joueur et du dealer
let gameStart = false, // La c'est pour savoir si la partie a commencé
    gameOver = false, // La c'est pour savoir si la partie est finie
    playWon = false, // La c'est pour savoir si le joueur a gagné
    dealerCards = [], // La c'est pour stocker les cartes du dealer
    playerCards = [], // La c'est pour stocker les cartes du joueur
    dealerScore = 0, // La c'est pour stocker le score du dealer
    playerScore = 0, // La c'est pour stocker le score du joueur
    deck = []; // La c'est pour stocker le deck

// La c'est l'ajout d'une écoute d'evenement sur le bouton pour lancer la partie (donc pour nous ça sera une commande /)
function newGame() {
    gameStart = true; // La on dit que la partie a commencé
    gameOver = false; // La on dit que la partie est pas finie
    playWon = false; // La on dit que le joueur a pas gagné

    deck = createDeck(); // La on crée le deck
    shuffleDeck(deck); // La on mélange le deck
    dealerCards = [getNextCard(), getNextCard()]; // La on donne 2 cartes au dealer
    playerCards = [getNextCard(), getNextCard()]; // La on donne 2 cartes au joueur

    showStatus(); // La on affiche le status de la partie
}

// La fonction pour créer le deck
function createDeck() {
    let deck = [] // Création d'un tableau vide
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) { // Pour chaque couleur
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) { // Pour chaque valeur dans chaque couleur
            let card = { // On crée une carte
                suit: suits[suitIdx], // On lui donne une couleur
                value: values[valueIdx] // On lui donne une valeur
            }
            deck.push(card); // On ajoute la carte au deck
        }
    }
    return deck; // On retourne le deck
}

// La fonction pour mélanger le deck
function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) { // Pour chaque carte dans le deck
        let swapIdx = Math.trunc(Math.random() * deck.length); // On choisi une carte au hasard (on prend la partie entière du nombre aléatoire * le nombre de carte dans le deck)
        let tmp = deck[swapIdx]; // On stocke la carte au hasard
        deck[swapIdx] = deck[i]; // On met la carte choisie a la place de la carte actuelle
        deck[i] = tmp; // On met la carte actuelle a la place de la carte choisie
    }
}

// La on ajoute une écoute d'événement sur le bouton pour tirer une carte (donc pour nous ça sera une commande /)
function hit() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
}

// La on ajoute une écoute d'événement sur le bouton pour rester (donc pour nous ça sera une commande /)
function stay() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
}

// La fonction pour vérifier si la partie est finie
function checkForEndOfGame() {
    updateScores(); // La on met a jour les scores

    if (gameOver) { // Si la partie est finie
        while (dealerScore < playerScore && // Tant que le score du dealer est inférieur au score du joueur et
            playerScore <= 21 && // que le score du joueur est inférieur ou égal a 21 et
            dealerScore <= 21) { // que le score du dealer est inférieur ou égal a 21
            dealerCards.push(getNextCard()); // Le dealer tire une carte
            updateScores(); // On met a jour les scores
        }
    }

    if (playerScore > 21) { // Si le score du joueur est supérieur a 21
        playWon = false; // Le joueur a perdu
        gameOver = true; // La partie est finie
    }

    else if (dealerScore > 21) { // Si le score du dealer est supérieur a 21
        playWon = true; // Le joueur a gagné
        gameOver = true; // La partie est finie
    }

    else if (gameOver) { // Si la partie est finie
        if (playerScore > dealerScore) { // Si le score du joueur est supérieur au score du dealer
            playWon = true; // Le joueur a gagné
        }
        else { // Sinon
            playWon = false; // Le joueur a perdu
        }
    }
}

function getCardString(card) { // La fonction pour récupérer le nom de la carte
    return card.value + " of " + card.suit; // On retourne la valeur de la carte + " of " + la couleur de la carte
}
function getCardNumericValue(card) { // La fonction pour récupérer la valeur numérique de la carte
    switch (card.value) { // On regarde la valeur de la carte
        case 'Ace': // Si c'est un as
            return 1; // On retourne 1
        case 'Two': // Si c'est un deux
            return 2; // On retourne 2
        case 'Three': //Etc
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

// La fonction pour afficher le status de la partie
function showStatus() { // La fonction pour afficher le status de la partie
    let txt;
    if (!gameStart) { // Si la partie a pas commencé
        return 'Welcome to Blackjack!'; // On affiche un message de bienvenue
    }

    let dealerCardString = ''; // On crée une variable pour stocker les cartes du dealer
    for (let i = 0; i < dealerCards.length; i++) { // Pour chaque carte du dealer
        dealerCardString += getCardString(dealerCards[i]) + '\n'; // On ajoute le nom de la carte a la variable
    }
    let playerCardString = ''; // On crée une variable pour stocker les cartes du joueur
    for (let i = 0; i < playerCards.length; i++) { // Pour chaque carte du joueur
        playerCardString += getCardString(playerCards[i]) + '\n'; // On ajoute le nom de la carte a la variable
    }

    updateScores(); // On met a jour les scores

    // On affiche les cartes et les scores (mais c dans un textArea donc faudra adapter pour discord)
    txt = 'Dealer has:\n' +
        dealerCardString +
        '(score: ' + dealerScore + ')\n\n' +

        'Player has:\n' +
        playerCardString +
        '(score: ' + playerScore + ')\n\n';

    if (gameOver) { // Si la partie est finie
        if (playWon) { // Si le joueur a gagné
            txt += "YOU WIN!"; // On affiche "YOU WIN!"
        }
        else { // Sinon
            txt += "DEALER WINS"; // On affiche "DEALER WINS"
        }
    }
    return txt
}

// La fonction pour récupérer le score
function getScore(cardArray) { 
    let score = 0; // On crée une variable pour stocker le score
    let hasAce = false; // On crée une variable pour savoir si le joueur a un as
    for (let i = 0; i < cardArray.length; i++) { // Pour chaque carte
        let card = cardArray[i]; // On stocke la carte
        score += getCardNumericValue(card); // On ajoute la valeur de la carte au score
        if (card.value == 'Ace') { // Si la carte est un as
            hasAce = true; // On dit que le joueur a un as
        }

        if (hasAce && score + 10 <= 21) { // Si le joueur a un as et que le score + 10 est inférieur ou égal a 21
            return score + 10; // On retourne le score + 10
        }
    }
    return score; // On retourne le score
}

// La fonction pour mettre a jour les scores
function updateScores() {
    dealerScore = getScore(dealerCards); // On met a jour le score du dealer
    playerScore = getScore(playerCards); // On met a jour le score du joueur
}

// La fonction pour tirer une carte
function getNextCard() {
    return deck.shift(); // On retourne la première carte du deck
}


/*

Pour info :

newGameButton.addEventListener('click', function () {}

Cette ligne ajoute une écoute d'événement pour savoir quand le bouton est "click".
Quand le bouton est cliqué, il exécute la fonction anonyme (cad que au lieu d'appeler une fonction défini ailleur, on la défini directement dans l'écoute d'événement).
Elle est définie par la syntaxe function() {}.
Donc pour remplacer cette ce morceaux de code par une commande discord, il va falloir refaire la fonction (juste copier coller) pourqu'elle soit utilisable dans discord.

Exemple :

function newGame() {
    bla bla bla
}

En suite, tu pourra l'appeler dans la commande discord en utilisant le require() :
const game = require('game.js');

Mais pour ça faut exporter la fonction avec module.exports :

module.exports = { newGame }; // Tu le fait en dessous de la fonction c plus simple

*/