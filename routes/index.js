const Router = require('express');
const administratorRouter = require('./administratorRouter');
const productRouter = require('./productRouter');
const typeRouter = require('./typeRouter');
const orderRouter = require('./orderRouter');
const productInfoRouter = require('./productInfoRouter');

const router = new Router();

router.use('/administrator', administratorRouter);
router.use('/type', typeRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);
router.use('/info', productInfoRouter);


module.exports = router;
