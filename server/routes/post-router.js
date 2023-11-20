const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post-controller');
const auth = require('../auth');

router.post('/createPost', auth.verify, PostController.createPost);
router.get('/userPosts/:idLists', PostController.getPostsByPostIds);
router.get('/post/:postId', PostController.getPostById);
router.get('/postComments/:idLists', PostController.getCommentsByCommentIds);

router.put('/updatePost/:postId', auth.verify, PostController.updatePostById);
router.delete('/deletePost/:postId', auth.verify, PostController.deletePostById);
router.post('/createComment/:postId', auth.verify, PostController.createComment);
router.post('/createSubcomment/:commentId', auth.verify, PostController.createSubcomment);
router.delete('/deleteComment/:commentId', auth.verify, PostController.deleteCommentById);

router.delete('/deleteSubcomment/:subId', auth.verify, PostController.deleteSubCommById);
router.get('/subComments/:idList', auth.verify, PostController.getSubcommsBySubcommsIds);
module.exports = router;
