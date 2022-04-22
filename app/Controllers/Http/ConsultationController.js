'use strict'

const Consultation = use('App/Models/Consultation');

// UTILS
const { generateRoomLink } = use('App/Utils/IdGenerator');
const { normalizeTimestamp } = use('App/Utils/DateTime');

class ConsultationController {

    /**
     * Método para listar consultas
     */
    async index({ view, auth }) {
        const consultations = (await Consultation.query().where('user_id', auth.user.id).fetch()).toJSON();
        return view.render('consultation.index', { consultations });
    }

    /**
     * Método para redirecionar form de criação de consulta
     */
    async create({ view }) {
        return view.render('consultation.form');
    }

    /**
     * Retorna a view mostrando a consulta
     */
    async show({ params, view, auth, response }) {
      const consultation = (await Consultation.find(params.id)).toJSON();
      if(auth.user.id !== consultation.user_id) return response.redirect('back');
      
      return view.render('consultation.show', { consultation });
    }

    /**
     * Método para criar consulta
     */
    async store({ request, response, session, auth }) {
        try {
            const {
                patient_name,
                doctor_name,
                patient_password,
                doctor_password,
                description,
                starts_at,
                ends_at
            } = request.all();

            const consultation = await Consultation.create({
                user_id: auth.user.id,
                patient_name,
                doctor_name,
                description,
                starts_at: await normalizeTimestamp(starts_at),
                ends_at: await normalizeTimestamp(ends_at),
                room: await generateRoomLink(),
                patient_password: patient_password ? patient_password : 'pac123',
                doctor_password: doctor_password ? doctor_password : 'med2020'
              });


            if(consultation) {
                session.flash({
                    type: 'success',
                    message: 'Consulta agendada com sucesso!',
                    delay: 3000
                });
                return response.redirect(`/consulta/ver/${consultation.id}`);
            } else {
                session.flash({
                    type: 'danger',
                    message: 'Erro ao agendar consulta, tente novamente!',
                    delay: 3000
                });
                return response.redirect('back');
            }
        } catch ( e ) {
            session.flash({
                type: 'danger',
                message: `Erro ao agendar consulta, tente novamente!`,
                delay: 3000
            });
            return response.redirect('back');
        }
    }

    /**
     * Método para retornar view para edição de consulta
     */
    async edit({ view, params, auth }) {
      const consultation = (await Consultation.query().where({ id: params.id, user_id: auth.user.id }).select('*').first()).toJSON();
      return view.render('consultation.edit', { consultation })
    }

    /**
     * Método para atualizar consulta
     */
    async update({ request, response, session }) {
        try {
            const {
                id,
                patient_name,
                doctor_name,
                doctor_password,
                patient_password,
                description,
                starts_at,
                ends_at,
            } = request.all();

            const consultation            = await Consultation.find(id);
            consultation.patient_name     = patient_name;
            consultation.doctor_name      = doctor_name;
            consultation.patient_password = patient_password;
            consultation.doctor_password  = doctor_password;
            consultation.description      = description;
            consultation.starts_at        = await normalizeTimestamp(starts_at),
            consultation.ends_at          = await normalizeTimestamp(ends_at),
            await consultation.save();

            if(consultation) {
                session.flash({
                    type: 'success',
                    message: 'Consulta atualizada com sucesso!',
                    delay: 3000
                });
                return response.redirect(`/consulta/ver/${consultation.id}`);
            } else {
                session.flash({
                    type: 'error',
                    message: 'Erro ao atualizar consulta, tente novamente!',
                    delay: 3000
                });
                return response.redirect('back');
            }
        } catch ( e ) {
            console.log(e);
            session.flash({
                type: 'error',
                message: 'Erro ao atualizar consulta, tente novamente!',
                delay: 3000
            });
            return response.redirect('back');
        }
    }

    /**
     * Método para deletar consulta
     */
    async destroy({ params, response, session }) {
        try{
            const consultation = await Consultation.find(params.id);
            await consultation.delete();

            if(consultation) {
                session.flash({
                    type: 'success',
                    message: 'Consulta deletada com sucesso!',
                    delay: 3000
                });
                return response.redirect('back');
            } else {
                session.flash({
                    type: 'error',
                    message: 'Erro ao deletar consulta, tente novamente!',
                    delay: 3000
                });
                return response.redirect('back');
            }
        } catch ( e ) {
            session.flash({
                type: 'error',
                message: 'Erro ao atualizar consulta, tente novamente!',
                delay: 3000
            });
            return response.redirect('back');
        }
    }

}

module.exports = ConsultationController;
