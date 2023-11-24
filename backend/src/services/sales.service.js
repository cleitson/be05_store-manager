const salesModel = require('../models/sales.model');

const listAllSales = async () => {
  const sales = await salesModel.getAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findSaleById = async (id) => {
  const sales = await salesModel.findById(id);
  if (!sales || sales.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sales };
};

const newSale = async (sale) => {
  const salesId = await salesModel.newSale(sale);
  const resposta = { id: salesId, itemsSold: sale };
  console.log(resposta);
  return { status: 'CREATED', data: resposta };
};
module.exports = {
  listAllSales,
  findSaleById,
  newSale,
};