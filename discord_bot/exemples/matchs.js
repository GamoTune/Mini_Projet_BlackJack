const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js'); //Importation de la librairie discord.js
const fs = require('fs'); //Importation de la librairie fs (file system)
const { embedMessage_match } = require('../embed_message_match.js'); //Importation de la fonction embedMessage_match
const { lst_maps } = require('../const_joueurs_maps.js'); //Importation de la liste des maps

// Fonction pour trouver le lien de l'image de profil d'un joueur
module.exports = {
    data: new SlashCommandBuilder() //On définit les paramètres de la commande
        .setName('matchs')
        .setDescription('Affiche des matchs par rapport à des critères.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('liste')
                .setDescription('Affiche la liste des 10 derniers matchs.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('id')
                .setDescription('Affiche un match en fonction de son id')
                .addIntegerOption(option =>
                    option
                        .setName('id')
                        .setDescription('L\'id du match')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('map')
                .setDescription('Affiche 10 derniers matchs d\'une map')
                .addStringOption(option =>
                    option
                        .setName('map')
                        .setDescription('La map')
                        .addChoices(...lst_maps)
                        .setRequired(true))),

    async execute(interaction) { // On définit le code à exécuter
        const file = fs.readFileSync('data_matchs.json'); //Lecture du fichier data_matchs.json
        const data = JSON.parse(file); //Conversion du fichier data_matchs.json en objet JS
        var lst_embed = []; //Liste des embeds à envoyer
        const command = interaction.options.getSubcommand(); //On récupère la sous-commande

        //test des conditions
        if (command == 'id') { //Si la sous-commande est 'id'
            const id = interaction.options.getInteger('id'); //On récupère l'id du match
            if (id < 0 || id > data.matchs.length) { //Si l'id est inférieur à 0 ou supérieur au nombre de matchs
                interaction.reply(`L'id du match doit être compris entre 0 et ${data.matchs.length} !`); //On envoie un message d'erreur
                return;
            }
            else { //Si l'id est valide
                const lock_button = new ButtonBuilder() //On crée le bouton pour locker le match
                    .setCustomId('lock') //On définit l'id du bouton
                    .setLabel('Unlock') //On définit le label du bouton
                    .setStyle('Secondary') //On définit le style du bouton
                    .setEmoji('🔓'); //On définit l'emoji du bouton
                if (data.matchs[id].lock) { //Si le match est lock
                    lock_button.setDisabled(true); //On désactive le bouton
                    lock_button.setStyle('Danger'); //On change le style du bouton
                    lock_button.setLabel('Lock'); //On change le label du bouton
                    lock_button.setEmoji('🔒'); //  On change l'emoji du bouton
                }
                const row = new ActionRowBuilder() //On crée la ligne de boutons
                    .addComponents(lock_button); //On ajoute le bouton à la ligne
                const reponse = await interaction.reply({ embeds: [embedMessage_match(null, null, null, null, data.matchs[id])], components: [row] }); //On envoie l'embed et la ligne de boutons
                const collectorFilter = i => i.user.id === interaction.user.id; //On définit le filtre pour le collector
                try { //On essaie de récupérer la réponse de l'utilisateur
                    const confirm = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 60000 }); //On attend la réponse de l'utilisateur
                    if (confirm.customId === 'lock') { //Si l'utilisateur a cliqué sur le bouton
                        data.matchs[id].lock = true; //On lock le match
                        row.components[0].setDisabled(true); //On désactive le bouton
                        row.components[0].setStyle('Danger'); //On change le style du bouton
                        row.components[0].setLabel('Lock'); //On change le label du bouton
                        row.components[0].setEmoji('🔒'); //On change l'emoji du bouton
                        fs.writeFileSync('data_matchs.json', JSON.stringify(data)); //On écrit les données dans le fichier data_matchs.json
                        confirm.update({embeds: [embedMessage_match(null, null, null, null, data.matchs[id])], components: [row]}); //On met à jour le message
                    }
                } catch (error) { //Si l'utilisateur n'a pas répondu
                    row.components[0].setDisabled(true); //On désactive le bouton
                    interaction.editReply({ components: [row] }); //On met à jour le message
                    return;
                }
            }
        }
        else if (command == 'liste') { //Si la sous-commande est 'liste'
            let i = 0;
            if (data.matchs.length > 10) { // Si il y a plus de 10 matchs
                i = data.matchs.length - 10; // On affiche les 10 derniers matchs (parce que la limite est de 10 embeds)
            }
            for (i; i < data.matchs.length; i++) { //Pour chaque match
                lst_embed.push(embedMessage_match(null, null, null, null, data.matchs[i])) //On ajoute l'embed à la liste
            }
            if (lst_embed.length == 0) { //Si il n'y a pas de matchs
                interaction.reply(`Il n'y a pas de matchs enregistrés !`); //On envoie un message d'erreur
                return;
            }
            interaction.reply({ embeds: [...lst_embed] }); //On envoie les embeds
        }
        else if (command == 'map') { //Si la sous-commande est 'map'
            const map = interaction.options.getString('map'); //On récupère la map
            let maps = []; //Liste des matchs de la map
            for (let i = 0; i < data.matchs.length; i++) { //Pour chaque match
                if (data.matchs[i].map == map) { //Si la map est la bonne
                    maps.push(data.matchs[i]); //On ajoute le match à la liste
                }
            }
            if (maps.length == 0) { //Si il n'y a pas de matchs
                interaction.reply(`Il n'y a pas de matchs enregistrés pour cette map !`); //On envoie un message d'erreur
                return;
            }
            let i = 0;
            if (maps.length > 10) { // Si il y a plus de 10 matchs
                i = maps.length - 10; // On affiche les 10 derniers matchs (parce que la limite est de 10 embeds)
            }
            for (i; i < maps.length; i++) { //Pour chaque match
                lst_embed.push(embedMessage_match(null, null, null, null, maps[i])) //On ajoute l'embed à la liste
            }
            interaction.reply({ embeds: [...lst_embed] }); //On envoie les embeds
        }


    }
}