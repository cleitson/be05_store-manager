const productService = require('../services/products.service');
const httpStatus = require('../utils/mapStatusHttp');

const productRequired = async (req, res, next) => {
  let error = null;
  req.body.map((product) => {
    if (!product.productId) {
      error = res.status(400).json({ message: '"productId" is required' }); 
    }
    return error;
  });
  if (error) {
    return;
  }
  next();
};

const quantityRequired = async (req, res, next) => {
  let error = null;
  req.body.map((product) => {
    if (!product.quantity && product.quantity !== 0) {
      error = res.status(400).json({ message: '"quantity" is required' }); 
    }
    return error;
  });
  if (error) {
    return;
  }
  next();
};

const numberQuantity = async (req, res, next) => {
  const isValid = req.body.every((product) => product.quantity >= 1);

  if (!isValid) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const productExist = async (req, res, next) => {
  const ids = [];
  req.body.map((product) => (ids.push(product.productId)));
  const result = ids.map(async (id) => {
    const { status, data } = await productService.findProductById(id);
    return { status, data };
  });
  const rest = await Promise.all(result);
  const error = rest.find((product) => {
    if (httpStatus(product.status) === 404) {
      return product;
    }
    return null;
  });
  if (error) return res.status(httpStatus(error.status)).json(error.data);
  next();
};

module.exports = {
  productRequired,
  quantityRequired,
  numberQuantity,
  productExist,
};