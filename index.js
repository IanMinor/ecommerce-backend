const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://emmit.castelancarpinteyro.com', 
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

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

const path = require("path");

// Servir archivos estáticos del frontend (por ejemplo, Vite)
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all: cualquier ruta que no sea API devuelve el index.html del frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Conexión a la base de datos
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
