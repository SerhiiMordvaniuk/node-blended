import User from '../db/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
// import Session from '../db/models/Session.js';
// import { createSession } from '../utils/createSession.js';

export const findUserByEmail = (email) => User.findOne({ email });

export const updateUserWithToken = (userId) => {
  const userToken = jwt.sign({ userId }, env('JWT_SECRET'));
  return User.findByIdAndUpdate(userId, { token: userToken }, { new: true });
};
export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await User.create({
    ...userData,
    password: encryptedPassword,
  });
  return updateUserWithToken(newUser._id);
};

// export const createActiveSession = async (userId) => {
//   await Session.deleteOne({ userId });
//   return Session.create({
//     userId,
//     ...createSession(),
//   });
// };
