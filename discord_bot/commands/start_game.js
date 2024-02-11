const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js'); //Importation de la librairie discord.js
const { Game } = require('../../jeu.js'); //On importe le jeu
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
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder()
            .addComponents(hit, stay);

        await interaction.followUp({
            content: "Nouvelle partie lancée !", //On envoie un message pour dire que la partie est lancée
            embeds: [create_game_data_embed(new_game)], //On envoie l'embed de la partie
            components: [row] //On ajoute les boutons
        }); //On envoie le message de début de partie

        const collectorFilter = i => i.user.id === interaction.user.id; //On définit le filtre pour le collector

        const collector = interaction.channel.createMessageComponentCollector({ filter: collectorFilter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'hit') {

                var hit = game.hit();

                if (hit.etat == 'perdu' || hit.etat == 'gagne') {
                    await i.update({ content: 'La partie est terminée!', embeds: [create_game_data_embed(hit)], components: [] });
                    collector.stop();
                }
                else if (hit.etat === 'en_cours')
                await i.update({ content: 'Vous avez choisi Hit!', embeds: [create_game_data_embed(hit)], components: [row] });
            }

            else if (i.customId === 'stay') {
                var stay = game.stay();
                await i.update({ content: 'La partie est terminée!', embeds: [create_game_data_embed(stay)], components: [] });
                collector.stop();
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
    },
};
