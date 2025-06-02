import pool from '../config/db.js';
import axios from 'axios';
import { productSchema } from '../validators/productValidator.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let imageUrl;
    try {
      const imgRes = await axios.get('https://fakestoreapi.com/products');
      const random = Math.floor(Math.random() * imgRes.data.length);
      imageUrl = imgRes.data[random].image;
    } catch (apiError) {
      console.error('Error al obtener imagen de API externa:', apiError);
      imageUrl = 'https://via.placeholder.com/150'; // imagen por defecto si falla
    }

    const { name, description, price, stock } = value;
    const result = await pool.query(
      `INSERT INTO products (name, description, price, stock, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, price, stock, imageUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};


export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, description, price, stock } = value;
    const result = await pool.query(
      `UPDATE products SET name=$1, description=$2, price=$3, stock=$4 WHERE id=$5 RETURNING *`,
      [name, description, price, stock, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    next(err);
  }
};
