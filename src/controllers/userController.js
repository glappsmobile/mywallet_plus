import * as userService from '../services/userService.js';

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.sendStatus(400);
  }

  const user = await userService.createUser({ name, email, password });

  if (user === null) {
    return res.sendStatus(409);
  }

  if (user.length === 0) {
    return res.sendStatus(500);
  }

  return res.sendStatus(201);

};

export {
  signUp,
};
