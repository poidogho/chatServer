const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user)
      return res.status(404).json({ msg: 'Username or Password do not exit' });
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ msg: 'Username or Password do not exit' });
    }
    const userWithToken = generateToken(user.get({ raw: true }));
    userWithToken.user.avatar = user.avatar;
    res.send(userWithToken);
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const userWithToken = generateToken(user.get({ raw: true }));
    res.send(userWithToken);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generateToken = (user) => {
  delete user.password;

  const token = jwt.sign(user, config.appKey, { expiresIn: 86400 });
  return { ...{ user }, ...{ token } };
};
