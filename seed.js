import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// --- Esquema del usuario ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "moderator", "admin"], default: "user" },
});

// Hash de contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

// --- Función para obtener UUID desde Mojang ---
async function getUUID(username) {
  try {
    const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    if (!res.ok) throw new Error("Jugador no encontrado en Mojang API");
    const data = await res.json();
    return data.id;
  } catch (err) {
    console.error(`❌ Error al obtener UUID de ${username}:`, err.message);
    return null;
  }
}

// --- Función principal ---
async function seedDatabase() {
  try {
    // Conectarse a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/honlycraft");
    console.log("✅ Conectado a MongoDB");

    // Lista de usuarios
    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "moderator", password: "mod123", role: "moderator" },
      { username: "user", password: "user123", role: "user" },
    ];

    // Eliminar usuarios previos (opcional)
    await User.deleteMany({});
    console.log("🧹 Usuarios anteriores eliminados");

    // Insertar nuevos usuarios
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Usuario ${userData.username} creado con rol ${userData.role}`);
    }

    // Crear stats de ejemplo
    const Stats = mongoose.model("Stats", new mongoose.Schema({
      player: { type: String, required: true },
      kills: { type: Number, default: 0 },
      deaths: { type: Number, default: 0 },
      wins: { type: Number, default: 0 }
    }));

    // Eliminar stats previas
    await Stats.deleteMany({});
    console.log("🧹 Stats anteriores eliminadas");

    // Crear stats de ejemplo
    const statsData = [
      { player: "admin", kills: 150, deaths: 45, wins: 25 },
      { player: "moderator", kills: 89, deaths: 32, wins: 18 },
      { player: "user", kills: 42, deaths: 28, wins: 8 }
    ];

    for (const statData of statsData) {
      const stat = new Stats(statData);
      await stat.save();
      console.log(`✅ Stats de ${statData.player} creadas`);
    }

    console.log("✅ Todos los usuarios y stats insertados correctamente");

  } catch (err) {
    console.error("❌ Error al insertar:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Conexión cerrada");
  }
}

seedDatabase();
