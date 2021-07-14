module.exports = {
    token: process.env.TOKEN,
    owners: process.env.OWNERS,
    prefix: process.env.PREFIX,

    access: {
        mongo_uri: process.env.MONGO_URI
    },

    colors: {
        default: "9c89b8"
    }
};