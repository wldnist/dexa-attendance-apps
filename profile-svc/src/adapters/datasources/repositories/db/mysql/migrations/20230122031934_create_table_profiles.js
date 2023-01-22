/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("profiles", (table) => {
        table.increments('id').primary();
        table.integer("role_id").unsigned().notNullable();
        table.string("name", 255).notNullable();
        table.string("email", 255).notNullable();
        table.string("phone", 20).notNullable();
        table.text("profile_picture");
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
    return knex.schema.dropTable("profiles");
};
