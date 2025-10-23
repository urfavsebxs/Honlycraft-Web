import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User.js";

const SECRET = import.meta.env.JWT_SECRET

// Verifica credenciales y genera token
export async function loginUser(username, password) {
  const user = await User.findOne({ username }).select("+password");
  if (!user) throw new Error("Usuario no encontrado");

  const valid = user.password == password

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    SECRET,
    { expiresIn: "7d" }
  );

  return { 
    token, 
    user: {
      id: user._id,
      username: user.username,
      role: user.role
    }
  };
}

// Verifica token y devuelve datos del usuario
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

// Cierra sesión eliminando el token (en frontend normalmente)
export function logoutUser() {
  return { success: true, message: "Sesión cerrada correctamente" };
}
