const { EmbedBuilder } = require('discord.js');

function create_game_data_embed(data) {
    //console.log(data)
    let footer = data.etat === "Partie en cours" ? "La partie est en cours" : "La partie est terminée",
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
        .setImage("https://cdn.discordapp.com/attachments/1203462039515828346/1206349537992769596/DALLE_2024-02-11_22.17.06.png?ex=65dbaf8e&is=65c93a8e&hm=78623feb33fc0e49650fb7ea455bdebd01d55fe83714aa0f63081637fdb7b74d&")
        .setFooter({ text: footer });
}


module.exports = { create_game_data_embed };