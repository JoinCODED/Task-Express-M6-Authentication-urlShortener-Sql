const { User, Url } = require('../../db/models');

exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json('Server Error');
  }
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json('Server Error');
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
