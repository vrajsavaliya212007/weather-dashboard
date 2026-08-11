import toast from "react-hot-toast";
import { FaBell, FaTrash, FaCheckCircle } from "react-icons/fa";
import { useNotifications } from "../../context/NotificationContext";
import { useLanguage } from "../../context/LanguageContext";

function Notifications() {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();

  const { t } = useLanguage();

  const handleRead = async (id) => {
    try {
      const res = await markAsRead(id);
      toast.success(res?.message || t("notificationMarkedAsRead"));
    } catch (error) {
      toast.error(
        error.response?.data?.message || t("unableToUpdateNotification"),
      );
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const res = await markAllAsRead();
      toast.success(res?.message || t("allNotificationsMarkedAsRead"));
    } catch (error) {
      toast.error(
        error.response?.data?.message || t("unableToUpdateNotifications"),
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await removeNotification(id);
      toast.success(res?.message || t("notificationDeleted"));
    } catch (error) {
      toast.error(
        error.response?.data?.message || t("unableToDeleteNotification"),
      );
    }
  };
  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <FaBell />
            </div>

            <h1 className="text-4xl font-black text-slate-900 dark:text-white">
              {t("notifications")}
            </h1>
          </div>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {t("weatherAlertsAndSystemNotifications")}
          </p>
        </div>

        {unreadCount > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              {unreadCount}{" "}
              {unreadCount === 1
                ? t("unreadNotification")
                : t("unreadNotifications")}
            </div>

            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {t("markAllAsRead")}
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className="rounded-3xl bg-white p-12 text-center shadow-lg dark:bg-slate-900">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

          <p className="mt-4 font-semibold text-slate-500 dark:text-slate-400">
            {t("loadingNotifications")}
          </p>
        </div>
      )}

      {!loading && notifications.length === 0 && (
        <div className="rounded-3xl bg-white p-12 text-center shadow-lg dark:bg-slate-900">
          <FaBell className="mx-auto mb-5 text-6xl text-blue-500" />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t("noNotifications")}
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {t("youAreAllCaughtUp")}
          </p>
        </div>
      )}

      {!loading && notifications.length > 0 && (
        <div className="space-y-5">
          {notifications.map((item) => (
            <div
              key={item._id}
              className={`rounded-3xl p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl ${
                item.isRead
                  ? "bg-white dark:bg-slate-900"
                  : "border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-950/40"
              }`}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h2>

                    {!item.isRead && (
                      <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                        {t("new")}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 leading-6 text-slate-600 dark:text-slate-300">
                    {item.message}
                  </p>

                  <p className="mt-4 text-sm text-slate-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-3">
                  {!item.isRead && (
                    <button
                      type="button"
                      onClick={() => handleRead(item._id)}
                      title={t("markAsRead")}
                      className="flex items-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                    >
                      <FaCheckCircle />

                      <span className="hidden sm:inline">{t("markRead")}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    title={t("deleteNotification")}
                    className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    <FaTrash />

                    <span className="hidden sm:inline">{t("delete")}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
