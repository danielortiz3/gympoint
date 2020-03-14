import * as Yup from 'yup';
import Sequelize from 'sequelize';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1, q = '', id = 0 } = req.query;

    const where = {
      title: { [Sequelize.Op.substring]: q },
    };
    if (id) where.id = id;
    const { rows, count } = await Plan.findAndCountAll({
      offset: (page - 1) * 20,
      limit: 20,
      where,
      order: ['created_at'],
    });

    res.append('Count', count);
    return res.json(rows);
  }

  async store(req, res) {
    const Schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number()
        .round()
        .required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const Schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number()
        .round()
        .required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists' });
    }
    const { title, duration, price } = req.body;

    plan.title = title;
    plan.duration = duration;
    plan.price = price;
    plan.save();

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists' });
    }

    plan.destroy();

    return res.json({ ok: true });
  }
}

export default new PlanController();
