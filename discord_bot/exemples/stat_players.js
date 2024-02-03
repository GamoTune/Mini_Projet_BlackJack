const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); //Importation de la librairie discord.js
const fs = require('fs'); //Importation de la librairie fs (file system)
const file = fs.readFileSync('data_players.json'); //Lecture du fichier data_players.json
const data = JSON.parse(file); //Conversion du fichier data_players.json en objet JS
const { lst_pp, lst_joueurs } = require('../const_joueurs_maps.js'); //Importation de la liste des joueurs

module.exports = { //Exportation de la commande
    data: new SlashCommandBuilder() //On définit les paramètres de la commande
        .setName('stat_players')
        .setDescription('Affiche les statistiques des joueurs')
        .addStringOption(option =>
            option
                .setName('joueur')
                .setChoices(...lst_joueurs)
                .setDescription('Le joueur')
                .setRequired(false)),
    execute(interaction) { //On définit le code à exécuter
        var lst_embed = [];
        const joueur = interaction.options.getString('joueur'); //On récupère le joueur
        if (!joueur) { //Si le joueur n'est pas défini
            for (let i in data.joueurs) { //Pour chaque joueur
                var player = data.joueurs[i]; //On récupère les stats du joueur
                for (let j = 0; j < lst_pp.length; j++) { //On parcourt la liste des joueurs
                    if (lst_pp[j].name == player.nom) { //Si le joueur est trouvé
                        var pp = lst_pp[j].pp; //On récupère le lien de l'image de profil
                    }
                }
                lst_embed.push( //On ajoute l'embed à la liste des embeds à envoyer
                    new EmbedBuilder() //On crée l'embed
                        .setColor(player.hex) //On définit la couleur de l'embed
                        .setTitle("Statistiques de " + player.nom) //On définit le titre de l'embed
                        .setThumbnail(pp) //On définit l'image de profil du joueur
                        .setFields( //On définit les champs de l'embed
                            { name: 'Kills', value: String(player.stat.k), inline: true },
                            { name: 'Deaths', value: String(player.stat.d), inline: true },
                            { name: 'Assists', value: String(player.stat.a), inline: true }
                        )
                )
            }
            interaction.reply({ embeds: [...lst_embed] }); //On envoie les embeds
        }
        else { //Si le joueur est défini
            for (let i in data.joueurs) { //Pour chaque joueur
                var player = data.joueurs[i]; //On récupère les stats du joueur
                if (player.nom == joueur) { //Si le joueur est trouvé 
                    for (let j = 0; j < lst_pp.length; j++) { //On parcourt la liste des joueurs 
                        if (lst_pp[j].name == player.nom) { //Si le joueur est trouvé
                            var pp = lst_pp[j].pp; //On récupère le lien de l'image de profil
                        }
                    }
                    interaction.reply({ //On envoie l'embed
                        embeds: [
                            new EmbedBuilder() //On crée l'embed
                                .setColor(player.hex) //On définit la couleur de l'embed
                                .setTitle("Statistiques de " + player.nom) //On définit le titre de l'embed
                                .setThumbnail(pp) //On définit l'image de profil du joueur
                                .setFields( //On définit les champs de l'embed
                                    { name: 'Kills', value: String(player.stat.k), inline: true },
                                    { name: 'Deaths', value: String(player.stat.d), inline: true },
                                    { name: 'Assists', value: String(player.stat.a), inline: true }
                                )
                        ]
                    })
                }
            }
        }

    }
}