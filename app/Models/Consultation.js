'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Consultation extends Model {

  user() {
    return this.hasMay('App/Models/User');
  }
}

module.exports = Consultation;
