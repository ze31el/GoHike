const express = require('express');
const router = express.Router();
const ctrlReview = require('../controllers/review');

// user data
router.route('/review')
    .get(ctrlReview.getReviews)
    .post(ctrlReview.createReview);

module.exports = router;