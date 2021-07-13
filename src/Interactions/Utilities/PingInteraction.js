const Interaction = require('../../Structures/Interaction.js');

module.exports = class extends Interaction {
    constructor(...args) {
        super(...args, {
            name: 'ping',
            description: 'Shows Bot latency & API response time.'
        });
    }

    async run(interaction) {
        const latency = Math.round(Date.now() - interaction.createdTimestamp);

        if (latency < 0) {
            return interaction.reply({
                content: 'Please try again later!',
                ephemeral: true
            });
        } else {
            return interaction.reply({
                content: [
                    `**<:message:798534647956766743> Message:** \`${latency}ms\``,
                    `**<:WebSocket:786446576536125441> WebSocket:** \`${Math.round(this.client.ws.ping)}ms\``
                ].join('\n'),
                ephemeral: true
            });
        }
    }
};