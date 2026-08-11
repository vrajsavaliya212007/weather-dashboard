import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaNewspaper } from "react-icons/fa";
import { getNews } from "../../services/newsApi";
import NewsSearch from "../../components/news/NewsSearch";
import NewsGrid from "../../components/news/NewsGrid";
import NewsSkeleton from "../../components/news/NewsSkeleton";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    category: "weather",
  });

  const loadNews = async (values = filters) => {
    try {
      setLoading(true);
      setError("");
      const res = await getNews(values);
      setNews(res.data);
      setFilters(values);
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to load weather news.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-3xl text-white shadow-lg">
          <FaNewspaper />
        </div>
        <div>
          <h1 className="text-4xl font-black">Weather News</h1>
          <p className="mt-2 text-slate-500">
            Latest weather, climate and environmental news.
          </p>
        </div>
      </div>
      <NewsSearch loading={loading} onSearch={loadNews} />
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
          {error}
        </div>
      )}
      {!loading && news.length > 0 && (
        <div className="rounded-2xl bg-blue-50 p-5">
          <p className="font-semibold text-blue-700">
            Showing {news.length} articles
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Category :{" "}
            <span className="font-semibold capitalize">{filters.category}</span>
          </p>
        </div>
      )}
      {loading && <NewsSkeleton />}
      {!loading && !error && news.length > 0 && <NewsGrid news={news} />}
      {!loading && !error && news.length === 0 && (
        <div className="rounded-3xl bg-white p-16 text-center shadow-lg">
          <FaNewspaper className="mx-auto mb-6 text-7xl text-slate-300" />
          <h2 className="text-3xl font-bold">No News Found</h2>
          <p className="mt-4 text-slate-500">
            Try another search keyword or category.
          </p>
        </div>
      )}
    </div>
  );
}

export default News;
