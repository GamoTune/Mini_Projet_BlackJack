const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); //Importation de la librairie discord.js

module.exports = { //Exportation de la commande
    data: new SlashCommandBuilder() //On définit les paramètres de la commande
        .setName('start_game')
        .setDescription('commence un match en solo'),

    async execute(interaction) { //On définit le code à exécuter

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Creation de la partie')
                    .setDescription('Partie créée avec succès !')
                    .setTimestamp()
            ]

        });
/*        new SlashCommandBuilder()
        .setName("challenge")
        .setDescription("Permet de faire une partie avec qlq'un :)")
    
    execute(interaction)
        
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor('Red')
                .setTitle("CHALLENGE !")
                .setDescription("Vous avez challengé")
            ]
        })*/
        return;
    }
};
