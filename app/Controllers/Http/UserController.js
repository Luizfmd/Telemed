'use strict'

const User = use('App/Models/User');
const Role = use('App/Models/Role');

class UserController {

    /**
     * Método para listar usuários
     */
    async index({ view, auth }) {
        const users = (await User.query().where('id', '!=', auth.user.id).fetch()).toJSON();
        console.log(users)
        return view.render('user.index', { users });
    }

    /**
     * Método para redirecionar form de criação de usuário
     */
    async create({ view }) {
        const roles = (await Role.all()).toJSON();
        return view.render('user.form', { roles });
    }

    /**
     * Método para criar usuário
     */
    async store({ request, response, view, session }) {
        try {
            const {
                name,
                email,
                password,
                isAdmin,
            } = request.all();

            const user    = new User();
            user.name     = name;
            user.email    = email
            user.password = password;
            user.isAdmin  = isAdmin;
            user.active   = true;
            await user.save();

            if(user) {
                session.flash({
                    type: 'success',
                    message: 'Conta criada com sucesso!',
                    delay: 3000
                });
                return view.render('user.index');
            } else {
                session.flash({
                    type: 'error',
                    message: 'Erro ao criar conta, tente novamente',
                    delay: 3000
                });
                return response.redirect('back');
            }
        } catch ( e ) {
            session.flash({
                type: 'error',
                message: 'Erro ao criar conta, tente novamente',
                delay: 3000
            });
            return response.redirect('back');
        }
    }

    /**
     * Metodo para retornar view de edição de usuário
     */
    async edit({ view, params }) {
        const user = (await User.find(params.id)).toJSON();
        return view.render('user.form', { user });
    }

    /**
     * Método para atualizar usuário
     */
    async update({ request, response, view, session }) {
        try {
            const {
                id,
                name,
                email,
                password,
                isAdmin,
                active
            } = request.all();

            const user    = await User.find(id);
            user.name     = name;
            user.email    = email
            user.password = password;
            user.isAdmin  = isAdmin;
            user.active   = active != undefined ? active : true;
            await user.save();

            if(user) {
                session.flash({
                    type: 'success',
                    message: 'Conta atualizada com sucesso!',
                    delay: 3000
                });
                return view.render('user.index');
            } else {
                session.flash({
                    type: 'error',
                    message: 'Erro ao atualizar conta, tente novamente',
                    delay: 3000
                });
                return response.redirect('back');
            }
        } catch ( e ) {
            session.flash({
                type: 'error',
                message: 'Erro ao atualizar conta, tente novamente',
                delay: 3000
            });
            return response.redirect('back');
        }
    }

    /**
     * Método para excluir usuário
     */
    async destroy({ params, response, session }) {
        try {
            const user = await User.find(params.id);
            if(user) {
                user.active = false;
                await user.delete();
                return response.redirect('back');
            } else {
                session.flash({
                    type: 'error',
                    message: 'Erro ao deletar conta, tente novamente',
                    delay: 3000
                });
                return response.redirect('back');
            }
        } catch ( e ) {
            session.flash({
                type: 'error',
                message: 'Erro ao deletar conta, tente novamente',
                delay: 3000
            });
            return response.redirect('back');
        }
    }
}

module.exports = UserController;
