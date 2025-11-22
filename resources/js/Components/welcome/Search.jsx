import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-10">
      <div className="relative">

        {/* Ícono dorado */}
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-6 h-6" />

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar productos..."
          className="
            w-full pl-14 pr-4 py-3 
            rounded-2xl 
            border border-[#E6372A]
            bg-black
            text-white
            placeholder-gray-400
            shadow-lg

            focus:outline-none 
            focus:ring-2 focus:ring-[#D4AF37]  /* aro dorado */
            focus:border-[#E6372A]             /* borde rojo */
            transition-all duration-300
          "
        />
      </div>
    </div>
  );
}
