const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acceso denegado, token no proporcionado.' });

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
        const user = await User.findById(verified.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });

        req.user = { id: user._id, isAdmin: user.isAdmin }; // Agregar isAdmin
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token invalido' });
    }
};

module.exports = { authenticateToken };
