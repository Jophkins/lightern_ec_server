const {Order, OrderInfo, Product} = require('../models/models');
const ApiError = require('../error/ApiError')

class OrderController {
  async create(req, res, next) {
    try {
      const { phone, customerName, items } = req.body;

      // Calculate total price
      let totalPrice = 0;
      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        totalPrice += product.price * item.quantity;
      }

      // Create order
      const order = await Order.create({
        phone,
        customerName,
        status: 'OPEN',
        totalPrice,
      });

      // Create order info and associate it with the order
      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        await OrderInfo.create({
          quantity: item.quantity,
          name: product.name,
          price: product.price,
          orderId: order.id,
        });
      }

      res.status(201).json(order);
    } catch (error) {
      next(ApiError.internal('Failed to create order.'));
    }
  }

  async getAll(req, res, next) {
    try {
      const orders = await Order.findAll();
      return res.json(orders);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req, res) {

  }

}

module.exports = new OrderController();