import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const student_id = req.params.id;
    const { page = 1 } = req.query;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const { rows, count } = await HelpOrder.findAndCountAll({
      where: { student_id },
      offset: (page - 1) * 10,
      limit: 10,
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    res.append('Count', count);
    return res.json(rows);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student_id = req.params.id;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const { question } = req.body;

    const checkin = await HelpOrder.create({ student_id, question });

    return res.json(checkin);
  }
}
export default new HelpOrderController();
