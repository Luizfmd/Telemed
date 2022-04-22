'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const User = use("App/Models/User");

class UserSeeder {
  async run () {
    const user = {
      name: "admin",
      email: "admin@telemed.com.br",
      password: "admin123"
    }
    await User.findOrCreate({ email: user.email }, user);
  }
}

module.exports = UserSeeder
