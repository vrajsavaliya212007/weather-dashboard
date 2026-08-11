function LatestUsers({ users = [] }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Latest Users</h2>
      {users.length === 0 ? (
        <p className="text-slate-500">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <h3 className="font-bold">{user.name}</h3>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  {user.role}
                </span>
                <p className="mt-2 text-xs text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestUsers;
