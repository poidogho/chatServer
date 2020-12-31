const router = require('express').Router();

router.use('/api', require('./auth'));
router.use('/api/users', require('./user'));

module.exports = router;
