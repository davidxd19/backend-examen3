const db = require('../config/db');

const getAllProducts = async () => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

const createProduct = async (product) => {
  const { name, description, price, stock, image_url } = product;
  const [result] = await db.query(
    'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)',
    [name, description, price, stock, image_url]
  );
  return { id: result.insertId, ...product };
};

const updateProduct = async (id, product) => {
  const { name, description, price, stock } = product;
  await db.query(
    'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
    [name, description, price, stock, id]
  );
};

const deleteProduct = async (id) => {
  await db.query('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
