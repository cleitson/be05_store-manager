const productsService = require('../services/products.service');
const httpStatus = require('../utils/mapStatusHttp');

const requestAllProducts = async (req, res) => {
  const { data, status } = await productsService.listAllProducts();
  return res.status(httpStatus(status)).json(data);
};

const requestProductById = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await productsService.findProductById(id);
  return res.status(httpStatus(status)).json(data);
};

const requestNewProduct = async (req, res) => {
  const { name } = req.body;
  const { data, status } = await productsService.insertNewProduct(name);
  return res.status(httpStatus(status)).json(data);
};

const requestUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { data, status } = await productsService.updateProduct(id, name);
  return res.status(httpStatus(status)).json(data);
};

const requestDeleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleteProduct(id);
  return res.status(httpStatus(status)).json(data);
};
module.exports = {
  requestAllProducts,
  requestProductById,
  requestNewProduct,
  requestUpdateProduct,
  requestDeleteProduct,
};