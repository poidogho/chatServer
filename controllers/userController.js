const User = require('../models').User;
const sequelize = require('sequelize');

exports.update = async (req, res) => {
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
    res.send(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  res.send(req.body);
};
