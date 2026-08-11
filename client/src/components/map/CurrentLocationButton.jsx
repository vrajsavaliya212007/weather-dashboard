import { FaLocationArrow } from "react-icons/fa";
function CurrentLocationButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 font-semibold text-white transition hover:shadow-xl disabled:opacity-60"
    >
      <FaLocationArrow />
      {loading ? "Detecting..." : "Use Current Location"}
    </button>
  );
}

export default CurrentLocationButton;
