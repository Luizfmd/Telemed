'use strict'

class AuthController {

    /**
     * Método para retornar login
     */
    async index({ view }) {
        return view.render('login');
    }

    /**
     * Método para logar usuário
     */
    async store({ request, response, session, auth }) {
        try {
            const { email, password, remember } = request.all();
            await auth.attempt(email, password);
            return response.redirect('/dashboard');
        } catch ( e ) {
            session.withErrors({ general: 'Email ou senha incorretos.'}).flashAll();
            return response.redirect('back');
        }
    }

    /**
     * Método para logout de usuário
     */
    async destroy({ view, auth }) {
        try {
            await auth.logout();
            return view.render('login');
        } catch( e ) {}
    }

}

module.exports = AuthController;
