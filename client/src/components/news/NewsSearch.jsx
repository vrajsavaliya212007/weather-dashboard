import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function NewsSearch({ onSearch, loading }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("weather");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      search,
      category,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 flex flex-col gap-4 lg:flex-row"
    >
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search weather news..."
          className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-4 outline-none focus:border-blue-500"
        />
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-2xl border border-slate-300 bg-white px-5"
      >
        <option value="weather">Weather</option>
        <option value="climate">Climate</option>
        <option value="storm">Storm</option>
        <option value="rain">Rain</option>
        <option value="environment">Environment</option>
      </select>
      <button
        disabled={loading}
        className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white"
      >
        Search
      </button>
    </form>
  );
}

export default NewsSearch;
