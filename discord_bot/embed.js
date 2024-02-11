const { EmbedBuilder } = require('discord.js');

function create_game_data_embed(data) {
    //console.log(data)
    let footer = data.etat === "en_cours" ? "La partie est en cours" : "La partie est terminée",
        fields = [];
    fields.push({
        name: "Joueur",
        value: "Vous",
        inline: true
    });
    fields.push({
        name: "Cartes",
        value: data.joueur.cartes.join("\n"),
        inline: true
    });
    fields.push({
        name: "Score",
        value: String(data.joueur.score),
        inline: true
    });

    fields.push({
        name: "Banque",
        value: "Bot",
        inline: true
    });
    fields.push({
        name: "Cartes",
        value: data.banque.cartes.join("\n"),
        inline: true
    });
    fields.push({
        name: "Score",
        value: String(data.banque.score),
        inline: true
    });


    return new EmbedBuilder()
        .setTitle("Blackjack")
        .setColor("Blue")
        .setDescription(data.etat)
        .addFields(fields)
        .setTimestamp()
        .setFooter({ text: footer });
}


module.exports = { create_game_data_embed };