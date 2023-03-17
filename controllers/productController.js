const uuid = require('uuid');
const path = require('path');
const {Product, ProductInfo} = require('../models/models');
const ApiError = require('../error/ApiError');
const {logger} = require("sequelize/lib/utils/logger");

class productController {
  async create(req, res, next) {
    try {
      let {article, name, price, typeId, info} = req.body;
      const {img} = req.files;
      let fileName = uuid.v4() + ".jpg";
      await img.mv(path.resolve(__dirname, '..', 'static', fileName));

      if (typeId === 'undefined') {
        next(ApiError.badRequest('Категория товара не выбрана'));
      }

      // if product with provided article is already exist - throw an error
      const existingArticle = await Product.findOne({ where: { article } });
      if (existingArticle) {
        next(ApiError.alreadyExist('Такой АРТИКУЛ уже существует'));
      }

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
      next(ApiError.badRequest400(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let {typeId, article, limit, page} = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let products;
      if (!typeId && !article) {
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
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }

  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params
      const product = await Product.findOne(
        {
          where: {id},
          include: [{model: ProductInfo, as: 'info'}]
        },
      )
      return res.json(product);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async editProduct(req, res, next) {
    try {
      const {id} = req.params;
      const {article, name, price, typeId, info} = req.body;
      const product = await Product.findByPk(id);

      if (!product) {
        next(ApiError.badRequest('Товар не найден'));
      }

      if (article) {
        product.article = article;
      }
      if (name) {
        product.name = name;
      }
      if (price) {
        product.price = price;
      }
      if (typeId) {
        product.typeId = typeId;
      }

      if (info) {
        const productInfo = JSON.parse(info);
        await ProductInfo.destroy({where: {productId: id}});
        for (const i of productInfo) {
          await ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          });
        }
      }

      await product.save();

      return res.json(product);
    } catch (error) {
      next(ApiError.badRequest400(error.message));
    }
  }

  async removeProduct(req, res, next) {
    try {
      const {id} = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        next(ApiError.badRequest('Товар не найден'));
      }
      await product.destroy();

      return res.json({message: 'Товар был удален'});

    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

}

module.exports = new productController();