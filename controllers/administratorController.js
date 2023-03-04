const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {Administrator, Order} = require('../models/models');

const generateJwt = (id, email, role) => {
  return jwt.sign(
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  );
}

class AdministratorController {
  async registration(req, res, next) {
    const {email, password, role} = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Неверный email или пароль'));
    }
    const candidate = await Administrator.findOne({where: {email}});
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const admin = await Administrator.create({email, password: hashPassword});
    const order = await Order.create({administratorId: admin.id});
    const token = generateJwt(admin.id, admin.email);
    return res.json(token);
  }

  async login(req, res, next) {
    const {email, password} = req.body;
    const admin = await Administrator.findOne({where: {email}});
    if (!admin) {
      return next(ApiError.internal('Пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, admin.password);
    if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'))
    }
    const token = generateJwt(admin.id, admin.email, admin.role);
    return res.json({token});
  }

  async check(req, res, next) {
    const token = generateJwt(req.admin.id, req.admin.email);
    return res.json({token});
  }

}

module.exports = new AdministratorController();