const Joi = require('joi');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../models/catalogProduct');

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  height: Joi.number().required(),
  length: Joi.number().required(),
  width: Joi.number().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  height: Joi.number(),
  length: Joi.number(),
  width: Joi.number(),
});

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

const createProducts = async (req, res) => {
  const products = req.body;

  for (const product of products) {
    const { error } = createProductSchema.validate(product);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  }

  try {
    const insertedIds = [];
    for (const product of products) {
      const insertedId = await createProduct(product);
      insertedIds.push(insertedId);
    }
    res.status(201).json({ message: 'Productos creados exitosamente', insertedIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear los productos' });
  }
};

const updateProducts = async (req, res) => {
  const products = req.body;

  for (const product of products) {
    const { error } = updateProductSchema.validate(product);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  }

  try {
    const updatedCount = [];
    for (const product of products) {
      const { id, ...updatedProduct } = product;
      const count = await updateProduct(id, updatedProduct);
      updatedCount.push(count);
    }
    res.json({ message: 'Productos actualizados exitosamente', updatedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar los productos' });
  }
};

const deleteProducts = async (req, res) => {
  const productIds = req.body;
  try {
    const deletedCount = [];
    for (const productId of productIds) {
      const count = await deleteProduct(productId);
      deletedCount.push(count);
    }
    res.json({ message: 'Productos eliminados exitosamente', deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar los productos' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProducts,
  updateProducts,
  deleteProducts,
};