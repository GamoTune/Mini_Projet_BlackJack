const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js'); //Importation de la librairie discord.js
const { Game } = require('../../game.js'); //On importe le jeu
const { create_game_data_embed } = require('../embed.js'); //On importe la fonction de création d'embed

module.exports = { //Exportation de la commande
    data: new SlashCommandBuilder() //On définit les paramètres de la commande
        .setName('start_game')
        .setDescription('commence un match en solo'),

    async execute(interaction) { //On définit le code à exécuter
        await interaction.reply("Création d'une nouvelle partie..."); //On envoie un message pour dire que la partie est en cours de création

        const game = new Game(); //On crée une nouvelle partie
        const new_game = game.newGame(); //On lance une nouvelle partie

        const hit = new ButtonBuilder()
            .setCustomId('hit')
            .setLabel('Hit')
            .setStyle(ButtonStyle.Danger);

        const stay = new ButtonBuilder()
            .setCustomId('stay')
            .setLabel('Stay')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(hit, stay);

        await interaction.followUp({
            content: "Nouvelle partie lancée !", //On envoie un message pour dire que la partie est lancée
            embeds: [create_game_data_embed(new_game)], //On envoie l'embed de la partie
            components: [row] //On ajoute les boutons
        }); //On envoie le message de début de partie

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
        } catch (e) {
            await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
        }
    },
};
