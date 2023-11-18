const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post-controller');
const auth = require('../auth');

router.post('/createPost', auth.verify, PostController.createPost);
// router.get('/getAllPosts', PostController.getAllPosts);
// router.get('/getPostById', PostController.getPostById);
// router.put('/updatePost', PostController.updatePost);
// router.delete('/deletePost', PostController.deletePost);

module.exports = router;
