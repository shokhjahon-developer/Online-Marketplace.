const { nodeEnv } = require("../../config");

const knexFile = require("../../knexfile");
const knex = require("knex")(knexFile[nodeEnv]);

module.exports = knex;
