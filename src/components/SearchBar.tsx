"use client";
import { useState } from "react";
import { LocationSearchResult } from "@/types/accuweather";

interface SearchBarProps {
  onLocationSelect: (location: LocationSearchResult) => void;
  onSearch: (query: string) => Promise<LocationSearchResult[]>;
}

export default function SearchBar({ onLocationSelect, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      const searchResults = await onSearch(query);
      setResults(searchResults);
    } catch (err) {
      setError("Error al buscar la ubicación. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto text-white/90 shadow-md shadow-black/20 rounded p-3 sm:p-4 md:p-5">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar ciudad..."
            className="flex-grow px-4 py-2 border border-gray-300/10 rounded sm:rounded-l focus:outline-none focus:ring-1 focus:ring-sky-900 w-full sm:w-auto"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-sky-900 rounded sm:rounded-r hover:bg-sky-700 cursor-pointer w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}

      {results.length > 0 && (
        <ul className="shadow-md rounded-md border border-gray-300/10 max-h-60 overflow-y-auto">
          <span className="text-white/50 p-3 block text-sm sm:text-base">Resultados:</span>
          {results.map((location) => (
            <li
              key={location.Key}
              onClick={() => onLocationSelect(location)}
              className="px-4 py-2 hover:bg-gray-900 cursor-pointer last:border-b-0 text-sm sm:text-base"
            >
              {location.LocalizedName}, {location.AdministrativeArea.LocalizedName}, {location.Country.LocalizedName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
