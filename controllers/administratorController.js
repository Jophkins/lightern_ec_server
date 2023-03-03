const ApiError = require('../error/ApiError')

class AdministratorController {
  async registration(req, res) {

  }

  async login(req, res) {

  }

  async check(req, res, next) {
    const {id} = req.query;
    if (!id) {
      return next(ApiError.badRequest('Id not found'));
    }
    res.json(id);
  }

}

module.exports = new AdministratorController();