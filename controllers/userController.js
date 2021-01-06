const User = require('../models').User;
const sequelize = require('sequelize');

exports.update = async (req, res) => {
  if (req.file) {
    req.body.avatar = req.file.filename;
  }

  if (typeof req.body.avatar !== 'undefined' && req.body.avatar.length === 0)
    delete req.body.avatar;
  try {
    const [rows, result] = await User.update(req.body, {
      where: {
        id: req.user.id,
      },
      returning: true,
      individualHooks: true,
    });

    const user = result[0].get({ raw: true });
    user.avatar = result[0].avatar;
    delete user.password;
    return res.send(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  res.send(req.body);
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users.length);
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    res.send(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
