import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // aqui eu capturo o token dos headers
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // separei o token do Bearer
  const [, token] = authHeader.split(' ');
  try {
    const { secret } = authConfig;
    const decoded = await promisify(jwt.verify)(token, secret);
    // recupera id do usuário que fez a autenticação.
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token!' });
  }
};
