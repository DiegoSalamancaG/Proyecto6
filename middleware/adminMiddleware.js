// Middleware para verificar si el usuario autenticado es administrador
const verifyAdmin = (req, res, next) => {
  // Verificamos si el usuario está autenticado y si es administrador
  if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
  }
  next();
};

module.exports = verifyAdmin;