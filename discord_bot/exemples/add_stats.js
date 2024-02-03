const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); //Importation de la librairie discord.js
const fs = require('fs'); //Importation de la librairie fs (file system)
const { lst_joueurs, lst_pp } = require('../const_joueurs_maps.js'); //Importation de la liste des joueurs
const { calcul_moyennes } = require('../calcul_moyennes.js'); //Importation de la fonction calcul_moyennes


function find_pp(joueur) { //Fonction pour trouver le lien de l'image de profil d'un joueur
    for (let i = 0; i < lst_pp.length; i++) { //On parcourt la liste des joueurs
        if (lst_pp[i].name == joueur) { //Si le joueur est trouvé
            return lst_pp[i].pp; //On retourne le lien de l'image de profil
        }
    }
}


module.exports = { //Exportation de la commande
    data: new SlashCommandBuilder() //On définit les paramètres de la commande
        .setName('add_stats')
        .setDescription('Ajoute des données à un match')
        .addStringOption(option =>
            option
                .setName('id')
                .setDescription('L\'id du match')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('joueur')
                .setChoices(...lst_joueurs)
                .setDescription('Le joueur')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('kills')
                .setDescription('Le nombre de kills du joueur')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('deaths')
                .setDescription('Le nombre de deaths du joueur')
                .setRequired(true))
        .addNumberOption(option =>
            option
                .setName('assists')
                .setDescription('Le nombre d\'assists du joueur')
                .setRequired(true)),

    execute(interaction) { //On définit le code à exécuter
        if (interaction.channelId != '1120670600797638666' && interaction.channelId != '1166735673777205380') { interaction.reply({ content: 'Les commandes ne sont pas autorisées dans ce channel !', ephemeral: true }); return; } // Si la commande n'est pas exécutée dans le channel #bot-commands ou #test-bot-commands, on ne fait rien
        const id = interaction.options.getString('id');
        const joueur = interaction.options.getString('joueur');
        const kills = interaction.options.getNumber('kills');
        const deaths = interaction.options.getNumber('deaths');
        const assists = interaction.options.getNumber('assists');

        //Verifivation des variables
        if (id < 0) { //Si l'id est inférieur à 0
            interaction.reply(`L'id du match doit être supérieur ou egale à 0 !`);
            return;
        }
        if (-10 > kills > 50) { //Si le nombre de kills est inférieur à 0 ou supérieur à 50
            interaction.reply(`Le nombre de kills doit être compris entre 0 et 50 !`);
            return;
        }
        if (0 > deaths > 30 || 0 > assists > 30) { //Si le nombre de deaths ou d'assists est inférieur à 0 ou supérieur à 30
            interaction.reply(`Le nombre de deaths et d'assists doit être compris entre 0 et 30 !`);
            return;
        }



        const file = fs.readFileSync('data_matchs.json'); //On lit le fichier data_matchs.json
        const data = JSON.parse(file); //On parse le fichier data_matchs.json

        // Vérification de l'existence du match
        for (let i = 0; i < data.matchs.length; i++) { //Pour chaque match
            if (data.matchs[i].id == id) { // Si le match existe
                if (data.matchs[i].lock) { // Si le match est verrouillé
                    interaction.reply(`Le match (${id}) est verrouillé et ne peut pas être modifié !`)
                    return;
                }
                for (let j in data.matchs[i].team_member) { //Pour chaque joueur
                    if (data.matchs[i].team_member[j].nom == joueur) { // Si le joueur existe
                        data.matchs[i].team_member[j].k = kills; //On ajoute les stats
                        data.matchs[i].team_member[j].d = deaths;
                        data.matchs[i].team_member[j].a = assists;
                        const json = JSON.stringify(data); //On transforme les données en JSON
                        fs.writeFileSync('data_matchs.json', json); //On écrit les données dans le fichier data_matchs.json
                        interaction.reply({ //On envoie un message de confirmation
                            embeds: [
                                new EmbedBuilder() //On crée un embed
                                    .setColor('#0078ff') //On définit la couleur de l'embed
                                    .setTitle('Stats ajoutées') //On définit le titre de l'embed
                                    .setThumbnail(find_pp(joueur)) //On définit l'image de profil du joueur
                                    .setFields( //On définit les champs de l'embed
                                        { name: 'Joueur', value: joueur, inline: true },
                                        { name: '\n', value: '\n', inline: false },
                                        { name: 'Kills', value: String(kills), inline: true },
                                        { name: 'Deaths', value: String(deaths), inline: true },
                                        { name: 'Assists', value: String(assists), inline: true },
                                    )
                                    .setTimestamp() //On définit la date de l'embed
                                    .setFooter({ text: 'Match ID : ' + String(id) })] //On définit le footer de l'embed
                        });
                        calcul_moyennes(); //On calcule les moyennes des joueurs
                        return;
                    }
                }
            }
        }
        interaction.reply(`Le match (${id}) ou le joueur (${joueur}) n'existe pas !`);
        return;
    }
};
