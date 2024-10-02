
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { authenticateJWT } = require('../middleware/auth');
//user router
router.get('/:id', authenticateJWT, usersController.getUserProfile);
router.put('/:id', authenticateJWT, usersController.updateUserProfile);

module.exports = router;