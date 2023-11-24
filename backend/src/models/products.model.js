const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const insertNewProduct = async (name) => {
  const [{ insertId }] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  return insertId;
};
module.exports = {
  getAll,
  findById,
  insertNewProduct,
};