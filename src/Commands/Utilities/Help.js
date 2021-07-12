const Discord = require("discord.js");
const Command = require("../../Structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["?"],
            description: "Displays all the commands in the bot",
            category: "Utilities",
            usage: '[command]'
        });
    }

    async run(message, [command]) {
        const prefix = this.client.prefix;

        const embed = new Discord.MessageEmbed()
            .setColor(0x9c89b8)
            .setAuthor(`${this.client.user.username}'s Commands`)
            .setThumbnail(this.client.user.displayAvatarURL({
                dynamic: true,
                size: 512
            }))
            .setTimestamp(new Date())
            .setFooter(`Responded in ${this.client.utils.responseTime(message)}`, message.author.avatarURL({
                dynamic: true
            }));

        if (command) {
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

            if (!cmd) return message.reply(`Invalid Command named. \`${command}\``);

            embed.setAuthor(`Command: ${cmd.name.toProperCase()}`, 'https://i.imgur.com/YxoUvH8.png');
            embed.setDescription([
                `Command Parameters: \`[]\` is required & \`()\` is optional\n`,
                `***Aliases:*** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No aliases.'}`,
                `***Description:*** ${cmd.description}`,
                `***Category:*** ${cmd.category}`,
                `***Usage:*** ${cmd.usage ? `\`${prefix + cmd.name} ${cmd.usage}\`` : `\`${prefix + cmd.name}\``}`
            ].join('\n'));

            return message.reply({
                embeds: [embed]
            });
        } else {
            embed.setDescription([
                `These are the available commands for ${this.client.user.username}.`,
                `Do you need more help? Come join our [guild](https://dsc.gg/elaina)`,
                `${this.client.user.username}'s prefix is: \`${prefix}\``
            ].join('\n'));
            embed.setTimestamp(new Date())
            embed.setFooter(`Responded in ${this.client.utils.responseTime(message)} | ${this.client.commands.size} commands`, message.author.avatarURL({
                dynamic: true
            }));

            const categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));

            for (const category of categories) {
                const dir = this.client.commands.filter(cmd => cmd.category === category);
                if (this.client.utils.categoryCheck(category, message)) {
                    embed.addField(`__${category}__ (${dir.size})`, this.client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(', '));
                }
            }

            return message.reply({
                embeds: [embed]
            });
        }
    }

};