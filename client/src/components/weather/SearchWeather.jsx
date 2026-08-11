import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchWeather({ onSearch, loading }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch({
      city: city.trim(),
    });
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 flex flex-col gap-4 md:flex-row"
    >
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>
      <button
        disabled={loading}
        className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchWeather;
