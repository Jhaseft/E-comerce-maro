export default function ProductCard({ product, handleAddToCart, addingId, successId }) {
  const isOutOfStock = product.stock === 0;

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl shadow-xl border
        ${isOutOfStock ? "border-red-600 opacity-80" : "border-[#D4AF37]"}
        bg-gray-900 text-white
        hover:scale-105 hover:shadow-2xl
        transition-all duration-300
      `}
    >
      {/* Cinta de Agotado */}
      {isOutOfStock && (
        <div className="absolute top-3 left-0 bg-red-600 text-[#D4AF37] px-4 py-1 text-sm font-semibold rounded-r-lg shadow-md z-10">
          AGOTADO
        </div>
      )}

      {/* Logo de la empresa */}
      <div className="absolute top-3 right-3 w-10 h-10">
        <img
          src="https://res.cloudinary.com/dcmjhycsr/image/upload/v1763825595/Captura_de_pantalla_2025-11-22_102220-removebg-preview_eur39c.png"
          alt="Logo Empresa"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Imagen del producto */}
      <div className="w-full h-64 sm:h-72 lg:h-80 overflow-hidden rounded-t-2xl">
        <img
          src={product.image || "https://via.placeholder.com/600x400"}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-xl font-bold text-[#D4AF37] truncate">
          {product.name}
        </h3>

        <p className="text-gray-300 text-sm line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span
            className={`
              px-3 py-1 text-sm font-semibold rounded-full border
              ${isOutOfStock
                ? "bg-red-600 text-white border-red-700"
                : "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]"
              }
            `}
          >
            {isOutOfStock ? "Sin stock" : `Stock: ${product.stock}`}
          </span>

          <p className="text-2xl font-extrabold text-[#D4AF37]">
            Bs {Number(product.price).toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(product)}
          disabled={addingId === product.id || isOutOfStock}
          className={`
            mt-3 w-full py-2 rounded-xl text-lg font-bold
            transition-all shadow-md
            ${addingId === product.id
              ? "bg-gray-600 text-white cursor-not-allowed"
              : successId === product.id
                ? "bg-red-700 text-[#D4AF37]"
                : "bg-red-600 text-[#D4AF37] hover:bg-red-700"
            }
          `}
        >
          {isOutOfStock
            ? "No disponible"
            : addingId === product.id
              ? "Agregando..."
              : successId === product.id
                ? "¡Agregado!"
                : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
