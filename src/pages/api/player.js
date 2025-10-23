// src/pages/api/player.js
export const prerender = false;

import Player from "@/models/Player.js";
import { fetchSkinURL } from "@/utils/minecraftAPI.js";
import connectDB from "@/lib/mongodb.js";

export async function POST({ request }) {
  await connectDB();

  // ✅ Manejo seguro de JSON vacío
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Cuerpo JSON inválido o vacío" }),
      { status: 400 }
    );
  }

  const { username } = body;
  if (!username) {
    return new Response(
      JSON.stringify({ error: "Falta el campo 'username'" }),
      { status: 400 }
    );
  }

  // 🔍 Si ya existe, lo devolvemos directamente
  const existing = await Player.findOne({ username });
  if (existing) return new Response(JSON.stringify(existing), { status: 200 });

  // 🔎 Buscamos datos del jugador
  const { premium, uuid, skinURL } = await fetchSkinURL(username);

  // 💾 Guardamos en Mongo
  const newPlayer = new Player({ username, uuid, premium, skinURL });
  await newPlayer.save();

  return new Response(JSON.stringify(newPlayer), { status: 201 });
}

export async function GET() {
  await connectDB();
  const players = await Player.find();
  return new Response(JSON.stringify(players), { status: 200 });
}
