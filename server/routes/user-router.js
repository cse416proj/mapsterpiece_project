const expresss = require('express');
const router = expresss.Router();
const UserController = require('../controllers/user-controller');
const auth = require('../auth');

router.delete('/deleteUser/:userId', UserController.deleteUserById);
router.get('/user/:userId', UserController.getUserById);
router.post('/allPublicMaps', UserController.getAllPublishedMaps);

module.exports = router;