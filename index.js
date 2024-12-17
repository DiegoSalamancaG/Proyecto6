const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const swaggerUi = require("swagger-ui-express");
const spect = require("./swagger/swagger.js")

dotenv.config()
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spect))

const PORT = process.env.PORT || 3001;
// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT,() =>{
    connectDB();
    console.log(`Servidor corriendo en puerto: ${PORT}`)
    console.log(`http://localhost:${PORT}/api/users`)
    console.log(`http://localhost:${PORT}/api/products`)
})