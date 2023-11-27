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

const insertNewProduct = async (name) => {
  const id = await productModel.insertNewProduct(name);
  const product = await productModel.findById(id);
  return { status: 'CREATED', data: product };
};

const updateProduct = async (id, name) => {
  const affectedRows = await productModel.updateProduct(id, name);
  if (affectedRows !== 1) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  const product = await productModel.findById(id);
  return { status: 'SUCCESSFUL', data: product };
};
module.exports = {
  listAllProducts,
  findProductById,
  insertNewProduct,
  updateProduct,
};