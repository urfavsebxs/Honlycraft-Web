import connectDB from "@/lib/mongodb.js";
import { loginUser } from "@/utils/auth.js";

export const prerender = false; // Muy importante para POST

export async function POST({ request }) {
  try {
    await connectDB();

    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    const { token, user } = await loginUser(username, password);

    // Puedes guardar el token como cookie si quieres sesión persistente
    return new Response(
      JSON.stringify({ 
        success: true, 
        token, 
        username: user.username,
        role: user.role 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 401 }
    );
  }
}
