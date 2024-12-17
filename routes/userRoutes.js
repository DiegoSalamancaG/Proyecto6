const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');
const {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile,
} = require('../controllers/userController');

const router = express.Router();

// Autenticación
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *       example:
 *         name: "adming"
 *         email: "adming@gmail.com"
 *         password: "password"
 *         isAdmin: "true"
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: El usuario se creó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/register', createUser); // Crear usuario

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "diego@gmail.com"
 *               password: "password"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Inicio de sesión exitoso."
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczZmNiMGU5MTcxM2QyZjJiNWI4Mzk2Iiwicm9sZSI6ImNvbXByYWRvciJ9LCJpYXQiOjE3MzIyNzYwOTIsImV4cCI6MTczMjYzNjA5Mn0.TSRb5mkd9TZeUgtwJjusi_BO6KNIWdmyVFjTyXXQSGM"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                      type: string
 *                      example: "673fcb0e91713d2f2b5b8396"
 *                     email:
 *                      type: string
 *                      example: "usuario@gmail.com"
 *
 */
router.post('/login', loginUser); // Iniciar sesión

// Operaciones de perfil
router.get('/profile', authenticateToken, getUserProfile); // Obtener perfil del usuario autenticado

// Rutas de CRUD para usuarios
router.post('/', authenticateToken, verifyAdmin, createUser); // Crear usuario (solo admin)
router.get('/', authenticateToken, verifyAdmin, getAllUsers); // Leer todos los usuarios (solo admin)
router.get('/:id', authenticateToken, getUserById); // Leer un usuario por ID
router.put('/:id', authenticateToken, verifyAdmin, updateUser); // Actualizar usuario (solo admin)
router.delete('/:id', authenticateToken, verifyAdmin, deleteUser); // Eliminar usuario (solo admin)

module.exports = router;
