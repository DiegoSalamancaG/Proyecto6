const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

// Rutas de CRUD para productos

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: String
 *       example:
 *         name: "polera M/L"
 *         price: 3000
 *         description: "poelra manga larga"
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: El producto se creó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', authenticateToken, verifyAdmin, createProduct); // Crear producto (solo admin)

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Todos los usuarios pueden ver la lista de productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *       500:
 *         description: Error en el servidor al enviar la repsuesta
 */
router.get('/', getAllProducts); // Leer todos los productos

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "Producto no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *               example:
 *                 message: "Error en el servidor"
 */
router.get('/:id', getProductById); // Leer un producto por ID

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar información del producto
 *     tags: [Products]
 *       parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a buscar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: El producto se actualizó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       403:
 *         description: Token requerido o Rol de administrador requerido para esta ruta
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', authenticateToken, verifyAdmin, updateProduct); // Actualizar producto (solo admin)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       204:
 *         description: El producto se eliminó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.delete('/:id', authenticateToken, verifyAdmin, deleteProduct); // Eliminar producto (solo admin)

module.exports = router;
