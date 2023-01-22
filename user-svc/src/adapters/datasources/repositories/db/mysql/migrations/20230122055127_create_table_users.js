/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments('id').primary();
        table.integer("profile_id").unsigned().notNullable();
        table.string("username", 255).notNullable().unique();
        table.string("password", 255).notNullable();
        table.string("created_by");
        table.string("updated_by");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable("users");
};
