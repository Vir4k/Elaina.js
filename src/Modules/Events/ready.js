const Event = require("../../Structures/Event");
const chalk = require("chalk");
const moment = require("moment");
const {
    version
} = require("../../../package.json");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            once: true
        });
    }

    async run() {
        await this.client.utils.loadInteractions();

        let users = this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).formatNumber();
        let guilds = this.client.guilds.cache.size.formatNumber();
        let channels = this.client.channels.cache.size.formatNumber();

        let commands = this.client.commands.size.formatNumber();
        let events = this.client.events.size.formatNumber();
        let interactions = this.client.interactions.size.formatNumber();

        console.log([
            `[${chalk.green("INFO")}] Logged in as ${chalk.magentaBright(`${this.client.user.tag}`)} (${chalk.magenta(`${this.client.user.id}`)})`,
            `[${chalk.green("INFO")}] Cached ${users} users, ${guilds} guilds & ${channels} channels`,
            `[${chalk.green("STATUS")}] Loaded ${commands} commands, ${events} events & ${interactions} interactions`
        ].join("\n"));
        process.stdout.write(`[${chalk.greenBright("BOOT")}] Sucessfully connected to Discord.\n`);
        process.stdout.write(`[${chalk.greenBright("BOOT")}] Booted up on ${chalk.blueBright(`${moment().format('MMM D, YYYY HH:mm:ss')}.`)}\n`);

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
