const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const { authenticateJWT } = require('../middleware/auth');

router.get('/', reviewsController.getReviews);
router.get('/user', reviewsController.getIndividualsReviews);
router.post('/', authenticateJWT, reviewsController.addReview);

module.exports = router;