const Elaina = require("./Structures/Elaina");
const config = require("../config.json");

const client = new Elaina(config);
client.connect();