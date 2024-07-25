/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
   await knex.raw('create extension "uuid-ossp"')
  return knex.schema
    .createTable("users", function (table) {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).notNullable().primary(),
      table.string("fullname", 64).notNullable(),
      table.string("email", 64).notNullable(),
      table.string("password", 64).notNullable(),
      table.boolean("isAdmin").defaultTo(true).notNullable(),
      table.timestamps(true); 
  })

  .createTable("products", function (table) {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).notNullable().primary();
    table.string("name", 64).notNullable();
    table.text("description");
    table.decimal("price", 10, 2).notNullable();
    table.integer("quantity").notNullable();
    table.timestamps(true); 
  })

  .createTable("orders", function (table) {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).notNullable().primary();
    table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.uuid("product_id").notNullable().references("id").inTable("products").onDelete("CASCADE");
    table.decimal("total_amount", 10, 2).notNullable();
    table.string("status", 32).notNullable().defaultTo("pending");
    table.timestamps(true); 
  })

  .createTable("wishlists", function (table) {
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).notNullable().primary();
    table.uuid("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.uuid("product_id").notNullable().references("id").inTable("products").onDelete("CASCADE");
    table.timestamps(true); 
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
