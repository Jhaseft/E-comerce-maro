import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/Contexts/CartContext';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CartModal({ isOpen, onClose }) {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [visible, setVisible] = useState(false); // controla render
  const [show, setShow] = useState(false);       // controla animación

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // pequeña espera para que la transición funcione
      setTimeout(() => setShow(true), 20);
    } else {
      setShow(false);
      // desmontar después de la animación
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex justify-end transition-colors duration-300
        ${show ? 'bg-black/70' : 'bg-black/0'}
      `}
    >
      <div
        className={`
          bg-gray-900 w-full sm:w-96 h-full p-6 relative flex flex-col text-white shadow-2xl rounded-l-3xl
          transform transition-transform duration-300
          ${show ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Cerrar modal */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-[#D4AF37] transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Título + Vaciar carrito */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#D4AF37]">Mi Carrito</h2>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center text-red-500 mr-10 hover:text-red-600 transition"
            >
              <Trash2 size={18} className="mr-1" />
              Vaciar
            </button>
          )}
        </div>

        {/* Productos */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">El carrito está vacío</p>
          ) : (
            cart.map(item => (
              <div key={item.rowId} className="flex items-center gap-4 p-2 bg-gray-800 rounded-xl">
                <img
                  src={item.options.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 flex flex-col justify-between h-full">
                  <p className="font-semibold text-[#D4AF37] truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.rowId, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="p-1 bg-gray-700 rounded-l hover:bg-red-700 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.rowId, item.qty + 1)}
                      className="p-1 bg-gray-700 rounded-r hover:bg-red-700 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between h-full">
                  <p className="font-bold text-[#D4AF37]">
                    Bs {(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    className="text-red-500 text-sm mt-1 hover:text-red-600"
                    onClick={() => removeFromCart(item.rowId)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totales */}
        {cart.length > 0 && (
          <div className="mt-4 border-t border-gray-700 pt-4 flex flex-col gap-4">
            <p className="flex justify-between font-bold text-[#D4AF37] text-lg">
              <span>Total:</span>
              <span>Bs {total.toFixed(2)}</span>
            </p>

            {/* Botón Confirmar */}
            <Link
              href="/checkout"
              className="block w-full py-3 text-center bg-red-600 text-[#D4AF37] font-bold rounded-xl hover:bg-red-700 transition"
            >
              Confirmar pedido
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
