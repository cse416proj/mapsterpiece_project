const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/store-controller');
const auth = require('../auth');

router.get('/allPosts', auth.verify, StoreController.getAllPosts);

module.exports = router;