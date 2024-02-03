const { SlashCommandBuilder } = require('discord.js'); //Importation de la librairie discord.js
const fs = require('fs'); //Importation de la librairie fs (file system)
const { embedMessage_match } = require('../embed_message_match.js'); //Importation de la fonction embedMessage_match
const { lst_maps, lst_joueurs } = require('../const_joueurs_maps.js'); //Importation de la liste des maps et des joueurs

module.exports = { //Exportation de la commande
    data: new SlashCommandBuilder() //On définit les paramètres de la commande
        .setName('add_match') 
        .setDescription('Ajoute un match à la liste des matchs.')
        .addStringOption(option =>
            option
                .setName('map')
                .setChoices(...lst_maps)
                .setDescription('La map jouée (exemple : Mirage)')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('durée')
                .setDescription('La durée du match (exemple en minute: 35)')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('date')
                .setDescription('La date du match (exemple : 25/03/2021)')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('heure')
                .setDescription('L\'heure du match (exemple : 09:41)')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('joueur1')
                .setChoices(...lst_joueurs)
                .setDescription('Le premier joueur')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('joueur2')
                .setChoices(...lst_joueurs)
                .setDescription('Le deuxième joueur')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('joueur3')
                .setChoices(...lst_joueurs)
                .setDescription('Le troisième joueur')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('joueur4')
                .setChoices(...lst_joueurs)
                .setDescription('Le quatrième joueur')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('joueur5')
                .setChoices(...lst_joueurs)
                .setDescription('Le cinquième joueur')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('score_team_chimu')
                .setDescription('Le score de notre team (exemple : 13)')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('score_équipe_2')
                .setDescription('Le score de l\'èquipe 2 (exemple : 10)')
                .setRequired(true)),

    execute(interaction) { //On définit l'exécution de la commande
        console.log(interaction.channelId)
        if (interaction.channelId != '1120670600797638666' && interaction.channelId != '1166735673777205380') { interaction.reply({ content: 'Les commandes ne sont pas autorisées dans ce channel !', ephemeral: true }); return; } //Si la commande n'est pas exécutée dans le channel #matchs, on ne fait rien
        const map = interaction.options.getString('map');
        const durée = interaction.options.getNumber('durée');
        const date = interaction.options.getString('date');
        const heure = interaction.options.getString('heure');
        const joueur1 = interaction.options.getString('joueur1');
        const joueur2 = interaction.options.getString('joueur2');
        const joueur3 = interaction.options.getString('joueur3');
        const joueur4 = interaction.options.getString('joueur4');
        const joueur5 = interaction.options.getString('joueur5');
        const score_team_chimu = interaction.options.getNumber('score_team_chimu');
        const score_équipe_2 = interaction.options.getNumber('score_équipe_2');
        var team_member = {};

        //Verifivation des variables
        if (durée <= 0) { //Si la durée est inférieure ou égale à 0
            interaction.reply(`La durée du match doit être supérieur à 0 !`);
            return;
        } 
        if (durée > 120) { //Si la durée est supérieure à 120
            interaction.reply(`La durée du match doit être inférieur à 120 minutes !`);
            return;
        }
        if (date.length != 10) { //Si la date n'est pas au format jj/mm/aaaa
            interaction.reply(`La date doit être au format jj/mm/aaaa !`);
            return;
        }
        if (date.length == 10) { //Si la date est au format jj/mm/aaaa
            if (date[2] != '/' || date[5] != '/') {
                interaction.reply(`La date doit être au format jj/mm/aaaa !`);
                return;
            }
            if (isNaN(date[0]) || isNaN(date[1]) || isNaN(date[3]) || isNaN(date[4]) || isNaN(date[6]) || isNaN(date[7]) || isNaN(date[8]) || isNaN(date[9])) { //Si la date n'est pas au format jj/mm/aaaa
                interaction.reply(`La date doit être au format jj/mm/aaaa !`);
                return;
            }
            else { //Si la date est au format jj/mm/aaaa
                if (date[0] + date[1] > 31 || date[0] + date[1] < 1 || date[3] + date[4] > 12 || date[3] + date[4] < 1 || date[6] + date[7] + date[8] + date[9] < 2021) {
                    interaction.reply(`La date doit être au format jj/mm/aaaa !`);
                    return;
                }
            }
        }
        if (heure.length != 5) { //Si l'heure n'est pas au format hh:mm
            interaction.reply(`L'heure doit être au format hh:mm !`);
            return;
        }
        if (heure[2] != ':') { //Si l'heure n'est pas au format hh:mm
            interaction.reply(`L'heure doit être au format hh:mm !`);
            return;
        }
        if (heure[0] + heure[1] > 23 || heure[0] + heure[1] < 0 || heure[3] + heure[4] > 59 || heure[3] + heure[4] < 0) { //Si l'heure n'est pas au format hh:mm
            interaction.reply(`L'heure doit être au format hh:mm !`);
            return;
        }
        if (score_team_chimu < 0 || score_team_chimu > 16) { //Si le score de notre team est inférieur à 0 ou supérieur à 16
            interaction.reply(`Le score de notre team doit être compris entre 0 et 16 !`);
            return;
        }
        if (score_équipe_2 < 0 || score_équipe_2 > 16) { //Si le score de l'équipe 2 est inférieur à 0 ou supérieur à 16
            interaction.reply(`Le score de l'équipe 2 doit être compris entre 0 et 16 !`);
            return;
        }

        const file = fs.readFileSync('data_matchs.json'); //Lecture du fichier data_matchs.json
        const data = JSON.parse(file); //Conversion du fichier data_matchs.json en objet JS

        //Sécurité pour l'attribution de l'id
        if (data.matchs.length == 0) { //Si il n'y a pas de match
            var id = 0;
        }
        else { //Si il y a au moins un match
            for (let i = 0; i < data.matchs.length; i++) { //Pour chaque match
                var id = data.matchs[i].id + 1;
            }
        }


        // Vérification de l'existence du match
        for (let i = 0; i < data.matchs.length; i++) { //Pour chaque match
            if (data.matchs[i].map == map && data.matchs[i].date == date && data.matchs[i].heure == heure) { // Si le match existe déjà

                interaction.reply({
                    embeds: [
                        embedMessage_match('#fdff00', 'Match déjà existant', null, 'Le match existe déjà !', data.matchs[i])]
                });
                return;
            }
        }
        // Si le match n'existe pas
        team_member = { joueur1: { nom: joueur1, k: null, d: null, a: null }, joueur2: { nom: joueur2, k: null, d: null, a: null }, joueur3: { nom: joueur3, k: null, d: null, a: null }, joueur4: { nom: joueur4, k: null, d: null, a: null }, joueur5: { nom: joueur5, k: null, d: null, a: null } };
        const match = { id, map, durée, date, heure, team_member, score_team_chimu, score_équipe_2, lock: false };

        data.matchs.push(match); //On ajoute le match au fichier data_matchs.json
        const json = JSON.stringify(data); //Conversion de l'objet JS en fichier JSON
        fs.writeFileSync('data_matchs.json', json); //Ecriture du fichier data_matchs.json
        interaction.reply({
            embeds: [
                embedMessage_match('#0078ff', 'Match ajouté', null, 'Le match a bien été ajouté !', data.matchs[data.matchs.length - 1])]
        });
    }
}