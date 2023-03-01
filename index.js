const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./db');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const start = async () => {
  try {
    await sequelize.authenticate(); //подключение к БД
    await sequelize.sync(); // синхронизация состояния БД со схемой данных
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error)
  }
}

start();
