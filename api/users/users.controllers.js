const { User, Url } = require('../../db/models');
const bcrypt = require('bcrypt');
const { JWT_SECRET, JWT_EXPIRATION_MS } = require('../../config/keys');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res) => {
  try {
    const { user } = req;
    const payload = {
      id: user.id,
      username: user.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json('Server Error');
  }
};

exports.signup = async (req, res) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Url,
          as: 'urls',
        },
      ],
    });
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json('Server Error');
  }
};
