import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Valida os dados informados
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        error: 'Validation failed, check the required fields to be filled',
      });
    }

    // Captura os campos do corpo da requisição
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ error: `User with email: ${email} not found` });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password does not match' });
    }
    const { id, name } = user;
    const { secret, expiresIn } = authConfig;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      // md5online.org, 7d expiração
      token: jwt.sign({ id, name, email }, secret, {
        expiresIn,
      }),
    });
  }
}

export default new SessionController();
