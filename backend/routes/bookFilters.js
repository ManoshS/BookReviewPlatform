const express = require('express');
const router = express.Router();
const booksFilterController = require('../controllers/booksFilterController');
//Filter on Books Router
router.get('/rating/asc', booksFilterController.getBooksByAscRating);
router.get('/rating/desc', booksFilterController.getBooksByDescRating);
router.get('/time/asc', booksFilterController.getBooksByAscTime);
router.get('/time/desc', booksFilterController.getBooksByDescTime);


module.exports = router;
