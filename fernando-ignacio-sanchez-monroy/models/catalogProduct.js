const connection = require('../database');

const getAllProducts = async () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM catalog_products', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getProductById = async (productId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM catalog_products WHERE id = ?', [productId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const createProduct = async (product) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO catalog_products SET ?', product, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

const updateProduct = async (productId, updatedProduct) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE catalog_products SET ? WHERE id = ?', [updatedProduct, productId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

const deleteProduct = async (productId) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM catalog_products WHERE id = ?', [productId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};