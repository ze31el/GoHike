const express = require('express');
const router = express.Router();
const ctrlGallery = require('../controllers/gallery');
const storage = require('../helpers/storage');

router.get('/gallery/:trailid', ctrlGallery.getGallerys)
router.post('/gallery/:trailid', storage, ctrlGallery.createGallery);

module.exports = router;