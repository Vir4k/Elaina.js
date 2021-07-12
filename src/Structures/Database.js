const database = require("mongoose");
const chalk = require("chalk");

module.exports = class Database {
    async loadDatabase() {
        database.connect("mongodb+srv://elaina:elaina.db@elaina.hlm6j.mongodb.net/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        database.connection.on("connected", () => {
            process.stdout.write(`[${chalk.greenBright("BOOT")}] Connected to MongoDB!\n`);
        });

        database.connection.on("err", (err) => {
            process.stdout.write(`[${chalk.redBright("ERROR")}] Unable to connect to the MongoDB. Error:\n${err}\n`);
        });

        database.connection.on("disconnected", () => {
            process.stdout.write(`[${chalk.yellowBright("WARN")}] MongoDB connection is disconnected\n`);
        });
    }

};