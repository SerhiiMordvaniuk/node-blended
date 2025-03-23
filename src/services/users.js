import User from '../db/models/User.js';
import bcrypt from 'bcrypt';
import Session from '../db/models/Session.js';
import { createSession } from '../utils/createSession.js';

export const findUserByEmail = (email) => User.findOne({ email });

export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  return User.create({ ...userData, password: encryptedPassword });
};

export const createActiveSession = async (userId) => {
  await Session.deleteOne({ userId });
  return Session.create({
    userId,
    ...createSession(),
  });
};
