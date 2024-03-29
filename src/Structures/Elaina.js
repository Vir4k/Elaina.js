const {
    Client,
    Collection,
    Intents
} = require("discord.js");
const Util = require("./Util.js");
const Database = require('./ClientDatabase.js');

module.exports = class Elaina extends Client {
    constructor(options = {}) {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGES
            ],
            allowedMentions: {
                parse: ['users']
            }
        });
        this.validate(options);
        this.commands = new Collection();
        this.aliases = new Collection();
        this.interactions = new Collection();
        this.events = new Collection();
        this.utils = new Util(this);
        this.database = new Database;

        String.prototype.toProperCase = function () {
            return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        };

        Number.prototype.formatNumber = function () {
            return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        };

        Array.prototype.random = function () {
            return this[Math.floor(Math.random() * this.length)];
        };
    }

    validate(options) {
        if (typeof options !== "object") throw new TypeError("Options should be a type of object.");

        if (!options.token) throw new Error("You must add the token for the client.");
        this.token = options.token;

        if (!options.prefix) throw new Error("You must add a prefix for the client.");
        if (typeof options.prefix !== "string") throw new TypeError("Prefix should be a type of string.");
        this.prefix = options.prefix;

        if (!options.owners) throw new Error("You must add a list of owners for the client.");
        this.owners = options.owners;
    }

    async connect(token = this.token) {
        this.utils.loadCommands();
        this.utils.loadEvents();
        this.database.loadDatabase();
        super.login(token);
    }
};