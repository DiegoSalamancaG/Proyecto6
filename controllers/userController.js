const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Crear un usuario
const createUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'Usuario ya existe.' });

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        user = new User({ name, email, password: hashedPassword, isAdmin: isAdmin || false });
        await user.save();

        res.status(201).json({ message: 'Usuario creado correctamente.', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Iniciar sesión
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Credenciales invalidas.' });

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Credenciales invalidas.' });

        // Generar token JWT
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found.' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });

        user.name = name || user.name;
        user.email = email || user.email;

        // Si se proporciona una nueva contraseña, hashearla antes de guardarla
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        if (isAdmin !== undefined) user.isAdmin = isAdmin;

        await user.save();
        res.json({ message: 'Usuario modificado correctamente.', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });

        await user.remove();
        res.json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener el perfil del usuario autenticado
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile,
};
