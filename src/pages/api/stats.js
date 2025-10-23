import connectDB from "@/lib/mongodb.js";
import Stats from "@/models/Stats.js";

export async function GET() {
  try {
    await connectDB();
    const stats = await Stats.find({});
    return new Response(JSON.stringify(stats), { status: 200 });
  } catch (error) {
    console.error("Error obteniendo stats:", error);
    return new Response(JSON.stringify({ error: "Error al obtener datos" }), { status: 500 });
  }
}
