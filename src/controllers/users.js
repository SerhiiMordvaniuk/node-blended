import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import {
  findUserByEmail,
  createUser,
  createActiveSession,
} from '../services/users.js';
import { setupCookies } from '../utils/cookies.js';

export const registerUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) throw createHttpError(409, 'Email in use');

  const newUser = await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { name: newUser.name, email: newUser.email },
  });
};

export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (!user) throw createHttpError(401, 'Credentials are wrong');

  const isEqualPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (!isEqualPassword) throw createHttpError(401, 'Credentials are wrong');
  const session = await createActiveSession(user._id);
  setupCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};
