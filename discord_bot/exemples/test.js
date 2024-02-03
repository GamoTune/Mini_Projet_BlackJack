const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js'); //Importation de la librairie discord.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Commande de test'),

    async execute(interaction) {
        if (interaction.user.username != "gamotune") {interaction.reply("Vous n'avez pas la permission d'utiliser cette commande !");return;}

        const lock_button = new ButtonBuilder()
            .setCustomId('lock')
            .setLabel('Lock')
            .setStyle('Danger')
            .setEmoji('🔒');

        const row = new ActionRowBuilder()
            .addComponents(lock_button);

        const reponse = await interaction.reply({ content: 'Test', components: [row]});

        const collectorFilter = i => i.user.id === interaction.user.id;
        try{
            const confirm = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 2000 });
            if (confirm.customId === 'lock') {
                return;
            }
        } catch (error) {
            row.components[0].setDisabled(true);
            interaction.editReply({ components: [row] });
        }


    }
}