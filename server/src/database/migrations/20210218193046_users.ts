import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('name', 30).notNullable().unique()
        table.string('encryptedPassword', 60).notNullable()
        table.string('email', 320).notNullable()
        table.timestamp('timestamp').notNullable()
    }).withSchema('linuxadmin')
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users').withSchema('linuxadmin')
}

