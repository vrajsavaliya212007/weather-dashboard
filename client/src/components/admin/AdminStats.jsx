import {
  FaUsers,
  FaCloudSun,
  FaHeart,
  FaBell,
  FaNewspaper,
} from "react-icons/fa";

function AdminStats({ stats }) {
  const cards = [
    {
      title: "Users",
      value: stats.users,
      icon: <FaUsers />,
      color: "bg-blue-500",
    },
    {
      title: "Weather Searches",
      value: stats.weatherSearches,
      icon: <FaCloudSun />,
      color: "bg-cyan-500",
    },
    {
      title: "Favorites",
      value: stats.favorites,
      icon: <FaHeart />,
      color: "bg-red-500",
    },
    {
      title: "Notifications",
      value: stats.notifications,
      icon: <FaBell />,
      color: "bg-yellow-500",
    },
    {
      title: "News",
      value: stats.news,
      icon: <FaNewspaper />,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((item) => (
        <div key={item.title} className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">{item.title}</p>
              <h2 className="mt-3 text-3xl font-black">{item.value}</h2>
            </div>
            <div
              className={`${item.color} rounded-2xl p-4 text-2xl text-white`}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;
