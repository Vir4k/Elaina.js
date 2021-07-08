const {
    Collection,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const Event = require("../../Structures/Event");

module.exports = class extends Event {
    async run(message) {
        const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
        const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

        if (!message.guild || message.author.bot) return;
        if (message.content.match(mentionRegex)) {
            const row = new MessageActionRow()
                .addComponents(new MessageButton()
                    .setStyle("LINK")
                    .setLabel("Vote me!")
                    .setURL(`https://top.gg/bot/${this.client.user.id}`))
                .addComponents(new MessageButton()
                    .setStyle("LINK")
                    .setLabel("Invite me!")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=2013654135&scope=bot%20applications.commands`));

            return message.reply({
                content: [
                    `Hi, my prefix for this guild is \`${prefix}\`.`,
                    `Use \`${prefix}help\` to get a list of commands!`
                ].join("\n"),
                components: [row]
            });
        }

        const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

        if (!message.content.startsWith(prefix)) return;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (command) {
            command.run(message, args);
        }
    }
};
