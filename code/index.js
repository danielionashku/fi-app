const express = require('express');
const morgan = require('morgan');
const { Prohairesis } = require('prohairesis');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false}))
  .use(express.json())
  
  .listen(port, () => console.log(`Server listening on port ${port}`));