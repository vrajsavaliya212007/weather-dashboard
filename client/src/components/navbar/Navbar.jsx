import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBell, FaSearch, FaCloudSun, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useWeather } from "../../context/WeatherContext";
import { useLanguage } from "../../context/LanguageContext";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications = [] } = useNotifications();
  const { loadWeather } = useWeather();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const handleSearch = async (e) => {
    e.preventDefault();
    const city = search.trim();
    if (!city) {
      return;
    }
    try {
      await loadWeather({
        city,
      });
      setSearch("");
      navigate("/weather");
    } catch (error) {
      console.error("Navbar search error:", error);
      toast.error(
        error.response?.data?.message ||
          t("unableToSearch") ||
          "Unable to search",
      );
    }
  };

  const openSidebar = () => {
    window.dispatchEvent(new CustomEvent("skycast:open-sidebar"));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        window.dispatchEvent(new CustomEvent("skycast:close-sidebar"));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/95"
    >
      <div className="flex min-h-[76px] w-full items-center justify-between gap-2 px-3 sm:gap-3 sm:px-5 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openSidebar}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 active:scale-95 lg:hidden dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            aria-label={t("openMenu") || "Open Menu"}
            title={t("openMenu") || "Open Menu"}
          >
            <FaBars className="text-lg" />
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex min-w-0 shrink-0 items-center gap-2"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xl text-white shadow-md">
              <FaCloudSun />
            </div>
            <h2 className="hidden text-xl font-black text-sky-700 sm:block dark:text-cyan-400">
              SkyCast
            </h2>
          </button>
          <form onSubmit={handleSearch} className="hidden min-w-0 lg:block">
            <div className="ml-2 flex w-[280px] items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 xl:w-[380px] dark:border-slate-700 dark:bg-slate-800 dark:focus-within:ring-blue-900/30">
              <FaSearch className="shrink-0 text-sm text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchCity") || "Search city"}
                aria-label={t("searchCity") || "Search city"}
                className="ml-3 min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
              />
            </div>
          </form>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-4">
          <button
            type="button"
            onClick={() => navigate("/search")}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 active:scale-95 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label={t("search") || "Search"}
            title={t("search") || "Search"}
          >
            <FaSearch />
          </button>
          <button
            type="button"
            onClick={() => navigate("/notifications")}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 active:scale-95 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label={t("notifications") || "Notifications"}
            title={t("notifications") || "Notifications"}
          >
            <FaBell className="text-lg" />
            {unreadCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
          <div
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md sm:flex"
            title={t("weather") || "Weather"}
          >
            <FaCloudSun className="text-lg text-white" />
          </div>
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="hidden max-w-[150px] text-right lg:flex lg:flex-col"
            title={t("profile") || "Profile"}
          >
            <span className="text-xs text-slate-400">
              {t("welcomeBack") || "Welcome back"}
            </span>
            <span className="truncate font-bold text-slate-900 dark:text-white">
              {user?.name || t("guestUser") || "Guest User"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="shrink-0"
            aria-label={t("openProfile") || "Open Profile"}
            title={t("openProfile") || "Open Profile"}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || t("profile") || "Profile"}
                className="h-9 w-9 rounded-full border-2 border-blue-500 object-cover sm:h-10 sm:w-10"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-500 bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-black text-white sm:h-10 sm:w-10 sm:text-sm">
                {initials}
              </div>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
