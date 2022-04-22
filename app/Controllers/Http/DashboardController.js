'use strict'

const User = use('App/Models/User');

class DashboardController {
    async index({ auth, view }) {
        const user = (await User.find(auth.user.id)).toJSON();
        return view.render('dashboard.index', { user });
    }
}

module.exports = DashboardController;
