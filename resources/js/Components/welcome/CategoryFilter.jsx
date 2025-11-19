export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      <button
        className={`px-4 py-2 rounded-full ${
          selectedCategory === '' ? 'bg-brandGold text-white' : 'bg-gray-200 dark:bg-zinc-700'
        }`}
        onClick={() => onSelectCategory('')}
      >
        Todas
      </button>

      {categories.map(cat => (
        <button
          key={cat.id}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === cat.name ? 'bg-brandGold text-white' : 'bg-gray-200 dark:bg-zinc-700'
          }`}
          onClick={() => onSelectCategory(cat.name)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
