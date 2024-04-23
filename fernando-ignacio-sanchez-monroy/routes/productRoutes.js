const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const {
  getProducts,
  getProduct,
  createProducts,
  updateProducts,
  deleteProducts,
} = require('../controllers/productController');
const { authenticateToken } = require('../middleware/auth');

router.post('/login', login);

router.get('/products', authenticateToken, getProducts);
router.get('/products/:id', authenticateToken, getProduct);
router.post('/products', authenticateToken, createProducts);
router.put('/products', authenticateToken, updateProducts);
router.delete('/products', authenticateToken, deleteProducts);

module.exports = router;