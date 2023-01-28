/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("attendances", (table) => {
        table.increments('id').primary();
        table.integer("profile_id").unsigned().notNullable();
        table.date("attendance_date").notNullable();
        table.time("attendance_in");
        table.time("attendance_out");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable("attendances");
};
