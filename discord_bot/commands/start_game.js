const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); //Importation de la librairie discord.js
const { Game } = require('../../game.js'); //On importe le jeu
const { create_embed } = require('../embed.js'); //On importe la fonction de création d'embed

module.exports = { //Exportation de la commande
    data: new SlashCommandBuilder() //On définit les paramètres de la commande
        .setName('start_game')
        .setDescription('commence un match en solo'),

    async execute(interaction) { //On définit le code à exécuter
        await interaction.reply("Création d'une nouvelle partie..."); //On envoie un message pour dire que la partie est en cours de création

        const game = new Game(); //On crée une nouvelle partie
        const new_game = game.newGame(); //On lance une nouvelle partie
        await interaction.editReply("Création d'une nouvelle partie...\nNouvelle partie lancée !"); //On envoie un message pour dire que la partie est lancée
        await interaction.followUp({
            embeds: [create_embed(new_game)] //On envoie l'embed de la partie
        }); //On envoie le message de début de partie
    },
};
