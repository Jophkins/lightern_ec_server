const express = require('express');
require('dotenv').config(); //this should be before sequelize to proper work in there
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

//TODO: JWT

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Error handling, last Middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate(); //db connection
    await sequelize.sync(); // sync db state with models
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error)
  }
}

start();
