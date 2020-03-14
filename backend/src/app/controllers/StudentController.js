import * as Yup from 'yup';
import Sequelize from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { page = 1, q = '', id = 0 } = req.query;

    const where = {
      name: { [Sequelize.Op.substring]: q },
    };
    if (id) where.id = id;

    const { count, rows } = await Student.findAndCountAll({
      offset: (page - 1) * 20,
      limit: 20,
      order: ['created_at'],
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      where,
    });

    res.append('Count', count);
    return res.json(rows);
  }

  async store(req, res) {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.string().required(),
      height: Yup.string().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validantion fails!' });
    }

    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const { id, name, age, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.string().required(),
      height: Yup.string().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validantion fails!' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not exists' });
    }
    const { name, age, email, weight, height } = req.body;

    student.name = name;
    student.email = email;
    student.age = age;
    student.weight = weight;
    student.height = height;
    student.save();

    return res.json(student);
  }

  async unique(req, res) {
    const student = await Student.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    if (!student) {
      return res.status(400).json({ error: 'Student not exists' });
    }

    return res.json(student);
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not exists' });
    }

    student.destroy();

    return res.json({ ok: true });
  }
}

export default new StudentController();
