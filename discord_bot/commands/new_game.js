/*const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); //Importation de la librairie discord.js
const { Game } = require('../../game.js'); //On importe le jeu
const { create_embed } = require('../embed.js'); //On importe la fonction de création d'embed

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

module.exports = {
    data: new SlashCommandBuilder()
    .setName('new_game')
}
*/