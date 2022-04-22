'use strict'

class Login {
  get rules () {
    return {
      email:    'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': "O e-mail é obrigatório!"   ,
      'email.email':     "O e-mail é inválido!"  ,
      'password.required': "A senha é obrigatória!" ,
    }
  }

  get validateAll () { return true; }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages);
    return this.ctx.response.redirect("back");
  }
}

module.exports = Login
