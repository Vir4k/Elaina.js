const path = require("path");
const {
    promisify
} = require("util");
const glob = promisify(require("glob"))
const Command = require("./Command.js");
const Interaction = require("./Interaction.js");
const Event = require("./Event");

module.exports = class Util {
    constructor(client) {
        this.client = client;
    }

    isClass(input) {
        return typeof input === "function" &&
            typeof input.prototype === "object" &&
            input.toString().substring(0, 5) === "class";
    }

    get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    }

    removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    responseTime(message) {
        const time = Date.now() - message.createdTimestamp;
        return `${time.formatNumber() || 0}ms`;
    }

    categoryCheck(category, message) {
        category = category.toLowerCase();
        switch (category) {
            case 'developer':
                return this.checkOwner(message.author.id);
            case 'nsfw':
                return message.channel.nsfw;
            default:
                return true;
        }
    }

    async loadCommands() {
        return glob(`${this.directory}Modules/Commands/**/*.js`).then(commands => {
            for (const commandFile of commands) {
                delete require.cache[commandFile];
                const {
                    name
                } = path.parse(commandFile);
                const File = require(commandFile);
                if (!this.isClass(File)) throw new TypeError(`Command: "${name}" doesn't export a class.`);
                const command = new File(this.client, name.toLocaleLowerCase());
                if (!(command instanceof Command)) throw new TypeError(`Command: "${name}" doesn't belong in Commands Directory.`);
                this.client.commands.set(command.name, command);
                if (command.aliases.length) {
                    for (const alias of command.aliases) {
                        this.client.aliases.set(alias, command.name);
                    }
                }
            }
        });
    }

    async loadInteractions() {
        return glob(`${this.directory}Modules/Interactions/**/*.js`).then(interactions => {
            for (const interactionFile of interactions) {
                delete require.cache[interactionFile];
                const {
                    name
                } = path.parse(interactionFile);
                const File = require(interactionFile);
                if (!this.isClass(File)) throw new TypeError(`Interaction ${name} doesn't export a class.`);
                const interaction = new File(this.client, name.toLowerCase());
                if (!(interaction instanceof Interaction)) throw new TypeError(`Interaction ${name} doesn't belong in Interactions directory.`);
                this.client.interactions.set(interaction.name, interaction);
                this.client.application?.commands.create(interaction);
            }
        });
    }

    async loadEvents() {
        return glob(`${this.directory}Modules/Events/**/*.js`).then(events => {
            for (const eventFile of events) {
                delete require.cache[eventFile];
                const {
                    name
                } = path.parse(eventFile);
                const File = require(eventFile);
                if (!this.isClass(File)) throw new TypeError(`Event: "${name}" doesn't export a class.`);
                const event = new File(this.client, name);
                if (!(event instanceof Event)) throw new TypeError(`Event: "${name}" doesn't belong in Events.`);
                this.client.events.set(event.name, event);
                event.emitter[event.type](name, (...args) => event.run(...args));
            }
        });
    }
};