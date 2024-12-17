const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Esquema de Usuario
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nombre es necesario'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email es necesario'],
            unique: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Ingrese un email valido',
            ],
        },
        password: {
            type: String,
            required: [true, 'La contraseña es necesaria'],
            minlength: [6, 'Contraseña debe tener al menos 6 caracteres'],
        },
        isAdmin: {
            type: Boolean,
            default: false, // Por defecto, el usuario no es administrador
        },
    },
    { timestamps: true } // Agrega campos createdAt y updatedAt automáticamente
);

// Middleware: Hashear contraseña antes de guardar
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Si no se ha modificado, continúa
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Exportar el modelo
module.exports = mongoose.model('user', UserSchema);
