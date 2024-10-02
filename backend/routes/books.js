
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { authenticateJWT, authenticateAdmin } = require('../middleware/auth');
//books router
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBook);
router.post('/', authenticateJWT, authenticateAdmin, booksController.addBook);

module.exports = router;

