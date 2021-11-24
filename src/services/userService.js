import bcrypt from "bcrypt";
import * as userRepository from '../repositories/userRepository.js';

const createUser = async ({ name, password, email }) => {
  const user = await userRepository.findUser({ email });

  if (user) {
    return null;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  return await userRepository.createUserDB({ name, email, password: hashedPassword });
}

export {
  createUser
}