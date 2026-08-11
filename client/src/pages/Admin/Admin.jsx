import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaShieldAlt, FaSyncAlt } from "react-icons/fa";
import {
  getAllUsers,
  toggleUserRole,
  toggleUserStatus,
  deleteUser,
  getAdminAnalytics,
} from "../../services/adminApi";
import AdminAnalytics from "../../components/admin/AdminAnalytics";
import BroadcastNotification from "../../components/admin/BroadcastNotification";
import AdminNews from "../../components/admin/AdminNews";
import UsersTable from "../../components/admin/UsersTable";
import UserDetailsModal from "../../components/admin/UserDetailsModal";
import { useLanguage } from "../../context/LanguageContext";

function Admin() {
  const { t } = useLanguage();

  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const loadAdminData = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const [usersRes, analyticsRes] = await Promise.all([
        getAllUsers(),
        getAdminAnalytics(),
      ]);
      setUsers(usersRes?.data || []);
      setAnalytics(analyticsRes?.data || null);
    } catch (error) {
      toast.error(error.response?.data?.message || t("unableToLoadAdminData"));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleRole = async (id) => {
    try {
      const res = await toggleUserRole(id);
      toast.success(res?.message || t("userRoleUpdated"));
      await loadAdminData(true);
    } catch (error) {
      toast.error(error.response?.data?.message || t("unableToUpdateUserRole"));
    }
  };

  const handleStatus = async (id) => {
    try {
      const res = await toggleUserStatus(id);
      toast.success(res?.message || t("userStatusUpdated"));
      await loadAdminData(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || t("unableToUpdateUserStatus"),
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(t("deleteUserConfirm"));
    if (!confirmed) {
      return;
    }
    try {
      const res = await deleteUser(id);
      toast.success(res?.message || t("userDeleted"));
      if (selectedUser?._id === id) {
        setSelectedUser(null);
      }
      await loadAdminData(true);
    } catch (error) {
      toast.error(error.response?.data?.message || t("unableToDeleteUser"));
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

          <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            {t("loadingAdminDashboard")}
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t("preparingAdminDashboard")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-xl md:p-10">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <FaShieldAlt />

              {t("administratorPanel")}
            </div>

            <h1 className="text-3xl font-black md:text-5xl">
              {t("adminDashboard")}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">
              {t("adminDescription")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadAdminData(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSyncAlt className={refreshing ? "animate-spin" : ""} />
            {refreshing ? t("refreshing") : t("refreshDashboard")}
          </button>
        </div>

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-white/5" />
      </div>

      {analytics && (
        <section>
          <AdminAnalytics analytics={analytics} />
        </section>
      )}

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t("communicationCenter")}
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t("communicationDescription")}
          </p>
        </div>

        <BroadcastNotification />
      </section>

      <section>
        <AdminNews />
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t("userAdministration")}
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t("userAdministrationDescription")}
          </p>
        </div>

        <UsersTable
          users={users}
          onRole={handleRole}
          onStatus={handleStatus}
          onDelete={handleDelete}
          onView={handleViewUser}
        />
      </section>

      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
}

export default Admin;
