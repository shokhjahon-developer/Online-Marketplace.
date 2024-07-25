require("dotenv/config");
const { dbUrl } = require("./config");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: dbUrl,
  },
};
