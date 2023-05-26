require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routers = require('./routes/index');
const { BD_ADDRESS } = require('./config');
const { PORT } = require('./config');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
mongoose.connect(BD_ADDRESS, {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger);

app.use(routers);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server start listening on port ${PORT}`);
});
