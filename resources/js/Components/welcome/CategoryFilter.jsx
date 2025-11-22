export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">

      {/* BOTÓN "TODAS" */}
      <button
        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 
          ${
            selectedCategory === ''
              ? 'bg-[#D4AF37] text-black shadow-md'   // DORADO seleccionado
              : 'bg-[#E6372A] text-white hover:bg-[#c22d22] hover:shadow-lg' // ROJO vivo
          }`}
        onClick={() => onSelectCategory('')}
      >
        Todas
      </button>

      {/* BOTONES DE CATEGORÍA */}
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`px-5 py-2 rounded-full font-medium transition-all duration-300
            ${
              selectedCategory === cat.name
                ? 'bg-[#D4AF37] text-black shadow-md'  // Seleccionado → dorado
                : 'bg-[#E6372A] text-white hover:bg-[#c22d22] hover:shadow-lg' // Rojo corporativo
            }`}
          onClick={() => onSelectCategory(cat.name)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
