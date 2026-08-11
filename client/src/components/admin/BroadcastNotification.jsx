import { useState } from "react";
import toast from "react-hot-toast";

import {
  FaBell,
  FaPaperPlane,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

import { sendBroadcastNotification } from "../../services/adminApi";

function BroadcastNotification() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "info",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const message = form.message.trim();
    if (!title) {
      toast.error("Please enter a notification title");
      return;
    }
    if (title.length < 3) {
      toast.error("Title must contain at least 3 characters");
      return;
    }
    if (!message) {
      toast.error("Please enter a notification message");
      return;
    }
    if (message.length < 5) {
      toast.error("Message must contain at least 5 characters");
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to send this notification to all eligible users?",
    );
    if (!confirmed) {
      return;
    }
    try {
      setLoading(true);
      const res = await sendBroadcastNotification({
        title,
        message,
        type: form.type,
      });
      toast.success(res?.message || "Notification sent successfully");
      setForm({
        title: "",
        message: "",
        type: "info",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to send notification",
      );
    } finally {
      setLoading(false);
    }
  };

  const getTypeData = () => {
    switch (form.type) {
      case "warning":
        return {
          label: "Warning",
          icon: <FaExclamationTriangle />,
          iconClass:
            "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
          badgeClass:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        };
      case "alert":
        return {
          label: "Alert",
          icon: <FaShieldAlt />,
          iconClass:
            "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
          badgeClass:
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        };
      case "success":
        return {
          label: "Success",
          icon: <FaCheckCircle />,
          iconClass:
            "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
          badgeClass:
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        };
      default:
        return {
          label: "Information",
          icon: <FaInfoCircle />,
          iconClass:
            "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
          badgeClass:
            "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        };
    }
  };

  const typeData = getTypeData();

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <FaBell />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Broadcast Notification
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Send an important announcement or weather alert to SkyCast users.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Notification Title
              </label>
              <span className="text-xs text-slate-400">
                {form.title.length}/100
              </span>
            </div>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              maxLength={100}
              placeholder="Example: Heavy Rain Alert"
              disabled={loading}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-900/30 dark:disabled:bg-slate-800"
            />
          </div>
          <div>
            <label className="mb-3 block text-sm font-bold text-slate-800 dark:text-slate-200">
              Notification Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <TypeButton
                type="info"
                label="Information"
                icon={<FaInfoCircle />}
                active={form.type === "info"}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    type: "info",
                  }))
                }
              />
              <TypeButton
                type="warning"
                label="Warning"
                icon={<FaExclamationTriangle />}
                active={form.type === "warning"}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    type: "warning",
                  }))
                }
              />
              <TypeButton
                type="alert"
                label="Alert"
                icon={<FaShieldAlt />}
                active={form.type === "alert"}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    type: "alert",
                  }))
                }
              />
              <TypeButton
                type="success"
                label="Success"
                icon={<FaCheckCircle />}
                active={form.type === "success"}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    type: "success",
                  }))
                }
              />
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Message
              </label>
              <span className="text-xs text-slate-400">
                {form.message.length}/500
              </span>
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              maxLength={500}
              disabled={loading}
              placeholder="Write your notification message..."
              className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-900/30 dark:disabled:bg-slate-800"
            />
          </div>
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <FaUsers />
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  Broadcast Audience
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Users who have weather notifications enabled.
                </p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Send to All Users
              </>
            )}
          </button>
        </form>
      </section>
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <FaBell />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Live Preview
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Preview how the notification will appear to users.
            </p>
          </div>
        </div>
        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60 md:p-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl ${typeData.iconClass}`}
            >
              {typeData.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {form.title || "Notification Title"}
                </h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${typeData.badgeClass}`}
                >
                  {typeData.label}
                </span>
              </div>
              <p className="mt-3 break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
                {form.message || "Your notification message will appear here."}
              </p>
              <p className="mt-4 text-xs font-medium text-slate-400">
                Just now
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <PreviewItem label="Type" value={typeData.label} />
          <PreviewItem label="Delivery" value="In-app notification" />
          <PreviewItem label="Audience" value="Eligible users" />
          <PreviewItem
            label="Status"
            value={loading ? "Sending..." : "Ready to send"}
          />
        </div>
        <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/40 dark:bg-yellow-950/20">
          <div className="flex gap-3">
            <FaExclamationTriangle className="mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="font-bold text-yellow-800 dark:text-yellow-300">
                Broadcast reminder
              </p>
              <p className="mt-1 text-sm leading-6 text-yellow-700 dark:text-yellow-400">
                Use broadcasts for important weather alerts, announcements and
                platform updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TypeButton({ type, label, icon, active, onClick }) {
  const styles = {
    info: {
      active:
        "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/30 dark:text-blue-300",
      icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    },

    warning: {
      active:
        "border-yellow-500 bg-yellow-50 text-yellow-700 dark:border-yellow-500 dark:bg-yellow-950/30 dark:text-yellow-300",
      icon: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400",
    },

    alert: {
      active:
        "border-red-500 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/30 dark:text-red-300",
      icon: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
    },

    success: {
      active:
        "border-green-500 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-950/30 dark:text-green-300",
      icon: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
    },
  };

  const style = styles[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
        active
          ? style.active
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${style.icon}`}
      >
        {icon}
      </span>
      <span className="text-sm font-bold">{label}</span>
    </button>
  );
}

function PreviewItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-bold text-slate-800 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}

export default BroadcastNotification;
