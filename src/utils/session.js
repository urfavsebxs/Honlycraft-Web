// src/utils/session.js
import { verifyToken } from './auth.js';

/**
 * Verifica si el usuario está autenticado basado en el token del localStorage
 */
export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const decoded = verifyToken(token);
    return decoded !== null;
  } catch {
    return false;
  }
}

/**
 * Obtiene los datos del usuario desde localStorage
 */
export function getUserData() {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem('user');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

/**
 * Cierra la sesión del usuario
 */
export async function logout() {
  if (typeof window === 'undefined') return;
  
  try {
    // Llamar a la API de logout (opcional)
    const token = localStorage.getItem('token');
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.warn('Error al llamar API de logout:', error);
    // Continuar con el logout local aunque falle la API
  }
  
  // Limpiar todos los datos de sesión
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isAdminAuthenticated');
  localStorage.removeItem('cart');
  
  // Disparar eventos para notificar a otros componentes
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('auth-changed'));
  
  // Redirigir al login
  window.location.href = '/login';
}

/**
 * Verifica si el usuario tiene un rol específico
 */
export function hasRole(requiredRole) {
  const user = getUserData();
  if (!user) return false;
  
  return user.role === requiredRole;
}

/**
 * Verifica si el usuario es admin
 */
export function isAdmin() {
  return hasRole('admin');
}

/**
 * Verifica si el usuario es moderador o admin
 */
export function isModerator() {
  return hasRole('moderator') || hasRole('admin');
}
