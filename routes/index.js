const express = require('express');
const productsRouter = require('./products.router');
require('dotenv').config();
const userPost = require('./post');
var userUsuario = require('../routes/usuario.router');

function routerApi(app) {
  const router = express.Router();
   app.use('/api', router);

   router.use('/products', productsRouter);
   router.use('/user', userUsuario);
   router.use('/posts', userPost);

}
module.exports = routerApi;


