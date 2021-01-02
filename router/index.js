const router = require('express').Router();

router.use('/api', require('./auth'));
router.use('/api/users', require('./user'));
router.use('/api/chats', require('./chat'));

module.exports = router;
