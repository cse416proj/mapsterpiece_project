const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
// const auth = require('../auth');

router.post('/allPublicMaps', UserController.getAllPublishedMaps);

module.exports = router;