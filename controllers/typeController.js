const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
  async create(req, res) {
    const {name} = req.body;
    const type = await Type.create({name});
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async editType(req, res, next) {
    try {
      const typeId = req.params.id;
      const { name } = req.body;
      const type = await Type.findByPk(typeId);
      if (!type) {
        next(ApiError.badRequest(`Категория с идентификатором ${typeId} не найдена`));
      }
      type.name = name;
      await type.save();
      return res.json(type);

    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async removeType(req, res, next) {
    try {
      const typeId = req.params.id;
      const type = await Type.findByPk(typeId);
      if (!type) {
        throw new ApiError(`Категория с идентификатором ${typeId} не найдена`);
      }
      await type.destroy();
      return res.json({ message: `Категория с идентификатором ${typeId} успешно удалена` });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

}

module.exports = new TypeController();