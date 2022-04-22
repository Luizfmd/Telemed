'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {

  async handle (error, { request, response}) {
    if(error.name === 'HttpException') {
      return response.redirect('/404');
    }
    return super.handle(...arguments);
  }

}

module.exports = ExceptionHandler
