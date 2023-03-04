const Router = require('express');
const administratorController = require('../controllers/administratorController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/registration', administratorController.registration);
router.post('/login', administratorController.login);
router.get('/auth', authMiddleware, administratorController.check);

module.exports = router;

