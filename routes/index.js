const Router = require('express');
const administratorRouter = require('./administratorRouter');
const productRouter = require('./productRouter');
const typeRouter = require('./typeRouter');
const orderRouter = require('./orderRouter');

const router = new Router();

router.use('/administrator', administratorRouter);
router.use('/type', typeRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);


module.exports = router;
