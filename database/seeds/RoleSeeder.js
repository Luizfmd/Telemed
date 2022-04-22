'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Role = use("App/Models/Role");

class RoleSeeder {
  async run () {
    const roles = [
      {
        slug: 'admin', 
        name: 'Administrador', 
        description: 'Administrador geral do sistema.'
      },
      {
        slug: 'patient', 
        name: 'Paciente', 
        description: 'Paciente usuário do sistema.'
      },
      {
        slug: 'doctor', 
        name: 'Doutor', 
        description: 'Doutor responsável por consultas no sistema.'
      }
    ];

    roles.forEach(async (role) => {
      await Role.findOrCreate({ slug: role.slug }, { 
        slug: role.slug,
        name: role.name,
        description: role.description
      });
    });
  }
}

module.exports = RoleSeeder
