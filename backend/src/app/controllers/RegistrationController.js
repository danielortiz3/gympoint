import * as Yup from 'yup';
import { parseISO, addMonths } from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { page = 1, id = 0 } = req.query;

    const where = {};
    if (id) where.id = id;

    const { count, rows } = await Registration.findAndCountAll({
      offset: (page - 1) * 20,
      limit: 20,
      order: ['created_at'],
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      where,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    res.append('Count', count);
    return res.json(rows);
  }

  async store(req, res) {
    const Schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    /**
     * Verificar se Usuario Existe
     */
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not exists' });
    }

    /**
     * Verificar se Plano Existe
     */
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);
    const price = plan.duration * plan.price;

    const regist = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    const registration = await Registration.findByPk(regist.id, {
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    await Queue.add(RegistrationMail.key, {
      registration,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const Schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const registration = await Registration.findByPk(req.params.id, {
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration not exists' });
    }

    const { student_id, plan_id, start_date } = req.body;

    /**
     * Verificar se Usuario Existe
     */
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not exists' });
    }

    /**
     * Verificar se Plano Existe
     */
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);
    const price = plan.duration * plan.price;

    registration.start_date = start_date;
    registration.end_date = end_date;
    registration.price = price;
    registration.student_id = student_id;
    registration.plan_id = plan_id;
    registration.save();

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: 'Registration not exists' });
    }

    registration.destroy();

    return res.json({ ok: true });
  }
}

export default new RegistrationController();
