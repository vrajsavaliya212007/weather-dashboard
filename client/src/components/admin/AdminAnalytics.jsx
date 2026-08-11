import {
  FaUsers,
  FaUserShield,
  FaBan,
  FaHeart,
  FaBell,
  FaSearch,
  FaChartLine,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminAnalytics({ analytics }) {
  if (!analytics) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow-lg dark:bg-slate-900">
        <div className="flex flex-col items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p className="mt-4 font-semibold text-slate-600 dark:text-slate-300">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  const {
    totalUsers = 0,
    totalAdmins = 0,
    blockedUsers = 0,
    totalFavorites = 0,
    totalNotifications = 0,
    totalSearches = 0,
    topCities = [],
    searchGrowth = [],
    userGrowth = [],
  } = analytics;

  const cityChartData = topCities.map((item) => ({
    city: item._id || "Unknown",
    searches: Number(item.searches) || 0,
  }));

  const searchGrowthData = searchGrowth.map((item) => ({
    date: item._id,
    searches: Number(item.searches) || 0,
  }));

  const userGrowthData = userGrowth.map((item) => ({
    date: item._id,
    users: Number(item.users) || 0,
  }));

  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <FaUsers />,
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Administrators",
      value: totalAdmins,
      icon: <FaUserShield />,
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Blocked Users",
      value: blockedUsers,
      icon: <FaBan />,
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-600 dark:text-red-400",
    },
    {
      title: "Favorites",
      value: totalFavorites,
      icon: <FaHeart />,
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-600 dark:text-pink-400",
    },
    {
      title: "Notifications",
      value: totalNotifications,
      icon: <FaBell />,
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "Weather Searches",
      value: totalSearches,
      icon: <FaSearch />,
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
    },
  ];

  const formatNumber = (value) => {
    return Number(value || 0).toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <FaChartLine />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Platform Analytics
            </h2>
          </div>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Monitor SkyCast users, activity and platform engagement.
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Live Platform Overview
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>
                <h3 className="mt-2 text-4xl font-black text-slate-900 dark:text-white">
                  {formatNumber(card.value)}
                </h3>
              </div>
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl ${card.bg} ${card.text} transition group-hover:scale-110`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Most Searched Cities
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Cities users searched most frequently during the tracked period.
          </p>
        </div>

        {topCities.length === 0 ? (
          <EmptyState
            icon={<FaSearch />}
            title="No search data yet"
            message="Search for cities to generate platform analytics."
          />
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {topCities.map((city, index) => (
              <div
                key={`${city._id}-${index}`}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-800 dark:text-white">
                      {city._id || "Unknown"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Ranked #{index + 1}
                    </p>
                  </div>
                </div>

                <div className="ml-4 text-right">
                  <p className="font-black text-blue-600 dark:text-blue-400">
                    {formatNumber(city.searches)}
                  </p>

                  <p className="text-xs text-slate-400">searches</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <ChartCard
        title="Searches by City"
        description="Visual comparison of the most searched cities."
      >
        {cityChartData.length === 0 ? (
          <EmptyState
            icon={<FaSearch />}
            title="No chart data available"
            message="City search activity will appear here."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={cityChartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="city"
                tick={{
                  fontSize: 12,
                }}
              />
              <YAxis allowDecimals={false} />
              <Tooltip
                cursor={{
                  fill: "rgba(148,163,184,0.08)",
                }}
              />
              <Bar dataKey="searches" name="Searches" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title="Weather Search Trend"
        description="Daily weather searches during the tracked period."
      >
        {searchGrowthData.length === 0 ? (
          <EmptyState
            icon={<FaSearch />}
            title="No search activity yet"
            message="Weather searches will appear here once users start searching."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={searchGrowthData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{
                  fontSize: 11,
                }}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="searches"
                name="Weather Searches"
                strokeWidth={3}
                dot={{
                  r: 3,
                }}
                activeDot={{
                  r: 7,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title="User Growth"
        description="Daily new user registrations."
      >
        {userGrowthData.length === 0 ? (
          <EmptyState
            icon={<FaUsers />}
            title="No user growth data"
            message="New registrations will appear here."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={userGrowthData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{
                  fontSize: 11,
                }}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                name="New Users"
                strokeWidth={3}
                dot={{
                  r: 3,
                }}
                activeDot={{
                  r: 7,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, description, children }) {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
      <div className="mt-8 h-80">{children}</div>
    </section>
  );
}

function EmptyState({ icon, title, message }) {
  return (
    <div className="flex h-72 flex-col items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800">
      <div className="text-5xl text-slate-300 dark:text-slate-600">{icon}</div>
      <p className="mt-4 font-bold text-slate-600 dark:text-slate-300">
        {title}
      </p>
      <p className="mt-2 max-w-md text-center text-sm text-slate-400 dark:text-slate-500">
        {message}
      </p>
    </div>
  );
}

export default AdminAnalytics;
