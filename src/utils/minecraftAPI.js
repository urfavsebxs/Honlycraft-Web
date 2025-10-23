// src/utils/minecraftAPI.js
import crypto from "crypto";

/**
 * Intenta obtener el UUID oficial del jugador desde la API de Mojang.
 */
export async function getUUID(username) {
  if (!username) throw new Error("Se requiere un nombre de usuario");

  const url = `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username)}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(5000) // 🔸 evita que se quede colgado más de 5s
    });

    if (res.status === 204) {
      // Jugador no encontrado en Mojang (usuario offline)
      return null;
    }
    
    if (!res.ok) {
      // Error de la API, usar fallback
      return null;
    }

    const data = await res.json();
    if (!data?.id) {
      return null;
    }

    return data.id;
  } catch (err) {
    // No mostrar error en consola para usuarios offline
    return null; // 🔸 devolvemos null para fallback, no lanzamos error
  }
}

/**
 * Genera un UUID offline (fallback) si Mojang no responde.
 */
export function getOfflineUUID(username) {
  const md5 = crypto.createHash("md5").update(`OfflinePlayer:${username}`).digest("hex");
  const parts = [
    md5.substr(0, 8),
    md5.substr(8, 4),
    "4" + md5.substr(12, 3),
    md5.substr(16, 4),
    md5.substr(20, 12)
  ];
  return parts.join("-");
}

/**
 * Devuelve la URL de la skin (oficial si existe, fallback si no).
 */
export function getSkinURL(username, uuid = null) {
  if (uuid) {
    // 🔹 Skin oficial desde Crafatar (Mojang)
    return `https://crafatar.com/renders/body/${uuid}?overlay`;
  } else {
    // 🔹 Fallback con Minotar (funciona con offline o error)
    return `https://minotar.net/armor/body/${encodeURIComponent(username)}/100.png`;
  }
}

/**
 * Determina si el jugador es premium o no y devuelve la skin adecuada.
 */
export async function fetchSkinURL(username) {
  const uuid = await getUUID(username);

  if (!uuid) {
    // 🟠 Jugador no premium → usa nombre y UUID offline
    return {
      premium: false,
      uuid: getOfflineUUID(username),
      skinURL: getSkinURL(username)
    };
  }

  // 🟢 Jugador premium → usa UUID oficial y skin de Crafatar
  return {
    premium: true,
    uuid,
    skinURL: getSkinURL(username, uuid)
  };
}
