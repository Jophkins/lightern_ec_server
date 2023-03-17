const Router = require('express');
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.delete('/:id', checkRole('ADMIN'), typeController.removeType);
router.put('/:id', checkRole('ADMIN'), typeController.editType);


module.exports = router;
