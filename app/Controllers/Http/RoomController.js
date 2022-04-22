'use strict'

const Consultation = use('App/Models/Consultation');

class RoomController {
  async enter({ view, request, response }) {
    const { r } = request.all();
    const consultation = await Consultation.query().where({room: r, state: 1}).first();
    if(!consultation) return response.redirect('back');
    return view.render('consultation_room.enter', { id: consultation.toJSON().id });
  }

  async index({ view, session, params, response }) {
    if(session.get('username') && session.get('level')) {
      const username = session.get('username');
      const level = session.get('level');
      const consultation = await Consultation.find(params.id);
      return view.render('consultation_room.index', { username, level, consultation: consultation.toJSON() });
    }
    return response.redirect('back');
  }
  async store({ request, response, params, session }) {
    const { password } = request.all();
    const { id } = params;
    const consultation = (await Consultation.find(id)).toJSON();

    if(`${password}` !== consultation.patient_password && `${password}` !== consultation.doctor_password) {
      session.withErrors({ general: 'Senha incorreta, tente novamente!'}).flashAll();
      return response.redirect('back')
    }
    if(`${password}` === consultation.patient_password) {
      session.put('username', consultation.patient_name)
      session.put('level', 1);
    } else {
      session.put('username', consultation.doctor_name)
      session.put('level', 2)
    }
    return response.redirect(`/canal-de-atendimento/${id}`);
  }
  async destroy({ session, response, params }) {
    session.clear();
    return response.redirect(`/room?r=${params.room}`);
  }
}

module.exports = RoomController;
