const express = require('express');
const router = express.Router();
const { createMessage, getMessages, deleteMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createMessage)
  .get(protect, getMessages);

router.delete('/:id', protect, deleteMessage);

module.exports = router;
