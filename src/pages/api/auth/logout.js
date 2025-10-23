export const prerender = false;

export async function POST() {
  try {
    // En el lado del servidor, simplemente confirmamos que el logout fue exitoso
    // La limpieza real de datos se hace en el cliente (localStorage)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Sesión cerrada correctamente"
      }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Error al cerrar sesión"
      }),
      { status: 500 }
    );
  }
}

export async function GET() {
  // Redirigir a login si se accede directamente
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/login'
    }
  });
}