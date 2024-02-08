const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, ButtonBuilder } = require('discord.js');
const request = require("request");

var collectors = []

module.exports = {
    data: new SlashCommandBuilder()
        .setName("question")
        .setDescription("Répondez à une question de culture générale"),
    run: async (client, interaction) => {
        var points = { "-1": -1, "1": 1, "2": 2, "3": 3 }

        var date_today = new Date();
        var today = date_today.getDate() + '/' + (date_today.getMonth() + 1) + '/' + date_today.getFullYear();
        var time = date_today.getHours() + ":" + date_today.getMinutes() + ":" + date_today.getSeconds();
        var dateTime = today + ' ' + time;

        if (collectors[interaction.user.id] == true) {
            interaction.reply({ content: "Vous avez déjà une question en cours !", ephemeral: true })
            return;
        }

        collectors[interaction.user.id] = true;
        await new Promise((resolve, reject) => {
            request.get(`http://127.0.0.1:5500/api/questions`, (error, response, body) => {
                if (error) {
                    reject(error)
                    interaction.reply("Une erreur est survenue, code erreur : 1")
                } else {
                    resolve(body)
                    var response = JSON.parse(body)
                    var max_questions = response.length
                    var random_question = Math.floor(Math.random() * max_questions)
                    var question = response[random_question]

                    var date = new Date()
                    var date_plus_15_secondes = new Date(date.getTime() + 15000)

                    if (max_questions == 0) {
                        interaction.reply({ content: "Il y a eu une erreur, reessayez ", ephemeral: true })
                        return;
                    }

                    var question_label = question[1]
                    console.log("Question : " + question_label)
                    var reponse = question[2]
                    var categorie = question[3]
                    var difficulté = question[4]
                    var choix_reponse = question[5]
                    try {
                        if (choix_reponse != null) {
                            var choix_reponse_array = choix_reponse.split(";")

                            choix_reponse_array = choix_reponse_array.sort(() => Math.random() - 0.5)
                            var choix_reponse_1 = choix_reponse_array[0]
                            var choix_reponse_2 = choix_reponse_array[1]
                            var choix_reponse_3 = choix_reponse_array[2]
                            var choix_reponse_4 = choix_reponse_array[3]
                        }
                    } catch (e) {
                        collectors[interaction.user.id] = false;
                        interaction.reply({ content: "Il y a eu une erreur, reessayez ", ephemeral: true })
                        console.log(e)
                        return;
                    }

                    var name_diff = ""
                    if (difficulté == 1) {
                        name_diff = "Facile"
                    } else if (difficulté == 2) {
                        name_diff = "Moyen"
                    } else if (difficulté == 3) {
                        name_diff = "Difficile"
                    }

                    if (choix_reponse == null) {
                        reponse = reponse.toLowerCase()
                        var embed = {
                            color: 0x4EB4D0,
                            title: 'Question',
                            description: `**${question_label}** \nTemps restant <t:${Math.floor(date_plus_15_secondes.getTime() / 1000)}:R>`,
                            fields: [
                                {
                                    name: 'Difficulté',
                                    value: name_diff,
                                    inline: false,
                                },
                                {
                                    name: 'Catégorie',
                                    value: categorie,
                                    inline: false
                                }
                            ],
                            timestamp: new Date(),
                        };
                        interaction.reply({ embeds: [embed] })

                        var filter = m => m.author.id === interaction.user.id;
                        interaction.channel.awaitMessages({ filter, time: 15000, max: 1 }).then(collected => {
                            collectors[interaction.user.id] = false;
                            if (collected.size == 0) {
                                var embed = {
                                    color: 0x4EB4D0,
                                    title: 'Question',
                                    description: `**${question_label}**`,
                                    timestamp: new Date(),
                                    footer: {
                                        text: `Vous n'avez pas répondu à la question !`
                                    }
                                };
                                interaction.editReply({ embeds: [embed] })
                            } else {
                                if ((collected.first().content).toLowerCase() == reponse) {
                                    update_points(difficulté)
                                    var embed = {
                                        color: 0x4EB4D0,
                                        title: 'Question',
                                        description: `**${question_label}**`,
                                        timestamp: new Date(),
                                        footer: {
                                            text: `Vous avez répondu correctement à la question !`
                                        }
                                    };
                                    interaction.editReply({ embeds: [embed] })
                                    collected.first().react('✅')
                                } else {
                                    update_points(difficulté, "-1")
                                    var embed = {
                                        color: 0x4EB4D0,
                                        title: 'Question',
                                        description: `**${question_label}** \nLa bonne réponse était : ${reponse}`,
                                        timestamp: new Date(),
                                        footer: {
                                            text: `Vous avez répondu incorrectement à la question !`
                                        }
                                    };
                                    interaction.editReply({ embeds: [embed] })
                                    collected.first().react('❌')
                                }
                            }
                        })
                    } else {

                        var embed = {
                            color: 0x4EB4D0,
                            title: 'Question',
                            description: `**${question_label}** \nTemps restant <t:${Math.floor(date_plus_15_secondes.getTime() / 1000)}:R>`,
                            fields: [
                                {
                                    name: 'Difficulté',
                                    value: name_diff,
                                    inline: false,
                                },
                                {
                                    name: 'Catégorie',
                                    value: categorie,
                                    inline: false
                                },
                                {
                                    name: 'Choix de réponses',
                                    value: `- ${choix_reponse_1}\n- ${choix_reponse_2}\n- ${choix_reponse_3}\n- ${choix_reponse_4}`,
                                    inline: true
                                },
                            ],
                            timestamp: new Date(),
                        };

                        var button1 = new ButtonBuilder()
                            .setCustomId(choix_reponse_1)
                            .setLabel(choix_reponse_1)
                            .setStyle('Primary');
                        var button2 = new ButtonBuilder()
                            .setCustomId(choix_reponse_2)
                            .setLabel(choix_reponse_2)
                            .setStyle('Primary');
                        var button3 = new ButtonBuilder()
                            .setCustomId(choix_reponse_3)
                            .setLabel(choix_reponse_3)
                            .setStyle('Primary');
                        var button4 = new ButtonBuilder()
                            .setCustomId(choix_reponse_4)
                            .setLabel(choix_reponse_4)
                            .setStyle('Primary');

                        interaction.reply({ embeds: [embed], components: [{ type: 1, components: [button1, button2, button3, button4] }] })

                        var filter = i => i.user.id === interaction.user.id;
                        var collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

                        collector.on('collect', async i => {
                            collector.stop()
                            collectors[interaction.user.id] = false;

                            if (i.user.bot) return;

                            if (choix_reponse_1 == i.customId) {
                                choix_reponse_1_gras = `**${choix_reponse_1}**`
                                choix_reponse_2_gras = choix_reponse_2
                                choix_reponse_3_gras = choix_reponse_3
                                choix_reponse_4_gras = choix_reponse_4
                            } else if (choix_reponse_2 == i.customId) {
                                choix_reponse_1_gras = choix_reponse_1
                                choix_reponse_2_gras = `**${choix_reponse_2}**`
                                choix_reponse_3_gras = choix_reponse_3
                                choix_reponse_4_gras = choix_reponse_4
                            } else if (choix_reponse_3 == i.customId) {
                                choix_reponse_1_gras = choix_reponse_1
                                choix_reponse_2_gras = choix_reponse_2
                                choix_reponse_3_gras = `**${choix_reponse_3}**`
                                choix_reponse_4_gras = choix_reponse_4
                            } else if (choix_reponse_4 == i.customId) {
                                choix_reponse_1_gras = choix_reponse_1
                                choix_reponse_2_gras = choix_reponse_2
                                choix_reponse_3_gras = choix_reponse_3
                                choix_reponse_4_gras = `**${choix_reponse_4}**`
                            }

                            var correctEmoji = '✅';
                            var incorrectEmoji = '❌';

                            if (i.customId == reponse) {
                                update_points(difficulté)
                                var embed = {
                                    color: 0x4EB4D0,
                                    title: 'Question',
                                    description: `**${question_label}**`,
                                    fields: [
                                        {
                                            name: 'Choix de réponses',
                                            value:
                                                `- ${choix_reponse_1 === reponse ? `${correctEmoji}` : `${incorrectEmoji}`} ${choix_reponse_1_gras}\n` +
                                                `- ${choix_reponse_2 === reponse ? `${correctEmoji}` : `${incorrectEmoji}`} ${choix_reponse_2_gras}\n` +
                                                `- ${choix_reponse_3 === reponse ? `${correctEmoji}` : `${incorrectEmoji}`} ${choix_reponse_3_gras}\n` +
                                                `- ${choix_reponse_4 === reponse ? `${correctEmoji}` : `${incorrectEmoji}`} ${choix_reponse_4_gras}`,
                                            inline: true
                                        },
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        text: `Vous avez répondu correctement à la question !`
                                    }
                                };
                                await i.update({ embeds: [embed], components: [] })
                            } else {
                                update_points(difficulté, "-1")
                                if (choix_reponse_1 == i.customId) {
                                    choix_reponse_1_gras = `**${choix_reponse_1}**`
                                    choix_reponse_2_gras = choix_reponse_2
                                    choix_reponse_3_gras = choix_reponse_3
                                    choix_reponse_4_gras = choix_reponse_4
                                } else if (choix_reponse_2 == i.customId) {
                                    choix_reponse_1_gras = choix_reponse_1
                                    choix_reponse_2_gras = `**${choix_reponse_2}**`
                                    choix_reponse_3_gras = choix_reponse_3
                                    choix_reponse_4_gras = choix_reponse_4
                                } else if (choix_reponse_3 == i.customId) {
                                    choix_reponse_1_gras = choix_reponse_1
                                    choix_reponse_2_gras = choix_reponse_2
                                    choix_reponse_3_gras = `**${choix_reponse_3}**`
                                    choix_reponse_4_gras = choix_reponse_4
                                } else if (choix_reponse_4 == i.customId) {
                                    choix_reponse_1_gras = choix_reponse_1
                                    choix_reponse_2_gras = choix_reponse_2
                                    choix_reponse_3_gras = choix_reponse_3
                                    choix_reponse_4_gras = `**${choix_reponse_4}**`
                                }

                                var embed = {
                                    color: 0x4EB4D0,
                                    title: 'Question',
                                    description: `**${question_label}**`,
                                    fields: [
                                        {
                                            name: 'Choix de réponses',
                                            value:
                                                `- ${choix_reponse_1 === reponse ? `${correctEmoji}` : `${incorrectEmoji}`} ${choix_reponse_1_gras}\n` +
                                                `- ${choix_reponse_2 === reponse ? `${correctEmoji}` : `${incorrectEmoji}`} ${choix_reponse_2_gras}\n` +
                                                `- ${choix_reponse_3 === reponse ? `${correctEmoji}` : `${incorrectEmoji}`} ${choix_reponse_3_gras}\n` +
                                                `- ${choix_reponse_4 === reponse ? `${correctEmoji}` : `${incorrectEmoji}`} ${choix_reponse_4_gras}`,
                                            inline: true
                                        },
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        text: `Vous avez répondu incorrectement à la question !`
                                    }
                                };
                                await i.update({ embeds: [embed], components: [] })
                            }
                        });

                        collector.on('end', collected => {
                            collectors[interaction.user.id] = false;
                            if (collected.size == 0) {
                                var embed = {
                                    color: 0x4EB4D0,
                                    title: 'Question',
                                    description: `**${question_label}**`,
                                    fields: [
                                        {
                                            name: 'Choix de réponses',
                                            value: `- ${choix_reponse_1}\n- ${choix_reponse_2}\n- ${choix_reponse_3}\n- ${choix_reponse_4}`,
                                            inline: true
                                        },
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        text: `Vous n'avez pas répondu à la question !`
                                    }
                                };
                                interaction.editReply({ embeds: [embed], components: [] })
                            }
                        });
                    }
                }
            })
        })


        function update_points(difficulté, perd_point) {
            if (perd_point == "-1") {
                points[difficulté] = -1
            } else {
                points[difficulté] = points[difficulté]
            }
            new Promise((resolve, reject) => {
                request.post(`http://127.0.0.1:5500/api/stats/update_user`, {
                    json: {
                        user_id: interaction.user.id,
                        points: points[difficulté],
                        difficulte: difficulté,
                        date: dateTime
                    }
                }, (error, response, body) => {
                    if (error) {
                        reject(error);
                        interaction.reply("Une erreur est survenue, code erreur : 3");
                        console.log(error)
                    }
                });
            });
        }
    }
}