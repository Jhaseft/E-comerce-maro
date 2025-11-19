import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/Contexts/CartContext';
import { Link } from '@inertiajs/react'; // <-- para redirigir a checkout

export default function CartModal({ isOpen, onClose }) {
    const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
console.log("DEBUG CartModal: cart =", cart, "total =", total);
    if (!isOpen) return null;

    return (
        
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
            <div className="bg-white dark:bg-zinc-800 w-full sm:w-96 h-full p-6 relative flex flex-col">
                {/* Cerrar modal */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                    onClick={onClose}
                >
                    <X size={24} />
                </button>

                {/* Título + Vaciar carrito */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-brandBlack dark:text-white">
                        Mi Carrito
                    </h2>
                    {cart.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="flex items-center text-red-500 mr-8 hover:text-red-600 transition"
                        >
                            <Trash2 size={18} className="mr-1" />
                            Vaciar
                        </button>
                    )}
                </div>

                {/* Productos */}
                <div className="flex-1 overflow-y-auto">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center dark:text-gray-300">
                            El carrito está vacío
                        </p>
                    ) : (
                        cart.map(item => (
                            <div key={item.rowId} className="flex justify-between items-center mb-4">
                                <img
                                    src={item.options.image || 'https://via.placeholder.com/100'}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg mr-4"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-brandBlack dark:text-white">{item.name}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.rowId, item.qty - 1)}
                                            disabled={item.qty <= 1}
                                            className="p-1 border rounded-l hover:bg-gray-200 dark:hover:bg-zinc-700"
                                        >
                                            <Minus size={16} color='white' />
                                        </button>
                                        <span className="px-3 text-white">{item.qty}</span>
                                        <button
                                            onClick={() => updateQuantity(item.rowId, item.qty + 1)}
                                            className="p-1 border rounded-r hover:bg-gray-200 dark:hover:bg-zinc-700"
                                        >
                                            <Plus size={16} color='white' />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right ml-2">
                                    <p className="font-semibold text-brandBlack dark:text-white">
                                        bs {(item.price * item.qty).toFixed(2)}
                                    </p>
                                    <button
                                        className="text-red-500 text-sm mt-1"
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
                    <div className="mt-4 border-t pt-4 flex flex-col gap-4">
                        <p className="flex justify-between font-bold text-brandBlack dark:text-white mt-2">
                            <span>Total:</span>
                            <span>bs {total.toFixed(2)}</span>
                        </p>

                        {/* Botón confirmar */}
                        <Link
                            href="/checkout"
                            className="block w-full py-3 text-center bg-brandGold text-brandBlack font-semibold rounded-xl hover:bg-[#bfa333] transition"
                        >
                            Confirmar pedido
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
