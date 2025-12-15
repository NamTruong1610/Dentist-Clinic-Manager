const { authRoutes } = require('../routes')
const errorHandler = require('../middlewares/errorMiddleware');
var cookieParser = require('cookie-parser');
const express = require('express');

exports.appConfig = async (app) => {
  const port = process.env.PORT || 5500;

  app.use(cookieParser());
  app.use(express.json());
  app.use('/api/auth', authRoutes)

  app.get('/', (req, res) => {
    res.send("Hello Nam");
  });
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  })
}