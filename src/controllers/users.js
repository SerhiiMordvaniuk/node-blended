import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import {
  findUserByEmail,
  createUser,
  updateUserWithToken,
  //   createActiveSession,
} from '../services/users.js';
// import { setupCookies } from '../utils/cookies.js';

export const registerUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) throw createHttpError(409, 'Email in use');

  const newUser = await createUser(req.body);

  res.status(201).json({
    user: { name: newUser.name, email: newUser.email },
    token: newUser.token,
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

  const updatedUser = await updateUserWithToken(user._id);

  res.json({
    user: { name: updatedUser.name, email: updatedUser.email },
    token: updatedUser.token,
  });
};
