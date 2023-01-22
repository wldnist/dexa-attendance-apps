/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("roles", (table) => {
        table.increments('id').primary();
        table.string("role", 100).notNullable();
        table.string("group", 100).notNullable();
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
    return knex.schema.dropTable("roles");
};
