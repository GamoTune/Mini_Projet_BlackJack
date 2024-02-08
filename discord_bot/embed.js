const { EmbedBuilder } = require('discord.js');

function create_game_data_embed(data) {
    let status = data.Winner,
        dealer = data.Dealer,
        player = data.Player,
        color = "Blue",
        title = "Blackjack",
        description = "Partie en cours",
        fields = [];
    if (status == "") {
        fields.push({
            name: "Dealer",
            value: "Bot",
            inline: true
        });
        fields.push({
            name: "Cards",
            value: dealer.cards.join("\n"),
            inline: true
        });
        fields.push({
            name: "Score",
            value: String(dealer.score),
            inline: true
        });

        fields.push({
            name: "Player",
            value: "You",
            inline: true
        });
        fields.push({
            name: "Cards",
            value: player.cards.join("\n"),
            inline: true
        });
        fields.push({
            name: "Score",
            value: String(player.score),
            inline: true
        });


        return new EmbedBuilder()
            .setTitle(title)
            .setColor(color)
            .setDescription(description)
            .addFields(fields)
            .setTimestamp();
    }
}

module.exports = { create_game_data_embed };