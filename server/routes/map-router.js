const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map-controller');
const auth = require('../auth');

router.post('/create', auth.verify, MapController.createMap);
router.get('/get/:id', MapController.getMapById);
router.put('/publishMap/:id', auth.verify, MapController.publishMapById);
router.put('/unpublishMap/:id', auth.verify, MapController.unpublishMapById);
router.delete('/delete/:id', auth.verify, MapController.deleteMapById);
router.get('/allMaps', auth.verify, MapController.getAllMapsFromCurrentUser);
router.put('/updateMap/:id', auth.verify, MapController.updateMapById);

// no auth needed because it is for public profile
router.get('/allPublicMaps/:userId', MapController.getAllPublishedMapsFromGivenUser);

router.post('/createMapComment/:mapId', auth.verify, MapController.createMapComment);
router.delete('/deleteMapComment/:commentId', auth.verify, MapController.deleteMapCommentById);

// no auth needed because public can view comments
router.get('/allMapComments/:mapId', MapController.getAllCommentsFromPublishedMap);

module.exports = router;