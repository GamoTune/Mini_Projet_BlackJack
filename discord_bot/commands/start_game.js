const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js'); //Importation de la librairie discord.js
const { Game } = require('../jeu.js'); //On importe le jeu
const { create_game_data_embed } = require('../embed.js'); //On importe la fonction de création d'embed
const { upload } = require('../request.js'); //On importe la fonction d'envoi de données au serveur PHP

module.exports = { //Exportation de la commande
    data: new SlashCommandBuilder() //On définit les paramètres de la commande
        .setName('start_game')
        .setDescription('commence un match en solo'),

    async execute(interaction) { //On définit le code à exécuter
        await interaction.reply("Création d'une nouvelle partie..."); //On envoie un message pour dire que la partie est en cours de création

        const game = new Game(); //On crée une nouvelle partie
        const new_game = game.newGame(); //On lance une nouvelle partie

        const hit = new ButtonBuilder() //On crée les boutons
            .setCustomId('hit') //On définit l'ID du bouton
            .setLabel('Hit') //On définit le texte du bouton
            .setStyle(ButtonStyle.Danger); //On définit la couleur du bouton

        const stay = new ButtonBuilder() //On crée le deuxième bouton
            .setCustomId('stay') //On définit l'ID du bouton
            .setLabel('Stay') //On définit le texte du bouton
            .setStyle(ButtonStyle.Success); //On définit la couleur du bouton

        const row = new ActionRowBuilder() //On crée la rangée de boutons
            .addComponents(hit, stay); //On ajoute les boutons à la rangée

        await interaction.followUp({
            content: "Nouvelle partie lancée !", //On envoie un message pour dire que la partie est lancée
            embeds: [create_game_data_embed(new_game)], //On envoie l'embed de la partie
            components: [row] //On ajoute les boutons
        }); //On envoie le message de début de partie

        const collectorFilter = i => i.user.id === interaction.user.id; //On définit le filtre pour le collector

        const collector = interaction.channel.createMessageComponentCollector({ filter: collectorFilter}); //On crée le collector

        var game_data; //On définit la variable game_data

        collector.on('collect', async i => { //On définit ce qu'il se passe quand un bouton est cliqué
            if (i.customId === 'hit') { //Si le bouton "Hit" est cliqué

                game_data = game.hit(); //On appelle la méthode hit() du jeu

                if (game_data.etat == 'perdu' || game_data.etat == 'gagné') { //Si la partie est terminée
                    await i.update({ content: 'La partie est terminée!', embeds: [create_game_data_embed(game_data)], components: [] }); //On envoie un message pour dire que la partie est terminée
                    collector.stop(); //On arrête le collector
                }
                else if (game_data.etat === 'Partie en cours') //Si la partie est en cours
                await i.update({ content: 'Vous avez choisi Hit!', embeds: [create_game_data_embed(game_data)], components: [row] }); //On met à jour le message avec les nouvelles données de la partie
            }

            else if (i.customId === 'stay') { //Si le bouton "Stay" est cliqué
                game_data = game.stay(); //On appelle la méthode stay() du jeu
                await i.update({ content: 'La partie est terminée!', embeds: [create_game_data_embed(game_data)], components: [] }); //On envoie un message pour dire que la partie est terminée
                collector.stop(); //On arrête le collector
            }
        });

        collector.on('end', collected => { //Quand le collector est terminé
            upload(game_data); //On envoie les stats de la partie au serveur PHP
            console.log(`Collected ${collected.size} interactions.`); //On affiche dans la console le nombre d'interactions collectées
        });
    },
};
