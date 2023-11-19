const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map-controller');
const auth = require('../auth');

router.post('/create', auth.verify, MapController.createMap);
router.get('/get/:id', auth.verify, MapController.getMapById);
router.delete('/delete/:id', auth.verify, MapController.deleteMapById);
router.get('/allMaps', auth.verify, MapController.getAllMaps);

module.exports = router;