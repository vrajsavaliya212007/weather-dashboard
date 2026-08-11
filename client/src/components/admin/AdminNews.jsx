import { useEffect, useMemo, useState } from "react";

import toast from "react-hot-toast";

import {
  FaSearch,
  FaNewspaper,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaExternalLinkAlt,
  FaTimes,
  FaCheckCircle,
  FaBan,
  FaFilter,
} from "react-icons/fa";

import {
  getAdminNews,
  deleteAdminNews,
  toggleNewsStatus,
} from "../../services/adminApi";

function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedNews, setSelectedNews] = useState(null);

  const loadNews = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const res = await getAdminNews();
      setNews(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load news");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    if (!selectedNews) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedNews(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedNews]);

  const publishedCount = news.filter((item) => item.isPublished).length;
  const hiddenCount = news.filter((item) => !item.isPublished).length;

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const value = search.trim().toLowerCase();
      const matchesSearch =
        !value ||
        item.title?.toLowerCase().includes(value) ||
        item.source?.toLowerCase().includes(value) ||
        item.category?.toLowerCase().includes(value);
      const matchesStatus =
        status === "all" ||
        (status === "published" && item.isPublished) ||
        (status === "hidden" && !item.isPublished);
      return matchesSearch && matchesStatus;
    });
  }, [news, search, status]);

  const hasFilters = search.trim() !== "" || status !== "all";

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
  };

  const handleToggle = async (item) => {
    try {
      const res = await toggleNewsStatus(item._id);
      toast.success(
        res?.message ||
          (item.isPublished
            ? "News hidden successfully"
            : "News published successfully"),
      );
      setNews((prev) =>
        prev.map((newsItem) =>
          newsItem._id === item._id
            ? {
                ...newsItem,
                isPublished: !newsItem.isPublished,
              }
            : newsItem,
        ),
      );
      if (selectedNews?._id === item._id) {
        setSelectedNews((prev) =>
          prev
            ? {
                ...prev,
                isPublished: !prev.isPublished,
              }
            : null,
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update news status",
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this news article permanently?");
    if (!confirmed) {
      return;
    }
    try {
      const res = await deleteAdminNews(id);
      toast.success(res?.message || "News deleted successfully");
      setNews((prev) => prev.filter((item) => item._id !== id));
      if (selectedNews?._id === id) {
        setSelectedNews(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete news");
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <FaNewspaper className="animate-pulse" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
          Loading News
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Preparing the news management center...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <FaNewspaper />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                News Management
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage weather and environmental news shown across SkyCast.
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => loadNews(true)}
          disabled={refreshing}
          className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {refreshing ? "Refreshing..." : "Refresh News"}
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Articles"
          value={news.length}
          icon={<FaNewspaper />}
          className="blue"
        />
        <StatCard
          label="Published"
          value={publishedCount}
          icon={<FaCheckCircle />}
          className="green"
        />
        <StatCard
          label="Hidden"
          value={hiddenCount}
          icon={<FaBan />}
          className="red"
        />
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
          <FaFilter className="text-blue-500" />
          News Filters
        </div>
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="relative lg:col-span-8">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, source or category..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/30"
            />
          </div>
          <div className="lg:col-span-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">All News</option>
              <option value="published">Published</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasFilters}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <FaTimes />
              Clear
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
          <span>
            Showing{" "}
            <strong className="text-slate-800 dark:text-white">
              {filteredNews.length}
            </strong>{" "}
            of{" "}
            <strong className="text-slate-800 dark:text-white">
              {news.length}
            </strong>{" "}
            articles
          </span>
          {hasFilters && (
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Filters active
            </span>
          )}
        </div>
      </div>
      {filteredNews.length === 0 && (
        <div className="rounded-3xl border border-slate-100 bg-white p-14 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <FaNewspaper className="mx-auto text-6xl text-slate-300 dark:text-slate-700" />
          <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            No News Found
          </h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Try changing your search or status filter.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
      {filteredNews.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredNews.map((item) => (
            <NewsCard
              key={item._id}
              item={item}
              onView={() => setSelectedNews(item)}
              onToggle={() => handleToggle(item)}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      )}
      {selectedNews && (
        <NewsModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
          onToggle={() => handleToggle(selectedNews)}
          onDelete={() => handleDelete(selectedNews._id)}
        />
      )}
    </div>
  );
}
function StatCard({ label, value, icon, className }) {
  const styles = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    green:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg ${styles[className]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function NewsCard({ item, onView, onToggle, onDelete }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title || "News"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FaNewspaper className="text-6xl text-slate-300 dark:text-slate-600" />
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-bold shadow ${
              item.isPublished
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {item.isPublished ? "Published" : "Hidden"}
          </span>
          {item.category && (
            <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold capitalize text-white backdrop-blur">
              {item.category}
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {item.source || "Unknown Source"}
          </span>
          <span className="shrink-0 text-xs text-slate-400">
            {item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-lg font-black text-slate-900 dark:text-white">
          {item.title || "Untitled Article"}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {item.description || "No description available."}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onView}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <FaEye />
            View
          </button>
          <button
            type="button"
            onClick={onToggle}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition ${
              item.isPublished
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {item.isPublished ? (
              <>
                <FaEyeSlash />
                Hide
              </>
            ) : (
              <>
                <FaEye />
                Publish
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function NewsModal({ news, onClose, onToggle, onDelete }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
        >
          <FaTimes />
        </button>
        {news.image ? (
          <img
            src={news.image}
            alt={news.title || "News"}
            className="h-64 w-full object-cover md:h-80"
          />
        ) : (
          <div className="flex h-64 items-center justify-center bg-slate-100 dark:bg-slate-800 md:h-80">
            <FaNewspaper className="text-7xl text-slate-300 dark:text-slate-600" />
          </div>
        )}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold capitalize text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {news.category || "Weather"}
            </span>
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                news.isPublished
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
              }`}
            >
              {news.isPublished ? "Published" : "Hidden"}
            </span>
          </div>
          <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 dark:text-white md:text-4xl">
            {news.title}
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
            <span>
              Source:{" "}
              <strong className="text-slate-600 dark:text-slate-300">
                {news.source || "Unknown"}
              </strong>
            </span>
            <span>
              {news.publishedAt
                ? new Date(news.publishedAt).toLocaleString()
                : "N/A"}
            </span>
          </div>
          <div className="mt-7 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
            <p className="whitespace-pre-line text-base leading-8 text-slate-600 dark:text-slate-300">
              {news.description || "No description available."}
            </p>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onToggle}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white ${
                news.isPublished
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {news.isPublished ? (
                <>
                  <FaEyeSlash />
                  Hide Article
                </>
              ) : (
                <>
                  <FaEye />
                  Publish Article
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              <FaTrash />
              Delete Article
            </button>
            {news.url && (
              <a
                href={news.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Read Original
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNews;
