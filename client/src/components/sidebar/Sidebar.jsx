import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaHome,
  FaHeart,
  FaCloudSun,
  FaChartLine,
  FaBell,
  FaUser,
  FaCog,
  FaNewspaper,
  FaUserShield,
  FaSignOutAlt,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useNotifications } from "../../context/NotificationContext";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    key: "dashboard",
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    key: "search",
    name: "Search",
    path: "/search",
    icon: <FaSearch />,
  },
  {
    key: "favorites",
    name: "Favorites",
    path: "/favorites",
    icon: <FaHeart />,
  },
  {
    key: "weather",
    name: "Weather",
    path: "/weather",
    icon: <FaCloudSun />,
  },
  {
    key: "analytics",
    name: "Analytics",
    path: "/analytics",
    icon: <FaChartLine />,
  },
  {
    key: "notifications",
    name: "Notifications",
    path: "/notifications",
    icon: <FaBell />,
  },
  {
    key: "profile",
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
  {
    key: "settings",
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
  {
    key: "weatherNews",
    name: "Weather News",
    path: "/news",
    icon: <FaNewspaper />,
  },
  {
    key: "admin",
    name: "Admin Panel",
    path: "/admin",
    icon: <FaUserShield />,
  },
];

function Sidebar() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [isCompactScreen, setIsCompactScreen] = useState(
    () => window.innerWidth < 1024,
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const compact = window.innerWidth < 1024;
      setIsCompactScreen(compact);
      if (!compact) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(true);
      }
    };
    const handleClose = () => {
      setSidebarOpen(false);
    };
    window.addEventListener("skycast:open-sidebar", handleOpen);
    window.addEventListener("skycast:close-sidebar", handleClose);
    return () => {
      window.removeEventListener("skycast:open-sidebar", handleOpen);
      window.removeEventListener("skycast:close-sidebar", handleClose);
    };
  }, []);

  useEffect(() => {
    if (isCompactScreen && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCompactScreen, sidebarOpen]);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setSidebarOpen(false);
      navigate("/login", {
        replace: true,
      });
      toast.success(t("logoutSuccessful") || "Logged out successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          t("unableToLogout") ||
          "Unable to logout",
      );
    }
  };

  const visibleMenuItems = menuItems.filter(
    (item) => item.key !== "admin" || user?.role === "admin",
  );
  return (
    <>
      {isCompactScreen && sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-[1050] bg-slate-950/60 backdrop-blur-[2px] lg:hidden"
          aria-hidden="true"
        />
      )}
      <aside
        className="sidebar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width:
            window.innerWidth < 420
              ? "min(280px, 86vw)"
              : window.innerWidth < 768
                ? "280px"
                : window.innerWidth < 1024
                  ? "300px"
                  : "280px",
          height: "100dvh",
          zIndex: 1100,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          background: "#0f172a",
          color: "#ffffff",
          overflow: "hidden",
          transform:
            isCompactScreen && !sidebarOpen
              ? "translateX(-100%)"
              : "translateX(0)",
          transition: "transform 280ms ease",
          boxShadow: isCompactScreen
            ? "8px 0 30px rgba(0,0,0,0.28)"
            : "4px 0 20px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="sidebar-header"
          style={{
            flexShrink: 0,
          }}
        >
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <FaCloudSun />
            </div>
            <div className="sidebar-logo-text">
              <h1>SkyCast</h1>

              <p>{t("weatherDashboard") || "Weather Dashboard"}</p>
            </div>
            {isCompactScreen && (
              <button
                type="button"
                onClick={closeSidebar}
                className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-0 bg-white/10 text-white transition hover:bg-white/20"
                aria-label={t("closeMenu") || "Close Menu"}
                title={t("closeMenu") || "Close Menu"}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
        <div
          className="sidebar-user"
          style={{
            flexShrink: 0,
          }}
        >
          <div className="sidebar-user-content">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || t("user") || "User"}
                className="sidebar-avatar"
              />
            ) : (
              <div className="sidebar-avatar sidebar-avatar-fallback">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <div className="sidebar-user-details">
              <p className="sidebar-user-name">
                {user?.name || t("user") || "User"}
              </p>
              <p className="sidebar-user-role">
                {user?.role === "admin"
                  ? t("administrator") || "Administrator"
                  : t("weatherUser") || "Weather User"}
              </p>
            </div>
          </div>
        </div>
        <div
          className="sidebar-content-scroll"
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-y",
          }}
        >
          <nav className="sidebar-nav">
            <p className="sidebar-menu-title">{t("mainMenu") || "Main Menu"}</p>
            <ul className="sidebar-menu">
              {visibleMenuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? "active" : ""}`
                    }
                  >
                    <span className="sidebar-link-icon">{item.icon}</span>
                    <span className="sidebar-link-text">
                      {t(item.key) || item.name}
                    </span>
                    {item.key === "notifications" && unreadCount > 0 && (
                      <span className="sidebar-notification-badge">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                    {item.key === "admin" && (
                      <span className="sidebar-admin-badge">
                        {t("adminBadge") || "ADMIN"}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div
          className="sidebar-bottom"
          style={{
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={handleLogout}
            className="sidebar-logout"
          >
            <FaSignOutAlt />
            <span>{t("logout") || "Logout"}</span>
          </button>
        </div>
      </aside>
      <style>
        {`
          .sidebar-content-scroll::-webkit-scrollbar {
            width: 0;
            height: 0;
            display: none;
          }
          .sidebar-content-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        `}
      </style>
    </>
  );
}

export default Sidebar;
