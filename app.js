const express = require('express');
const app = express();
const urlRoutes = require('./api/urls/urls.routes');
const userRoutes = require('./api/users/users.routes');

const db = require('./db/models');
const run = async () => {
  try {
    await db.sequelize.sync();
    console.log('Connection to the database successful!');
    await app.listen(8000, () => {
      console.log('The application is running on localhost:8000');
    });
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
};

run();
app.use(express.json());

app.use('/urls', urlRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});
