const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const ERROR_STATUS = require('./data/err');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64a2e72f4643d62f17a257dd',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res) => { res.status(ERROR_STATUS.NOT_FOUND).send({ message: 'Адресс не существует' }); });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
