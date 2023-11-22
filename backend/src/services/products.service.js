const productModel = require('../models/products.model');

const listAllProducts = async () => {
  const products = await productModel.getAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findProductById = async (id) => {
  const productById = await productModel.findById(id);
  if (!productById) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: productById };
};

module.exports = {
  listAllProducts,
  findProductById,
};