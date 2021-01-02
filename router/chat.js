const router = require('express').Router();
const {
  Index,
  create,
  messages,
  deleteChat,
} = require('../controllers/chatController');

const { validate } = require('../validators');
const { auth } = require('../middleware/auth');

router.get('/', [auth], Index);
router.get('/messages', [auth], messages);
router.post('/create', [auth], create);
router.delete('/:id', [auth], deleteChat);

module.exports = router;
