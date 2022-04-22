'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema   = use('Schema');
const Database = use('Database');

class ConsultationSchema extends Schema {
  up () {
    (this.hasTable('consultations')) ? (
      this.create('consultations', (table) => {
        table.increments();
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("id").on("users").onDelete("CASCADE");
        table.string('patient_name', 60).notNullable();
        table.string('doctor_name', 60).notNullable();
        table.text('description').nullable();
        table.timestamp('starts_at').notNullable().defaultTo(Database.fn.now());
        table.timestamp('ends_at').notNullable().defaultTo(Database.fn.now());
        table.string('room', 60).notNullable().unique();
        table.string('patient_password', 60).notNullable();
        table.string('doctor_password', 60).notNullable();
        table.boolean('state').notNullable().defaultTo(true);
        table.timestamps();
      })
    ) : (null);
  }

  down () {
    this.drop('consultations');
  }
}

module.exports = ConsultationSchema;
