const productRoute = require('express').Router();
const productsController = require('../controllers/products.controller');

productRoute.get('/', productsController.requestAllProducts);

productRoute.get('/:id', productsController.requestProductById);

module.exports = productRoute;