const Router = require('express');
const administratorController = require('../controllers/administratorController');

const router = new Router();

router.post('/registration', administratorController.registration);
router.post('/login', administratorController.login);
router.get('/auth', administratorController.check);

module.exports = router;

