import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";
import { uploadProfileImage } from "../../services/userApi";

function ProfileInfoCard({ user, refreshProfile }) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      e.target.value = "";
      return;
    }
    try {
      setUploading(true);
      const res = await uploadProfileImage(file);
      toast.success(res?.message || "Profile image updated");
      await refreshProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (!user) {
    return null;
  }

  const initials =
    user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
      <div className="flex flex-col items-center">
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || "Profile"}
              className="h-32 w-32 rounded-full object-cover shadow-xl ring-4 ring-blue-100 dark:ring-blue-900/40"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-4xl font-black text-white shadow-xl ring-4 ring-blue-100 dark:ring-blue-900/40">
              {initials}
            </div>
          )}
          <label
            htmlFor="profile-avatar"
            className={`absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 ${
              uploading ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <FaCamera />
            <input
              id="profile-avatar"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
        {uploading && (
          <p className="mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
            Uploading image...
          </p>
        )}
        <h2 className="mt-5 text-2xl font-black text-slate-900 dark:text-white">
          {user.name}
        </h2>
        <span
          className={`mt-2 rounded-full px-4 py-1 text-xs font-bold uppercase ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          }`}
        >
          {user.role}
        </span>
      </div>
      <div className="my-6 border-t border-slate-200 dark:border-slate-700" />
      <div className="space-y-5">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <FaEnvelope />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-slate-400">
              Email
            </p>
            <p className="mt-1 break-all font-medium text-slate-800 dark:text-slate-200">
              {user.email}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <FaPhone />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Phone
            </p>
            <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
              {user.phone || "Not provided"}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            <FaMapMarkerAlt />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Location
            </p>
            <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
              {[user.city, user.country].filter(Boolean).join(", ") ||
                "Not provided"}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <FaUserShield />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Account Role
            </p>
            <p className="mt-1 font-medium capitalize text-slate-800 dark:text-slate-200">
              {user.role}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
            <FaCalendarAlt />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Member Since
            </p>
            <p className="mt-1 font-medium text-slate-800 dark:text-slate-200">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfoCard;
