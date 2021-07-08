const Discord = require("discord.js");
const Command = require("../Structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["pong"],
            description: "Provides the ping of the bot.",
            category: "Utilities"
        });
    }

    async run(message) {
        const latency = Math.round(Date.now() - message.createdTimestamp);

        if (latency <= 0) {
            return message.reply("Please try again later!");
        } else {
            return message.reply([
                `**<:message:798534647956766743> Message:** \`${latency}ms\``,
                `**<:WebSocket:786446576536125441> WebSocket:** \`${Math.round(this.client.ws.ping)}ms\``
            ].join("\n"))
        }
    }
};