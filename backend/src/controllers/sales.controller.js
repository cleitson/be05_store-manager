const salesService = require('../services/sales.service');
const httpStatus = require('../utils/mapStatusHttp');

const requestAllSales = async (req, res) => {
  const { data, status } = await salesService.listAllSales();
  return res.status(httpStatus(status)).json(data);
};

const requestSaleById = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await salesService.findSaleById(id);
  return res.status(httpStatus(status)).json(data);
};

const requestNewSale = async (req, res) => {
  const { body } = req;
  const { data, status } = await salesService.newSale(body);
  return res.status(httpStatus(status)).json(data);
};

module.exports = {
  requestAllSales,
  requestSaleById,
  requestNewSale,
};