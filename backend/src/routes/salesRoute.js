const salesRoute = require('express').Router();
const salesController = require('../controllers/sales.controller');

salesRoute.get('/', salesController.requestAllSales);

salesRoute.get('/:id', salesController.requestSaleById);

salesRoute.post('/', salesController.requestNewSale);

module.exports = salesRoute;