const Event = require("../Structures/Event");
const chalk = require("chalk");
const moment = require("moment");
const {
    version
} = require("../../package.json");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            once: true
        });
    }

    async run() {
        console.log([
            `[${chalk.green("INFO")}] Logged in as ${chalk.redBright(`${this.client.user.tag}`)}`,
            `[${chalk.green("INFO")}] Cached ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users, ${this.client.guilds.cache.size.formatNumber()} guilds, ${this.client.channels.cache.size.formatNumber()} channels`,
            `[${chalk.green("INFO")}] Loaded ${this.client.commands.size.formatNumber()} commands & ${this.client.events.size.formatNumber()} events.`
        ].join("\n"));
        process.stdout.write(`[${chalk.greenBright("BOOT")}] Connected to Discord API!\n`);
        process.stdout.write(`[${chalk.greenBright("BOOT")}] Booted up on ${chalk.blueBright(`${moment().format('MMM D, YYYY HH:mm:ss')} ICT`)}\n`);

        let presences = [
            `${this.client.prefix}help`,
            `@${this.client.user.username} help`
        ];

        let i = 0;
        setInterval(() => {
            this.client.user.setActivity({
                name: `${presences[i++ % presences.length]} | v${version}`,
                type: 'PLAYING'
            });
        }, 20000);
    }
};