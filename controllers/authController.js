const pool = require("../db/config");

const registerUser = async (req, res) => {
  const { nombre, apellido, numero_telefono, email, contraseña } = req.body;

  try {
    const [existing] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: "Este correo ya está registrado, intenta con otro." });
    }

    await pool.query(
      `INSERT INTO Usuarios (nombre, apellido, numero_telefono, email, contraseña)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, apellido, numero_telefono, email, contraseña]
    );

    return res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const loginUser = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM Usuarios WHERE email = ? AND contraseña = ?",
      [email, contraseña]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Usuario encontrado
    const usuario = rows[0];
    return res.status(200).json({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
    });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { registerUser, loginUser };
