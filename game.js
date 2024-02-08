// Code goes here

class Game {
    constructor() {
        this.suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades']; // Les couleurs
        this.values = ['Ace', 'King', 'Queen', 'Jack', // Les valeurs
            'Ten', 'Nine', 'Eight', 'Seven', 'Six',
            'Five', 'Four', 'Three', 'Two', 'One'
        ];
        this.gameStart = false, // La c'est pour savoir si la partie a commencé
        this.gameOver = false, // La c'est pour savoir si la partie est finie
        this.playWon = false, // La c'est pour savoir si le joueur a gagné
        this.dealerCards = [], // La c'est pour stocker les cartes du dealer
        this.playerCards = [], // La c'est pour stocker les cartes du joueur
        this.dealerScore = 0, // La c'est pour stocker le score du dealer
        this.playerScore = 0, // La c'est pour stocker le score du joueur
        this.deck = []; // La c'est pour stocker le deck
    }

    newGame() {
        this.gameStart = true; // La on dit que la partie a commencé
        this.gameOver = false; // La on dit que la partie est pas finie
        this.playWon = false; // La on dit que le joueur a pas gagné

        this.deck = this.createDeck(); // La on crée le deck
        this.shuffleDeck(this.deck); // La on mélange le deck
        this.dealerCards = [this.getNextCard(), this.getNextCard()]; // La on donne 2 cartes au dealer
        this.playerCards = [this.getNextCard(), this.getNextCard()]; // La on donne 2 cartes au joueur

        return this.showStatus(); // La on affiche le status de la partie
    }

    hit() {
        this.playerCards.push(this.getNextCard());
        this.checkForEndOfGame();
        return this.showStatus();
    }

    stay() {
        this.gameOver = true;
        this.checkForEndOfGame();
        return this.showStatus();
    }

    createDeck() {
        let deck = [] // Création d'un tableau vide
        for (let suitIdx = 0; suitIdx < this.suits.length;
            suitIdx++) { // Pour chaque couleur
            for (let valueIdx = 0; valueIdx < this.values.length; valueIdx++) { // Pour chaque valeur dans chaque couleur
                let card = { // On crée une carte
                    suit: this.suits[suitIdx], // On lui donne une couleur
                    value: this.values[valueIdx] // On lui donne une valeur
                }
                deck.push(card); // On ajoute la carte au deck
            }
        }
        return deck; // On retourne le deck
    }

    shuffleDeck(deck) {
        for (let i = 0; i < deck.length; i++) { // Pour chaque carte dans le deck
            let swapIdx = Math.trunc(Math.random() * deck.length); // On choisi une carte au hasard (on prend la partie entière du nombre aléatoire * le nombre de carte dans le deck)
            let tmp = deck[swapIdx]; // On stocke la carte au hasard
            deck[swapIdx] = deck[i]; // On met la carte choisie a la place de la carte actuelle
            deck[i] = tmp; // On met la carte actuelle a la place de la carte choisie
        }
    }

    checkForEndOfGame() {
        this.updateScores(); // La on met a jour les scores

        if (this.gameOver) { // Si la partie est finie
            while (this.dealerScore < this.playerScore && // Tant que le score du dealer est inférieur au score du joueur et
                this.playerScore <= 21 && // que le score du joueur est inférieur ou égal a 21 et
                this.dealerScore <= 21) { // que le score du dealer est inférieur ou égal a 21
                this.dealerCards.push(this.getNextCard()); // Le dealer tire une carte
                this.updateScores(); // On met a jour les scores
            }
        }

        if (this.playerScore > 21) { // Si le score du joueur est supérieur a 21
            this.playWon = false; // Le joueur a perdu
            this.gameOver = true; // La partie est finie
        }

        else if (this.dealerScore > 21) { // Si le score du dealer est supérieur a 21
            this.playWon = true; // Le joueur a gagné
            this.gameOver = true; // La partie est finie
        }

        else if (this.gameOver) { // Si la partie est finie
            if (this.playerScore > this.dealerScore) { // Si le score du joueur est supérieur au score du dealer
                this.playWon = true; // Le joueur a gagné
            }
            else { // Sinon
                this.playWon = false; // Le joueur a perdu
            }
        }
    }

    getCardString(card) { // La fonction pour récupérer le nom de la carte
        return card.value + " of " + card.suit; // On retourne la valeur de la carte + " of " + la couleur de la carte
    }

    getCardNumericValue(card) { // La fonction pour récupérer la valeur numérique de la carte
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

    showStatus() { // La fonction pour afficher le status de la partie
        let info = {Dealer: {}, Player: {}, Winner: ""};

        let dCards = []; // On crée une variable pour stocker les cartes du dealer
        for (let i = 0; i < this.dealerCards.length; i++) { // Pour chaque carte du dealer
            dCards.push(this.getCardString(this.dealerCards[i])); // On ajoute le nom de la carte a la variable
        }
        let pCards = []; // On crée une variable pour stocker les cartes du joueur
        for (let i = 0; i < this.playerCards.length; i++) { // Pour chaque carte du joueur
            pCards.push(this.getCardString(this.playerCards[i])); // On ajoute le nom de la carte a la variable
        }

        this.updateScores(); // On met a jour les scores

        // On affiche les cartes et les scores (mais c dans un textArea donc faudra adapter pour discord)
        info.Dealer = {
            cards: dCards,
            score: this.dealerScore
        };
        info.Player = {
            cards: pCards,
            score: this.playerScore
        };
        if (this.gameOver) { // Si la partie est finie
            if (this.playWon) { // Si le joueur a gagné
                info.Winner = "PLAYER WINS"; // On affiche "PLAYER WINS"
            }
            else { // Sinon
                info.Winner = "DEALER WINS"; // On affiche "DEALER WINS"
            }
        } else {
            info.Winner = ""; // Sinon on affiche rien
        }
        return info
    }

    getScore(cardArray) {
        let score = 0; // On crée une variable pour stocker le score
        let hasAce = false; // On crée une variable pour savoir si le joueur a un as
        for (let i = 0; i < cardArray.length; i++) { // Pour chaque carte
            let card = cardArray[i]; // On stocke la carte
            score += this.getCardNumericValue(card); // On ajoute la valeur de la carte au score
            if (card.value == 'Ace') { // Si la carte est un as
                hasAce = true; // On dit que le joueur a un as
            }

            if (hasAce && score + 10 <= 21) { // Si le joueur a un as et que le score + 10 est inférieur ou égal a 21
                return score + 10; // On retourne le score + 10
            }
        }
        return score; // On retourne le score
    }

    updateScores() {
        this.dealerScore = this.getScore(this.dealerCards); // On met a jour le score du dealer
        this.playerScore = this.getScore(this.playerCards); // On met a jour le score du joueur
    }

    getNextCard() {
        return this.deck.shift(); // On retourne la première carte du deck
    }
}

module.exports = { Game }; // On exporte la classe Game




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