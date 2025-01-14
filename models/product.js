const mongoose = require('mongoose');
const REGEX_URI = require("../utils/regex")

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true , min: [0, "El precio debe ser mayor a 0"]},
    description: { type: String },
    image: {
        type: String, 
        trim: true,
        validate: {
            validator: (value) => REGEX_URI.test(value) || value === '',
            message: 'URL de la imagen no válida',    
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
