import { logout } from '../utils/session.js';

export default function LogoutButton({ className = "", children = "Cerrar Sesión" }) {
  const handleLogout = () => {
      logout();
  };

  return (
    <button
      onClick={handleLogout}
      className={`w-full text-left px-5 py-2.5 hover:bg-white/10 transition font-bold text-red-400 ${className}`}
    >
      {children}
    </button>
  );
}
