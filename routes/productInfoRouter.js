const Router = require('express');
const productInfoController = require('../controllers/productInfoController');
const checkRole = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.get('/:id', productInfoController.getOne);
router.get('/', productInfoController.getAll);
router.patch('/:id', checkRole('ADMIN'), productInfoController.editInfo)
router.post('/', checkRole('ADMIN'), productInfoController.create)
router.delete('/:id', checkRole('ADMIN'), productInfoController.remove);


module.exports = router;
