const productRoute = require('express').Router();
const productsController = require('../controllers/products.controller');
const validateNewProduct = require('../middlewares/validateNewProduct.middleware');

productRoute.get('/', productsController.requestAllProducts);

productRoute.get('/:id', productsController.requestProductById);

productRoute.post('/', validateNewProduct, productsController.requestNewProduct);

module.exports = productRoute;