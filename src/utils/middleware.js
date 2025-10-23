// src/utils/middleware.js
import { verifyToken } from './auth.js';

/**
 * Middleware para verificar autenticación en páginas del lado del servidor
 */
export async function requireAuth(request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return {
      authenticated: false,
      error: 'Token no proporcionado'
    };
  }
  
  try {
    const decoded = verifyToken(token);
    return {
      authenticated: true,
      user: decoded
    };
  } catch (error) {
    return {
      authenticated: false,
      error: 'Token inválido'
    };
  }
}

/**
 * Middleware para verificar roles específicos
 */
export async function requireRole(request, allowedRoles) {
  const authResult = await requireAuth(request);
  
  if (!authResult.authenticated) {
    return authResult;
  }
  
  if (!allowedRoles.includes(authResult.user.role)) {
    return {
      authenticated: false,
      error: 'Permisos insuficientes'
    };
  }
  
  return authResult;
}

/**
 * Middleware para verificar si es admin
 */
export async function requireAdmin(request) {
  return await requireRole(request, ['admin']);
}

/**
 * Middleware para verificar si es moderador o admin
 */
export async function requireModerator(request) {
  return await requireRole(request, ['admin', 'moderator']);
}
