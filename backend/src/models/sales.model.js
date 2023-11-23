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

module.exports = {
  getAll,
  findById,
};