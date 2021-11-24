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

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const token = await userService.signInUser({ email, password });

    if (token === null) {
      return sendStatus(401);
    }

    return res.send(token).status(200);

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};


export {
  signUp, signIn
};
