const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT p.sale_id as saleId,
    s.date, p.product_id as productId, p.quantity 
    FROM sales_products as p inner join sales as s on s.id = p.sale_id`;
  const [sales] = await connection.execute(query);
  return sales;
};

const findById = async (id) => {
  const query = `SELECT s.date, p.product_id as productId, p.quantity FROM sales_products as p
  inner join sales as s on s.id = p.sale_id 
  where p.sale_id = ?`;
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

const newSale = async (sale) => {
  const queryDate = 'INSERT INTO sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(queryDate);
  const insertedSale = sale.map((product) => {
    const querySale = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    return connection.execute(querySale, [insertId, product.productId, product.quantity]);
  });
  await Promise.all(insertedSale);
  return insertId;
};
module.exports = {
  getAll,
  findById,
  newSale,
};