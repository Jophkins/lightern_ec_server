const ApiError = require('../error/ApiError');
const {ProductInfo} = require('../models/models');

class productInfoController {

  async create(req, res, next) {
    try {
      const { productId, title, description } = req.body;
      const info = await ProductInfo.create({productId, title, description});
      return res.json(info);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const infoId = req.params.id;
      const { title, description } = req.body;
      const info = await ProductInfo.findByPk(infoId);
      return res.json(info)

    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    const info = await ProductInfo.findAll();
    return res.json(info);
  }

  async editInfo(req, res, next) {
    try {
      const infoId = req.params.id;
      const { title, description } = req.body;
      const info = await ProductInfo.findByPk(infoId);
      if (!info) {
        next(ApiError.badRequest('ошибка изменения информации'));
      }
      if (title) {
        info.title = title;
      }
      if (description) {
        info.description = description;
      }
      await info.save();
      return res.json(info);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async remove(req, res, next) {
    try {
      const infoId = req.params.id;
      const info = await ProductInfo.findByPk(infoId);
      if (!info) {
        throw new ApiError(`Описание с идентификатором ${infoId} не найдена`);
      }
      await info.destroy();
      return res.json({ message: `Описание с идентификатором ${infoId} успешно удалена` });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

}

module.exports = new productInfoController();