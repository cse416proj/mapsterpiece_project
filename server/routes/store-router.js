const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/store-controller');
const auth = require('../auth');

router.get('/allPosts', StoreController.getAllPosts);
router.get('/allUsers', StoreController.getAllUsers);

module.exports = router;