const Interaction = require("../../Structures/Interaction");
const Discord = require("discord.js");
const axios = require("axios");

module.exports = class extends Interaction {
    constructor(...args) {
        super(...args, {
            name: "docs",
            description: "Show an information from Discord.js Official Document Website.",
            options: [{
                name: "query",
                type: "STRING",
                description: "Please provide a valid query.",
                required: true
            }, {
                name: "source",
                type: "STRING",
                description: "Please select the branch you want.",
                required: false,
                choices: [{
                    name: "Stable",
                    value: "stable"
                }, {
                    name: "Master",
                    value: "master"
                }]
            }]
        });
    }

    async run(interaction, [query, source = "stable"]) {
        const header = {
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        };

        const data = await axios.get(
            `https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${encodeURIComponent(query)}`, {
                headers
            }).then(res => res.data)

        if (!data || data.error) {
            return interaction.reply({
                content: 'The query that you want to find didn\'t found!',
                ephemeral: true
            });
        }

        const embed = new Discord.MessageEmbed(data)
            .setAuthor(data.author.name, 'https://discord.js.org/favicon-32x32.png', data.author.url)
            .setColor(0x9c89b8)
            .setFooter(`Responded in ${this.client.utils.responseTime(interaction)} | Powered by Discord.js`, 'https://discord.js.org/favicon-32x32.png');

        return interaction.reply({
            embeds: [embed]
        });
    }
};