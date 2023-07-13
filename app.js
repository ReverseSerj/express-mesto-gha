const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { handleErr } = require('./middlewares/handle-err');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const NotFound = require('./errors/notFound');
const auth = require('./middlewares/auth');

const {
  createUserValidator, loginValidator,
} = require('./validators/validators');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb')
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.post('/signin', login, loginValidator);
app.post('/signup', createUser, createUserValidator);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res, next) => { next(new NotFound('Адресс не существует')); });
app.use(errors());
app.use(handleErr);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
