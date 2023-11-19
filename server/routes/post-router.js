const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post-controller');
const auth = require('../auth');

router.post('/createPost', auth.verify, PostController.createPost);
router.get('/userPosts/:idLists', auth.verify, PostController.getPostsByPostIds);
router.get('/post/:postId', auth.verify, PostController.getPostById);
router.get('/postComments/:idLists', auth.verify, PostController.getCommentsByCommentIds);
router.delete('/deletePost/:postId', auth.verify, PostController.deletePostById);
router.post('/createComment/:postId', auth.verify, PostController.createComment);
// router.put('/updatePost', PostController.updatePost);
// router.delete('/deletePost', PostController.deletePost);

module.exports = router;
