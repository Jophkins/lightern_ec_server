const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Administrator = sequelize.define('administrator', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
});

const Product = sequelize.define('product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  article: {type: DataTypes.STRING, unique: true, allowNull: false},
  name: {type: DataTypes.STRING, unique: false, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  img: {type: DataTypes.STRING, allowNull: false},
});

const Type = sequelize.define('type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const ProductInfo = sequelize.define('product_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
});

const Order = sequelize.define('order', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  phone: {type: DataTypes.STRING, allowNull: true},
  customerName: {type: DataTypes.STRING, allowNull: false},
  status: {type: DataTypes.STRING, defaultValue: 'OPEN'},
  totalPrice: {type: DataTypes.INTEGER, allowNull: false},
});

const OrderInfo = sequelize.define('order_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  quantity: {type: DataTypes.INTEGER, defaultValue: 1},
  name: {type: DataTypes.STRING, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
});

Order.hasMany(OrderInfo, {as: 'info'});
OrderInfo.belongsTo(Order);

Type.hasMany(Product);
Product.belongsTo(Type);

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product);

module.exports = {
  Administrator,
  Order,OrderInfo,
  Product,
  Type,
  ProductInfo
}