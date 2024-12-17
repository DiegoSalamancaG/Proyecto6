const Product = require("../models/product");

// Crear un producto
const createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = new Product({ name, price, description });
        await product.save();
        res.status(201).json({ message: 'Producto creado satisfactoriamente.', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;

        await product.save();
        res.json({ message: 'Producto actualizado correctamente.', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found.' });

        await product.remove();
        res.json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
