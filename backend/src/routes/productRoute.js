const productRoute = require('express').Router();
const productsController = require('../controllers/products.controller');

productRoute.get('/', productsController.requestAllProducts);

productRoute.get('/:id', productsController.requestProductById);

productRoute.post('/', productsController.requestNewProduct);

module.exports = productRoute;