import { useMemo, useState } from "react";

import {
  FaSearch,
  FaUser,
  FaUserShield,
  FaLock,
  FaUnlock,
  FaTrash,
  FaEye,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

function UsersTable({ users = [], onRole, onStatus, onDelete, onView }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !value ||
        user.name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value);
      const matchesFilter =
        filter === "all" ||
        (filter === "admins" && user.role === "admin") ||
        (filter === "users" && user.role !== "admin") ||
        (filter === "blocked" && user.isBlocked);
      return matchesSearch && matchesFilter;
    });
  }, [users, search, filter]);

  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 p-6 dark:border-slate-800">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <FaUsers />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Users
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {filteredUsers.length} users shown
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 md:w-72 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/30"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">All Users</option>
              <option value="admins">Administrators</option>
              <option value="users">Regular Users</option>
              <option value="blocked">Blocked Users</option>
            </select>
          </div>
        </div>
      </div>
      {filteredUsers.length === 0 && (
        <div className="p-12 text-center">
          <FaUsers className="mx-auto text-5xl text-slate-300 dark:text-slate-700" />
          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            No users found
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try another search or filter.
          </p>
        </div>
      )}
      {filteredUsers.length > 0 && (
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  onRole={onRole}
                  onStatus={onStatus}
                  onDelete={onDelete}
                  onView={onView}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {filteredUsers.length > 0 && (
        <div className="space-y-4 p-4 md:hidden">
          {filteredUsers.map((user) => (
            <MobileUserCard
              key={user._id}
              user={user}
              onRole={onRole}
              onStatus={onStatus}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function UserRow({ user, onRole, onStatus, onDelete, onView }) {
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar user={user} />
          <div className="min-w-0">
            <p className="font-bold text-slate-900 dark:text-white">
              {user.name || "Unnamed User"}
            </p>
            <p className="max-w-[220px] truncate text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <RoleBadge role={user.role} />
      </td>
      <td className="px-6 py-4">
        <StatusBadge blocked={user.isBlocked} />
      </td>
      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <ActionButton
            title="View user"
            onClick={() => onView(user)}
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <FaEye />
          </ActionButton>
          <ActionButton
            title="Change role"
            onClick={() => onRole(user._id)}
            className="bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400"
          >
            <FaUserShield />
          </ActionButton>
          <ActionButton
            title={user.isBlocked ? "Unblock user" : "Block user"}
            onClick={() => onStatus(user._id)}
            className={
              user.isBlocked
                ? "bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400"
            }
          >
            {user.isBlocked ? <FaUnlock /> : <FaLock />}
          </ActionButton>
          <ActionButton
            title="Delete user"
            onClick={() => onDelete(user._id)}
            className="bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
          >
            <FaTrash />
          </ActionButton>
        </div>
      </td>
    </tr>
  );
}

function MobileUserCard({ user, onRole, onStatus, onDelete, onView }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar user={user} />
          <div className="min-w-0">
            <p className="truncate font-bold text-slate-900 dark:text-white">
              {user.name || "Unnamed User"}
            </p>
            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </div>
        <StatusBadge blocked={user.isBlocked} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <RoleBadge role={user.role} />
        <span className="text-xs text-slate-400">
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A"}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        <ActionButton
          title="View"
          onClick={() => onView(user)}
          className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <FaEye />
        </ActionButton>
        <ActionButton
          title="Role"
          onClick={() => onRole(user._id)}
          className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        >
          <FaUserShield />
        </ActionButton>
        <ActionButton
          title="Status"
          onClick={() => onStatus(user._id)}
          className="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
        >
          {user.isBlocked ? <FaUnlock /> : <FaLock />}
        </ActionButton>
        <ActionButton
          title="Delete"
          onClick={() => onDelete(user._id)}
          className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
        >
          <FaTrash />
        </ActionButton>
      </div>
    </div>
  );
}

function Avatar({ user }) {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name || "User"}
        className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
      />
    );
  }
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 font-bold text-white">
      {user.name?.charAt(0)?.toUpperCase() || <FaUser />}
    </div>
  );
}

function RoleBadge({ role }) {
  const isAdmin = role === "admin";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
        isAdmin
          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      }`}
    >
      {isAdmin && <FaUserShield />}
      {isAdmin ? "Administrator" : "User"}
    </span>
  );
}

function StatusBadge({ blocked }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
        blocked
          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      }`}
    >
      {blocked ? (
        <>
          <FaLock />
          Blocked
        </>
      ) : (
        <>
          <FaCheckCircle />
          Active
        </>
      )}
    </span>
  );
}

function ActionButton({ children, title, onClick, className = "" }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${className}`}
    >
      {children}
    </button>
  );
}

export default UsersTable;
