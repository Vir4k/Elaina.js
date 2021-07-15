const Command = require("../../../Structures/Command");
const Discord = require("discord.js");
const { colors } = require("../../../Structures/Configuration");
const nekos = require("nekos.life");
const { sfw: { baka }, } = new nekos();

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: "Reaction of B~Baka!",
            category: "Ïmages"
        });
    }

    async run(message) {
        const { url } = await baka().catch(() => { });

        if (!url) return message.reply(`Couldn't connect to nekos.life`);

        const embed = new Discord.MessageEmbed();
        if (
            message.mentions.members.size &&
            message.mentions.members.first().id === this.client.user.id
        ) {
            return message.reply("Please mention who you want to baka!");
        } else if (
            message.mentions.members.size &&
            message.mentions.members.first().id === message.author.id
        ) {
            return message.reply(`Seriously?`);
        } else if (message.mentions.members.size) {
            return message.reply(
                embed
                    .setColor(0x9c89b8)
                    .setImage(url)
                    .setDescription(`${message.mentions.members.first()} B~baka!`)
            );
        } else
            return message.reply(
                embed.setColor(0x9c89b8).setImage(url)
            );
    }
};