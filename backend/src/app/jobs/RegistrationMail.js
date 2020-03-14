import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registration } = data;

    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}`,
      subject: 'Matricula Realizada',
      template: 'registration',
      context: {
        student: registration.student.name,
        plan: registration.plan.title,
        price: registration.price,
        start_date: format(
          parseISO(registration.start_date),
          "'dia' dd 'de 'MMMM' de 'yyyy",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(registration.end_date),
          "'dia' dd 'de 'MMMM' de 'yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new RegistrationMail();
