const { Client } = require("discord.js");

module.exports = class Elaina extends Client {
    constructor(options = {}) {
        super({
            disableMentions: "everyone"
        });
        this.validate(options);

        this.once("ready", () => {
            console.log(`Logged in as ${this.user.username}`)
        });

        this.on("message", async (message) => {
            const Regex = RegExp(`^<@!${this.user.id}>$`);
            const Prefix = RegExp(`^<@!${this.user.id}> `);

            if(message.guild || message.author.bot) return;

            if (message.content.match(Regex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.prefix}\`.`);

            const prefix = message.content.match(Prefix) ?
            message.content.match(Prefix)[0] : this.prefix;
            
            // eslint-disable-next-line no-unused-vars
            const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g)

            if (cmd.toLowerCase() === "hello") {
                message.channel.send("Hello!");
            }
        });
    }

    validate(option) {
        if (typeof options !== "object") throw new TypeError("Options should be a type of object.");

        if (!options.token) throw new Error("You must add the token for the client.");
        this.token = options.token;

        if (!options.prefix) throw new Error("You must add a prefix for the client.");
        if (typeof options.prefix !== "string") throw new TypeError("Prefix should be a type of string.");
        this.prefix = options.prefix;
    }

    async login(token = this.token) {
        super.login(token)
    }
};