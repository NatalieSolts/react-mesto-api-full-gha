require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const validationErrors = require('celebrate').errors;
const cors = require('cors');
const router = require('./routes/index');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const cors = require('./middlewares/cors');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({
  origin: [
    'https://nata.nomoredomains.rocks',
    'http://nata.nomoredomains.rocks',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://158.160.1.163:3000',
  ],
  // origin: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// mongoose.connect('mongodb://localhost:27017/mestodb', {
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
// .then(() => console.log('Connection is ok'))
// .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(validationErrors());
app.use(errors);

app.listen(PORT);
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });
