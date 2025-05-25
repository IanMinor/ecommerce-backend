const pool = require("../db/config");

const addToCart = async (req, res) => {
  const { id_usuario, id_producto, cantidad } = req.body;

  try {
    await pool.query("CALL sp_AgregarProductoAlCarrito(?, ?, ?)", [
      id_usuario,
      id_producto,
      cantidad,
    ]);
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    return res
      .status(500)
      .json({ message: "Error al agregar producto al carrito" });
  }
};

module.exports = { addToCart };
