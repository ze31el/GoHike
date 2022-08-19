const express = require('express');
const router = express.Router();
const ctrlSavedTrail = require('../controllers/savedTrail');
const trailStorage = require('../helpers/trailStorage');

// trail data
router.get('/savedTrails', ctrlSavedTrail.getSavedTrails);
router.get('/savedTrails/:trailname', ctrlSavedTrail.getSingleSavedTrail);
router.post('/savedTrails', trailStorage, ctrlSavedTrail.createSavedTrail);
router.delete('/savedTrails/:trailid', trailStorage, ctrlSavedTrail.deleteSavedTrail);


module.exports = router;