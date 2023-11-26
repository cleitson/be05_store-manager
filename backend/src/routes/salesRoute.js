const salesRoute = require('express').Router();
const salesController = require('../controllers/sales.controller');
const validate = require('../middlewares/validateNewSale.middleware');

salesRoute.get('/', salesController.requestAllSales);

salesRoute.get('/:id', salesController.requestSaleById);

salesRoute.post(
  '/',
  validate.productRequired,
  validate.quantityRequired,
  validate.numberQuantity,
  validate.productExist,
  salesController.requestNewSale,
);

module.exports = salesRoute;