'use strict'

const Env = use("Env")

class Global {
  async handle({ view, }, next) {

    view.share({
      url: Env.get('URL')
    })


    await next()
  }

}

module.exports = Global
