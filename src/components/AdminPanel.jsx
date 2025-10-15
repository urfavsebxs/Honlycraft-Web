import { useEffect } from 'react';

export default function AdminPanel({ isOpen, onClose, onToggleDiscounts, discountsEnabled }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0, // quita el padding para que el contenido quede exactamente centrado
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'rgba(31, 41, 55, 0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '90%',
          border: '1px solid rgba(75, 85, 99, 0.5)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic dentro
      >
        {/* Header */}
        <div className="bg-gray-900/80 backdrop-blur-sm p-6 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0..."
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Panel de Administración
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">Descuentos</h3>
                  <p className="text-gray-400 text-sm">
                    Activar o desactivar descuentos en la tienda
                  </p>
                </div>
                <button
                  onClick={onToggleDiscounts}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    discountsEnabled ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      discountsEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="mt-3">
                <span
                  className={`text-sm font-semibold ${
                    discountsEnabled ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {discountsEnabled
                    ? '● Descuentos Activos'
                    : '● Descuentos Desactivados'}
                </span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
              <p className="text-blue-400 text-sm">
                💡 Los cambios se aplican inmediatamente en la tienda
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
