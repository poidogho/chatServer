const router = require('express').Router();
const { update, getUsers, getUser } = require('../controllers/userController');

const { validate } = require('../validators');
const { auth } = require('../middleware/auth');
const { userFile } = require('../middleware/fileUpload');
const { rules: updateRules } = require('../validators/user/update');

router.post('/update', [auth, userFile, updateRules, validate], update);

router.get('/', getUsers);

router.get('/:id', getUser);

module.exports = router;
