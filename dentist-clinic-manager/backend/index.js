require('dotenv').config();
const express = require('express');
const { dbConnect } = require('./config/Database')
const { appConfig } = require('./config/AppConfig')

const startServer = async () => {
  const app = express();
  // Database Connection
  await dbConnect();
  // App Default Config
  await appConfig(app);
};
startServer();

