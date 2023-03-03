const uuid = require('uuid');
const path = require('path');
const {Product, ProductInfo} = require('../models/models');
const ApiError = require('../error/ApiError');

class productController {
  async create(req, res, next) {
    try {
      let {article, name, price, typeId, info} = req.body;
      const {img} = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const product = await Product.create({article, name, price, typeId, img: fileName});

      if (info) {
        info = JSON.parse(info);
        info.forEach(i => ProductInfo.create({
          title: i.title,
          description: i.description,
          productId: product.id
        }));
      }

      return res.json(product)
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    let {typeId, article, limit, page} = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let products;
    if(!typeId && !article) {
      products = await Product.findAndCountAll({limit, offset});
    }
    if (typeId && !article) {
      products = await Product.findAndCountAll({where: {typeId}, limit, offset});
    }
    if (!typeId && article) {
      products = await Product.findAndCountAll({where: {article}, limit, offset});
    }
    if (typeId && article) {
      products = await Product.findAndCountAll({where: {typeId, article}, limit, offset});
    }
    return res.json(products)

  }

  async getOne(req, res) {
    const {id} = req.params
    const product = await Product.findOne(
      {
        where: {id},
        include: [{model: ProductInfo, as: 'info'}]
      },

    )
    return res.json(product);
  }

}

module.exports = new productController();