const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); //Importation de la librairie discord.js
const fs = require('fs'); //Importation de la librairie fs (file system)


module.exports = { //Exportation de la commande
    data: new SlashCommandBuilder() //On définit les paramètres de la commande
        .setName("patch_note")
        .setDescription("Affiche le dernier patch note")
        .addNumberOption(option =>
            option
                .setName('id')
                .setDescription('L\'id du patch note')
                .setRequired(false)),

    execute(interaction) { //On définit le code à exécuter
        var id = interaction.options.getNumber('id');
        const file = fs.readFileSync('./patch_notes_lst.json'); //Lecture du fichier data_matchs.json
        const data = JSON.parse(file); //Conversion du fichier data_matchs.json en objet JS
        if(id == undefined) { id = data.patch_notes.length - 1 } //Si l'id n'est pas défini, on prend le dernier patch note
        for (let i = 0; i < data.patch_notes.length; i++) { //Pour chaque patch note
            if (id == data.patch_notes[i].id) { //Si l'id correspond
                interaction.reply({ //On envoie le patch note
                    embeds: [new EmbedBuilder() //On crée l'embed
                        .setColor('#0099ff') //On définit la couleur de l'embed
                        .setTitle(data.patch_notes[i].title) //On définit le titre de l'embed
                        .setDescription(data.patch_notes[i].note) //On définit la description de l'embed
                        .setTimestamp() //On définit le timestamp de l'embed
                        .setFooter({ text: data.patch_notes[i].auteur, iconURL: data.patch_notes[i].iconURL }) //On définit le footer de l'embed
                    ]
                });
                return;
            }
        }
        interaction.reply("L'id n'existe pas");return //Si l'id ne correspond à aucun patch note, on envoie un message d'erreur
    }
}




