const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./db');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const start = async () => {
  try {

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error)
  }
}

start();