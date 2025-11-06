import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AdminPanel from './AdminPanel.jsx';
import Info from '../../info.json';

// Unir todos los productos en un solo array
const products = [
  ...(Info.rangos || []),
  ...(Info.survival_keys || []),
  ...(Info.survivalprotec || [])
];

// Obtener todas las categorías únicas de los productos
const categories = ['todos', ...new Set(products.map(p => p.category))];

export default function StoreComponent() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [cart, setCart] = useState([]);
  const [discountsEnabled, setDiscountsEnabled] = useState(true);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authContainer, setAuthContainer] = useState(null);
  const [cartContainer, setCartContainer] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const dialogRef = useRef(null);

  // Cargar autenticación y contenedores
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const isAuth = !!(token && user);
    setIsAuthenticated(isAuth);
    setAuthContainer(document.getElementById('auth-button-container'));
    setCartContainer(document.getElementById('cart-button-container'));
  }, []);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Funciones principales
  const handleCategoryChange = (category) => setSelectedCategory(category);

  const handleAddToCart = (product) => {
    if (!product.inStock) return;

    // Leer siempre el carrito más reciente desde localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Agregar el producto
    const updatedCart = [...currentCart, product];

    // Guardar en localStorage y actualizar estado
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);

    showToast(`✅ ${product.name} añadido al carrito`);
  };

  const handleRemoveFromCart = (index) => {
    const removedProduct = cart[index];
    const newCart = cart.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    showToast(`🗑️ ${removedProduct.name} eliminado del carrito`);
  };

  const getProductPrice = (product) => {
    if (discountsEnabled && product.originalPrice) return product.price;
    return product.originalPrice || product.price;
  };

  const getTotalPrice = () =>
    cart.reduce((total, product) => total + getProductPrice(product), 0).toFixed(2);

  const openCart = () => dialogRef.current?.showModal();
  const closeCart = () => dialogRef.current?.close();
  const toggleDiscounts = () => setDiscountsEnabled(!discountsEnabled);

  const handleLogout = async () => {
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
    
    // Actualizar estado local
    setIsAuthenticated(false);
    
    // Disparar eventos para notificar a otros componentes
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('auth-changed'));
    }
    
    // Redirigir al inicio
    window.location.href = '/';
  };

  const filteredProducts =
    selectedCategory === 'todos'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Toast (notificación)
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-regular-custom text-white flex-1 text-center">
              <span className="text-white font-light">Tienda</span>
              <span className="mx-1"></span>
              <span className="text-blue-400">HonlyCraft</span>
            </h1>
            {isAuthenticated && (
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-3 rounded-lg transition-all border border-gray-700"
                title="Panel de Administración"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Categorías */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800/80 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/50 flex flex-col"
              >
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-fill" />
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      AGOTADO
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    <div className="flex flex-col items-end whitespace-nowrap ml-2">
                      {discountsEnabled && product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                      )}
                      <span className="text-xl font-bold text-amber-400">${getProductPrice(product).toFixed(2)}</span>
                      {discountsEnabled && product.originalPrice && (
                        <span className="text-xs text-green-400 font-semibold">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                        product.inStock
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                    >
                      {product.inStock ? 'Añadir al carrito' : 'No disponible'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialog del carrito */}
        <dialog ref={dialogRef} className="bg-gray-800/90 rounded-xl max-w-2xl w-full border border-gray-700 shadow-2xl p-0">
          <div className="bg-gray-900 p-6 flex justify-between items-center border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              🛒 Carrito de Compras
            </h2>
            <button onClick={closeCart} className="text-gray-400 hover:text-white transition-colors">
              ✖
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">Tu carrito está vacío</p>
                <p className="text-sm mt-2">Agrega productos para comenzar tu compra</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold">{product.name}</h3>
                      <p className="text-amber-400 font-bold mt-1">${getProductPrice(product).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(index)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="bg-gray-900 p-6 border-t border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 text-lg">Total:</span>
                <span className="text-amber-400 text-2xl font-bold">${getTotalPrice()}</span>
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-all"
                onClick={() => window.location.href = 'http://localhost:4242'}
              >
                Proceder al Pago
              </button>
            </div>
          )}
        </dialog>

        <AdminPanel
          isOpen={isAdminPanelOpen}
          onClose={() => setIsAdminPanelOpen(false)}
          onToggleDiscounts={toggleDiscounts}
          discountsEnabled={discountsEnabled}
        />
      </main>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Botones del header con createPortal */}
      {authContainer &&
        createPortal(
          isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white font-bold text-xl hover:text-red-400 transition px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Cerrar Sesión
            </button>
          ) : (
            <a
              href="/login"
              className="text-white font-bold text-xl hover:text-blue-400 transition px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Login
            </a>
          ),
          authContainer
        )}

      {cartContainer &&
        createPortal(
          <button
            onClick={openCart}
            className="relative text-white font-bold text-xl hover:text-blue-400 transition px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2"
          >
            🛒 Carrito
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>,
          cartContainer
        )}
    </>
  );
}
