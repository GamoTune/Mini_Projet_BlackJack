const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); //Importation de la librairie discord.js

module.exports = { //Exportation de la commande
    data: new SlashCommandBuilder()
        .setName("challenge")
        .setDescription("Qui voulez vous challenger ?")
        .addUserOption(option => option.setName('user').setDescription('Qui voulez vous challenger ?').setRequired(true)),

    async execute(interaction) {

        await interaction.reply({
            content: "<@!" + interaction.options.getUser('user').id + ">",
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setTitle("CHALLENGE !")
                    .setDescription("Vous avez challengé <@!" + interaction.options.getUser('user').id + "> !")
            ]
        });
//        await interaction.reply({ (Tentative pour faire que ça @laPersonneChallengée à la suite du embed et que ça suppr le message)
            
//        })
    }
};
