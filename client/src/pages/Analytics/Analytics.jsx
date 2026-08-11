import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaChartLine, FaRedo, FaHistory } from "react-icons/fa";
import { getAnalytics } from "../../services/analyticsApi";
import AnalyticsCards from "../../components/analytics/AnalyticsCards";
import TemperatureChart from "../../components/analytics/TemperatureChart";
import HistoryTable from "../../components/analytics/HistoryTable";
import { useLanguage } from "../../context/LanguageContext";

function Analytics() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useLanguage();

  const loadAnalytics = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const res = await getAnalytics();
      setHistory(Array.isArray(res?.data) ? res.data : []);
    } catch (error) {
      toast.error(error.response?.data?.message || t("unableToLoadAnalytics"));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-96 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <FaChartLine />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                {t("weatherAnalytics")}
              </h1>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                {t("weatherAnalyticsDescription")}
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => loadAnalytics(true)}
          disabled={refreshing}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaRedo className={refreshing ? "animate-spin" : ""} />
          {refreshing ? t("refreshing") : t("refresh")}
        </button>
      </div>
      {history.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-lg dark:bg-slate-900">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 text-3xl text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <FaHistory />
          </div>
          <h2 className="mt-6 text-2xl font-black text-slate-900 dark:text-white">
            {t("noWeatherHistory")}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-slate-500 dark:text-slate-400">
            {t("weatherHistoryDescription")}
          </p>
        </div>
      ) : (
        <>
          <section>
            <AnalyticsCards history={history} />
          </section>
          <section className="rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {t("temperatureTrend")}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {t("temperatureTrendDescription")}
              </p>
            </div>
            <div className="min-h-[300px]">
              <TemperatureChart history={history} />
            </div>
          </section>
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <FaHistory />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  {t("recentSearches")}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {t("recentWeatherSearchHistory")}
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-slate-900">
              <HistoryTable history={history} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Analytics;
