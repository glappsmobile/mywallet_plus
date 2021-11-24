import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from '../repositories/userRepository.js';

const createUser = async ({ name, password, email }) => {
  const user = await userRepository.findUser({ email });

  if (user) {
    return null;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  return await userRepository.createUserDB({ name, email, password: hashedPassword });
}

const signInUser = async ({ email, password }) => {
  const user = await userRepository.findUser({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }

  const token = jwt.sign({
    id: user.id
  }, process.env.JWT_SECRET);

  return ({
    token
  });

}

export {
  createUser,
  signInUser
}