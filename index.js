const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta raíz para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// rutas
app.use("/api/products", productRoutes);
app.use("/api", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Conexión a la base de datos
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
