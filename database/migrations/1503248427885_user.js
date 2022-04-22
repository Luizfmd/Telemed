'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up () {
    (this.hasTable('users')) ? (
      this.create('users', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('email', 254).notNullable().unique();
        table.string('password', 60).notNullable();
        table.boolean('isAdmin').defaultTo(false);
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamps();
      })
    ) : (null);
  }

  down () {
    this.drop('users');
  }
}

module.exports = UserSchema;
