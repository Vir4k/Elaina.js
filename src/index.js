require("dotenv").config({ path: ".env" })

const Elaina = require("./Structures/Elaina");
const config = require("./Structures/Configuration");

const client = new Elaina(config);
client.connect();