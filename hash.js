const bcrypt = require('bcryptjs');

const hashPassword = async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('asdf14', salt); // Cambia "adminpassword" por tu contraseña deseada
    console.log('Hashed Password:', hashedPassword);
};

hashPassword();