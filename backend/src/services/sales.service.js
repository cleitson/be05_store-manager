const salesModel = require('../models/sales.model');

const listAllSales = async () => {
  const sales = await salesModel.getAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findSaleById = async (id) => {
  const sales = await salesModel.findById(id);
  if (!sales) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESSFUL', data: sales };
};

module.exports = {
  listAllSales,
  findSaleById,
};